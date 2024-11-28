<script lang="ts" setup>
import { computed, onMounted, useTemplateRef, ref, nextTick } from 'vue'
import usePageEvent from '@/hooks/usePageEvent'
import { v4 as uuid } from 'uuid'

interface Props { imageUrl?: string }

const { addEventListener } = usePageEvent()
const props = withDefaults(defineProps<Props>(), {
  imageUrl: '/page.png'
})
const id = uuid() // 当前组件唯一标识

const canvasRef = useTemplateRef('canvasRef') // 画布引用
const imgRef = useTemplateRef('imgRef') // 图片引用
const primaryColor = 
  getComputedStyle(document.documentElement)
  .getPropertyValue('--primary').trim() // 主题色




// 添加拖拽方法
const isDragging = ref(false) // 是否开始拖拽
const isMouseDown = ref(false) // 是否选中状态
const dragStartX = ref(0) // 拖拽点在画布中的X位置
const dragStartY = ref(0) // 拖拽点在画布中的Y位置
const imgOffsetX = ref(0) // 拖拽后在图片位置
const imgOffsetY = ref(0) // 拖拽后在图片位置
// 图片真实宽高
let imgWidth = 0
let imgHeight = 0
// 图片显示宽高
let drawWidth = 0
let drawHeight = 0
// 图片在画布中的位置
let x = 0
let y = 0


// 缩放比
const scale = ref(1)
const scaleRatio = computed(() => Math.floor(scale.value * 100))

// 根据容器自适应canvas宽高
const resizeCanvas = () => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  if (!canvas || !canvas.parentElement) return
  canvas.width = (canvas.parentElement.clientWidth || 102) - 2
  canvas.height = (canvas.parentElement.clientHeight || 102) - 2

  drawImg()
}

