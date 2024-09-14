<!-- 
  * @Description 在父级上遮盖第一层蒙版 进行canvas画图
  * @Date 2024-08-28
-->

<script setup lang="ts">
  type Point = {
    x: number,
    y: number
  }
  type PointerType = 'cornerTopLeft' | 'cornerTopRight' | 'cornerBottomLeft' | 'cornerBottomRight' | 'horizationLine' | 'verticalLine' | 'inner' | 'outerTop' | 'outerRight' | 'outerBottom' | 'outerLeft';

  import { onBeforeUnmount, onMounted, ref } from 'vue';

  const canvasRef = ref<HTMLCanvasElement>()
  const isDropState = ref<boolean>(false) // 拖拽状态
  let startPoint:Point = { x: -1, y: -1 } // 开始点位
  let endPoint:Point = { x: -1, y: -1 } // 结束点位
  // 主题色
  const primaryColor = 
    getComputedStyle(document.documentElement)
    .getPropertyValue('--primary').trim()

  const RECT_BORDER_WIDTH = 2 // 矩形变框宽度 
  const RECT_BORDER_COLOR = 'red' // 矩形边框颜色
  const RECT_CONTANER_COLOR = 'rgba(0,0,0,.5)'
  const JUDGE_VAGUE = 10
  
  
  const mousedown = (event:MouseEvent) => {
    const { offsetX, offsetY } = event
    const hasArea = ~startPoint.x && ~startPoint.y // 判断鼠标按下之前是否有框区域
    // 点击开始(初始点击)
    if(!hasArea) {
      isDropState.value = true
      startPoint.x = offsetX
      startPoint.y = offsetY
    } else {
      // 有区域后点击调整区域
    }
  }
  const mousemove = (event:MouseEvent) => {
    const hasArea = ~startPoint.x && ~startPoint.y // 判断鼠标按下之前是否有框区域

    if(isDropState.value) {
      // 拖拽 (鼠标按下后才开始画矩形)
      const { offsetX, offsetY } = event
      endPoint.x = offsetX
      endPoint.y = offsetY
  
      drawImage()
    }
    
    if(hasArea) {
      setMouseState(event) // 设置鼠标状态
    }
  }
  const mouseup = (event:MouseEvent) => {
    // 结束拖拽
    isDropState.value = false
  }

  const drawImage = () => {
    const canvas = canvasRef.value as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const rectLineWidth = RECT_BORDER_WIDTH
    const rectX = startPoint.x
    const rectY = startPoint.y
    const rectWidth = endPoint.x - startPoint.x
    const rectHeight = endPoint.y - startPoint.y

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制灰色背景
    ctx.fillStyle = RECT_CONTANER_COLOR // 半透明灰色
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 清除矩形区域的灰色填充
    ctx.clearRect(rectX, rectY, rectWidth, rectHeight)

    ctx.beginPath()
    ctx.strokeStyle = RECT_BORDER_COLOR
    ctx.lineWidth = rectLineWidth
    ctx.rect(rectX, rectY, rectWidth, rectHeight)
    ctx.stroke()
    ctx.closePath()
  }

  const setMouseState = (event:MouseEvent) => {
    let { offsetX, offsetY } = event  
    let mousePoint:Point = { x: offsetX, y: offsetY} // 当前鼠标点位
    let vague:number = JUDGE_VAGUE // 模糊值

    let cornerLeftTop:Point = startPoint // 左上角
    let cornerRightTop:Point = { x: startPoint.x + endPoint.x, y: startPoint.y } // 右上角
    let cornerLeftBottom:Point = { x: startPoint.x, y: startPoint.y + endPoint.y } // 左下角
    let cornerRightBottom:Point = endPoint // 右下角
    // 鼠标在矩形角上
    const onTopRightCorner = (
      distanceBetweenPoints(mousePoint, cornerLeftTop) < vague ||
      distanceBetweenPoints(mousePoint, cornerRightBottom) < vague
    )
    const onTopLeftCorner = (
      distanceBetweenPoints(mousePoint, cornerRightTop) < vague ||
      distanceBetweenPoints(mousePoint, cornerLeftBottom) < vague
    )
    if(onTopRightCorner) {
      return setPointer('cornerTopRight')
    }
    if(onTopLeftCorner) {
      return setPointer('cornerTopLeft')
    }

    // 判断鼠标是否在边线上
    const isOnHorizontalEdge = (
        Math.abs(mousePoint.y - cornerLeftTop.y) < vague &&
        mousePoint.x >= cornerLeftTop.x &&
        mousePoint.x <= cornerRightBottom.x
    );
    const isOnVerticalEdge = (
        Math.abs(mousePoint.x - cornerLeftTop.x) < vague &&
        mousePoint.y >= cornerLeftTop.y &&
        mousePoint.y <= cornerRightBottom.y
    );
    if(isOnHorizontalEdge) {
      return setPointer('horizationLine')
    }
    if(isOnVerticalEdge) {
      return setPointer('verticalLine')
    }
    // 在矩形内部
    const isInsideRectangle = (
        mousePoint.x > cornerLeftTop.x + vague &&
        mousePoint.x < cornerRightBottom.x - vague &&
        mousePoint.y > cornerLeftTop.y + vague &&
        mousePoint.y < cornerRightBottom.y - vague
    );
    if(isInsideRectangle) {
      return setPointer('inner')
    }
    // 边线方向上
    // 判断鼠标是否在矩形外部的四个方向
    const isOutsideTop = (
        mousePoint.y < cornerLeftTop.y - vague &&
        mousePoint.x >= cornerLeftTop.x &&
        mousePoint.x <= cornerRightBottom.x
    );
    const isOutsideBottom = (
        mousePoint.y > cornerRightBottom.y + vague &&
        mousePoint.x >= cornerLeftTop.x &&
        mousePoint.x <= cornerRightBottom.x
    );
    const isOutsideLeft = (
        mousePoint.x < cornerLeftTop.x - vague &&
        mousePoint.y >= cornerLeftTop.y &&
        mousePoint.y <= cornerRightBottom.y
    );
    const isOutsideRight = (
        mousePoint.x > cornerRightBottom.x + vague &&
        mousePoint.y >= cornerLeftTop.y &&
        mousePoint.y <= cornerRightBottom.y
    );

    if (isOutsideTop) {
        return setPointer('outerTop');
    }
    if (isOutsideBottom) {
        return setPointer('outerBottom');
    }
    if (isOutsideLeft) {
        return setPointer('outerLeft');
    }
    if (isOutsideRight) {
        return setPointer('outerRight');
    }
    
    // @Description 获取两点之间距离
    function distanceBetweenPoints(p1:Point, p2:Point):number {
      return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2))
    }
    // 设置鼠标样式
    function setPointer(type: PointerType) {
      const canvas = canvasRef.value as HTMLCanvasElement
      if(!canvas) return
      let mousePointerMap:{[key in PointerType]: string} = {
        cornerTopLeft: '', // 左上
        cornerTopRight: '', // 右上
        cornerBottomLeft: '', // 左下
        cornerBottomRight: '', // 右下
        horizationLine: 'ew-resize', // 水平
        verticalLine: 'ns-resize', // 垂直
        inner: 'move', // 内部拖拽
        outerTop: 'n-resize', // 外上
        outerRight: 'e-resize', // 外右
        outerBottom: 's-resize', // 外下
        outerLeft: 'w-resize', // 
      }
      canvas.style.cursor = mousePointerMap[type]
      
    }
  }

  const init = () => {
    const canvas = canvasRef.value as HTMLCanvasElement
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    canvas.addEventListener('mousedown', mousedown)
    canvas.addEventListener('mousemove', mousemove)
    canvas.addEventListener('mouseup', mouseup)
  }

  onMounted(() => {
    init()
  })

  onBeforeUnmount(() => {
    let canvas = canvasRef.value as HTMLCanvasElement
    canvas.removeEventListener('mousedown', mousedown)
    canvas.removeEventListener('mousemove', mousemove)
    canvas.removeEventListener('mouseup', mouseup)
  })
</script>

<template>
  <div class="snapshot-model">
    <!-- 工具 -->
    <div class="left-top-info">
      ESC键退出截图模式
    </div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style lang="scss" scoped>
  // 蒙版
  .snapshot-model {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;

    .left-top-info {
      position: absolute;
      top: 5px;
      left: 5px;
      color: white;
      font-size: 12px;
      opacity: .8;
    }

    canvas {
      width: 100%;
      height: 100%;
      border: 1px solid;
    }
  }
  </style>