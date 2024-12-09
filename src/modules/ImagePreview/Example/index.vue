<script lang="ts" setup>
interface Props { imageUrl?: string }
interface Rect {
  width: number,
  height: number
}
type drawType = 'init' | 'scale' | 'default'
import { v4 as uuid } from 'uuid'

import usePageEvent from '@/hooks/usePageEvent'
import useImg from '@/hooks/useImg'
import useCss from '@/hooks/useCss'
import useDragImg from './useDragImg'


const { addEventListener } = usePageEvent()
const { setOriginRect } = useImg()
const { getThemeColor } = useCss()
const { scale, fitScale, scaleRatio, isMouseDown, imgLocation, onMouseDown, onMouseMove, onMouseUp, onWheel } = useDragImg()

const { imageUrl } = withDefaults(defineProps<Props>(), {
  imageUrl: '/page.png'
})

const canvasRef = useTemplateRef('canvasRef') // 画布引用
const imgRef = useTemplateRef('imgRef') // 画布引用

const natureImgRect = ref<Rect>({ width: 0, height: 0 }) // 图片的原始尺寸
const id = uuid() // 当前组件唯一标识
const primaryColor = getThemeColor() // 主题色

// 根据容器自适应canvas宽高
const resizeCanvas = () => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  if (!canvas || !canvas.parentElement) return
  canvas.width = (canvas.parentElement.clientWidth || 102) - 2
  canvas.height = (canvas.parentElement.clientHeight || 102) - 2
  drawImg('init')
}

// 初始化方法
const init = () => {
  // 事件添加
  const canvas = canvasRef.value
  if(!canvas) return
  canvas.addEventListener('mousemove', (e: MouseEvent) => {
    onMouseMove(e, drawImg)
  })
  canvas.addEventListener('mouseup', () => {
    onMouseUp(canvasRef.value, drawImg)
  })
  canvas.addEventListener('wheel', (e: WheelEvent) => {
    onWheel(e, drawImg)
  }, { passive: false })
  addEventListener(window, 'resize', resizeCanvas)
  
  // 初始化画布大小
  nextTick(() => {
    resizeCanvas()
  })
}

// 更新图片
const drawImg = (type: drawType = 'default') => {
  const canvas = canvasRef.value
  if(!canvas) return
  const ctx = canvas.getContext('2d')

  // 画布宽高
  const canvasRect = { width: canvas.width, height: canvas.height }
  
  let draw: Rect // 最终画图的大小
  const oriImg = natureImgRect.value // 图片原大小

  // 计算初始缩放比逻辑
  /**
   * 1) 图片放得下的话，居中， 缩放比为1
   * 2）图片放不下的话， 居中，以长的边缩放铺满容器
   */
  
  const contain = oriImg.width < canvasRect.width && oriImg.height < canvasRect.height // 是否放得下图片
  if(contain) {
    draw = oriImg
  } else {
    // 计算缩放比
    switch(type) {
      case 'default': {
        // 拖拽缩放比不变
        break        
      }
      case 'init': {
        // 初始化缩放比取合适缩放比
        let widthScale = canvasRect.width / oriImg.width
        let heightScale = canvasRect.height / oriImg.height
        
        scale.value = Math.min(widthScale, heightScale)
        fitScale.value = scale.value
        break;
      }
      case 'scale': {
        // 缩放时使用缩放方法的缩放比
        break;
      }
    }

    // 最终的图片显示大小
    draw = {
      width: oriImg.width * scale.value,
      height: oriImg.height * scale.value,
    }
  }

  // 计算位置
  switch(type) {
    case 'init': {
      imgLocation.value = {
        x: (canvasRect.width - draw.width) / 2 ,
        y: (canvasRect.height - draw.height) / 2,
      }
      break;
    }
    case 'default': {
      // 拖拽位置走拖拽方法
      break;
    }
    case 'scale': {
      if(scale.value <= fitScale.value) {
        // 图片比容器小居中缩放
        imgLocation.value = {
          x: (canvasRect.width - draw.width) / 2 ,
          y: (canvasRect.height - draw.height) / 2,
        }
      } else {
        // 图片比容器大以鼠标位置为中心缩放
        // <暂时没想到啥好办法>
      }
      break;
    }
  }

  // 清除画布
  ctx.clearRect(0, 0, canvasRect.width, canvasRect.height)

  // 鼠标按下时添加阴影
  addblur()

  // 添加图片进画布
  addImg()

  function addblur() {
    if(isMouseDown.value) {
      ctx.filter = 'blur(6px)'
      ctx.beginPath()
      ctx.fillStyle = primaryColor
      ctx.fillRect(imgLocation.value.x + 3, imgLocation.value.y + 3, draw.width - 6, draw.height - 6)
      ctx.closePath()
      ctx.filter ='none'
    }
  }
  function addImg() {
    ctx.drawImage(imgRef.value, imgLocation.value.x, imgLocation.value.y, draw.width, draw.height)
  }
}


onMounted(async () => {
  // 初始化图片
  await setOriginRect(imageUrl, natureImgRect)
  nextTick(() => {
    init()
  })
})

</script>

<template>
  <img :id="`${id}_img`" ref="imgRef" :src="imageUrl" alt="" style="display: none;" />
  <div class="image-preview">
    <div class="scale">
      {{ scaleRatio }}%
    </div>
    <canvas :id="id"
      width="100%"
      height="100%"
      ref="canvasRef"
      @mousedown="$event => onMouseDown($event, canvasRef, natureImgRect, drawImg)"
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