const drawGrid = (ctx:CanvasRenderingContext2D, width:number, height: number) => {
  for( let i = 1; i * 10 < height; i++ ){
      ctx.strokeStyle = primaryColor;
      ctx.beginPath();
      ctx.moveTo(0, i * 10);
      ctx.lineTo(width, i* 10);
      ctx.stroke();
      ctx.closePath()
  }

  for(let i = 1; i * 10 < width; i++) {
    ctx.strokeStyle = primaryColor
    ctx.beginPath()
    ctx.moveTo(i * 10, 0)
    ctx.lineTo(i * 10, height)
    ctx.stroke()
    ctx.closePath()
  }
}
// 绘制图片 （根据容器缩放图片大小 更具拖拽偏移更新图片位置）
const drawImg = () => {
  const canvas = canvasRef.value
  if(!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 初始化图片
  const img = imgRef.value
  if (!img) return
  // 获取图片原始宽高
  imgWidth = img.naturalWidth
  imgHeight = img.naturalHeight

  // 确保 canvas 的尺寸合适
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height

  // 分类
  // （1）当图片宽高都小于容器则不需要缩放直接居中显示（如果需要手动讲容器缩小）
  // （2）图片宽高有一个大于容器 图片需要缩放以防止失真
  if (imgWidth < canvasWidth && imgHeight < canvasHeight) {
    drawWidth = imgWidth
    drawHeight = imgHeight
  } else {
    // 计算图像绘制的比例
    const aspectRatio = imgWidth / imgHeight
    const canvasAspectRatio = canvasWidth / canvasHeight

    if (aspectRatio > canvasAspectRatio) {
      drawWidth = canvasWidth
      drawHeight = canvasWidth / aspectRatio
    } else {
      drawWidth = canvasHeight * aspectRatio
      drawHeight = canvasHeight
    }
  }

  // 根据比率修改最终显示的图片大小（100% 不代表原图大小而是初始自适应大小）
  drawHeight *= scale.value
  drawWidth *= scale.value

  // 居中绘制图像
  x = (canvasWidth - drawWidth) / 2 + imgOffsetX.value
  y = (canvasHeight - drawHeight) / 2 + imgOffsetY.value

  // 清除画布
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  // 背景网格
  drawGrid(ctx, canvas.width, canvas.height)

  if(isMouseDown.value) {
    ctx.filter = 'blur(6px)'
    ctx.beginPath()
    ctx.fillStyle = primaryColor
    ctx.fillRect(x - 4, y - 4, drawWidth + 8, drawHeight + 8)
    ctx.closePath()
    ctx.filter ='none'
  }
  
  // 添加图片
  ctx.drawImage(img, x, y, drawWidth, drawHeight)
}


// 获取鼠标在画布中的位置
const getCanvasLocation = (event: MouseEvent) => {
  const canvas = canvasRef.value;
  if (!canvas) return { x: 0, y: 0 };
  const rect = canvas.getBoundingClientRect();
  return {
    mouseX: event.clientX - rect.left, 
    mouseY: event.clientY - rect.top
  };
};

// ****拖拽
// 鼠标按下去
const onMouseDown = (event: MouseEvent) => {
  const canvas = canvasRef.value
  if(!canvas) return

  // 判断鼠标位置是否在图片中
  const { mouseX = 0, mouseY = 0 } = getCanvasLocation(event);

  const inHorizontalArea = mouseX >= x && mouseX < x + drawWidth
  const inVerticalArea = mouseY >= y && mouseY < y + drawHeight
  if(!inHorizontalArea || !inVerticalArea) return

  isDragging.value = true
  isMouseDown.value = true
  // 初始化定位
  dragStartX.value = event.clientX
  dragStartY.value = event.clientY

  // 按下样式更新
  canvas.style.cursor = 'move'

  drawImg()
}
// 鼠标按下去后移动
const onMouseMove = (event: MouseEvent) => {
  if(!isDragging.value) return
  // 计算偏移量
  const dx = event.clientX - dragStartX.value
  const dy = event.clientY - dragStartY.value

  // 图片位置计算
  imgOffsetX.value += dx
  imgOffsetY.value += dy

  // 更新拖拽点位置
  dragStartX.value = event.clientX
  dragStartY.value = event.clientY

  drawImg()
}
// 鼠标松开
const onMouseUp = () => {
  isDragging.value = false
  isMouseDown.value = false
  const canvas = canvasRef.value
  if(canvas) {
    canvas.style.cursor =
     'default'
  }
  drawImg()
}

// ****缩放
const onWheel = (event: WheelEvent) => {
  event.preventDefault()
  const zoomFactor = 0.1;
  if (event.deltaY < 0) {
    scale.value = Math.min(scale.value + zoomFactor, 2); // Max scale limit
  } else {
    scale.value = Math.max(scale.value - zoomFactor, 0.1); // Min scale limit
  }
  drawImg();
};


const init = () => {
  // 事件添加
  const canvas = canvasRef.value
  if(!canvas) return
  addEventListener(canvas, 'mousemove', onMouseMove)
  addEventListener(canvas, 'mouseup', onMouseUp)
  addEventListener(canvas, 'wheel', onWheel, { passive: false })
  
  addEventListener(document, 'resize', resizeCanvas)
  
  // 初始化图片
  const img = imgRef.value
  if (!img) return

  // 加载图片
  img.onload = drawImg

  // 初始化画布大小
  nextTick(() => {
    resizeCanvas()
  })
}

onMounted(() => {
  init()
})

</script>

<template>
  <div class="image-preview">
    <div class="scale">
      {{ scaleRatio }}%
    </div>
    <img :id="`${id}_img`" ref="imgRef" :src="props.imageUrl" alt="" style="display: none;" />
    <canvas :id="id"
      width="100%"
      height="100%"
      ref="canvasRef"
      @mousedown="onMouseDown"
      ></canvas>
  </div>
</template>

<style lang="scss" scoped>
.image-preview {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  // 缩放比
  .scale {
    background-color: rgba($color: #ffffff, $alpha: .4);
    font-size: 12px;
    display: inline-block;
    padding: 2px 3px;
    position: absolute;
    top: 0;
    left: 0;
  }
  // 画布
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>