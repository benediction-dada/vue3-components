interface Point {
  x: number,
  y: number
}
interface Rect {
  width: number,
  height: number
}
type Callback = (...args: any) => any

const scale = ref(1) // 初始缩放比
const fitScale = ref(1) // 初始缩放比

const scaleRatio = computed<number>(() => Math.floor(scale.value * 100)) // % 缩放比
const isDragging = ref<boolean>(false) // 是否开始拖拽
const isMouseDown = ref<boolean>(false) // 是否按下鼠标
// 图片在画布中的位置
const imgLocation = ref<Point>({
  x: 0,
  y: 0
})
// 鼠标在画布中的位置
const dragMousePoint = ref<Point>({ 
  x: 0,
  y: 0
})
// 鼠标在图片中的位置
const dragMouseInImgPoint = ref<Point>({
  x: 0,
  y: 0
})

// 获取鼠标在画布中的位置
const getLocationInCanvas = (event: MouseEvent, canvasRef: Ref) => {
  const canvas = canvasRef;
  if (!canvas) return { x: 0, y: 0 };
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left, 
    y: event.clientY - rect.top
  };
};

// 鼠标按下去
const onMouseDown = (event: MouseEvent, canvasRef: Ref,natureImgRect: Ref<Rect>, callback: Callback ) => {
  const canvas = canvasRef
  if(!canvas) return
  
  // 判断鼠标位置是否在图片中
  const { x = 0, y = 0 } = getLocationInCanvas(event, canvasRef);
  isMouseDown.value = true

  const inHorizontalArea = x >= imgLocation.value.x && x < x + natureImgRect.width
  const inVerticalArea = y >= y && y < y + natureImgRect.height
  if(!inHorizontalArea || !inVerticalArea) return

  isDragging.value = true
  // 初始化定位
  dragMousePoint.value.x = event.clientX
  dragMousePoint.value.y = event.clientY

  // 按下样式更新
  canvas.style.cursor = 'move'
  callback()
}

// 鼠标按下去后移动
const onMouseMove = (event: MouseEvent, callback: Callback) => {
  if(!isDragging.value) return
  // 计算偏移量
  const dx = event.clientX - dragMousePoint.value.x
  const dy = event.clientY - dragMousePoint.value.y

  // 图片位置计算
  imgLocation.value.x += dx
  imgLocation.value.y += dy

  // 更新拖拽点位置
  dragMousePoint.value.x = event.clientX
  dragMousePoint.value.y = event.clientY

  callback()
}

// 鼠标松开
const onMouseUp = (canvasRef: Ref, callback: Callback) => {
  isDragging.value = false
  isMouseDown.value = false
  const canvas = canvasRef
  if(canvas) {
    canvas.style.cursor =
     'default'
  }
  callback()
}

// ****缩放
const onWheel = (event: WheelEvent, callback: Callback) => {
  event.preventDefault()
  const zoomFactor = (scaleRatio.value / 10 >  3 ? scaleRatio.value / 10 : 3) / 100;
  if (event.deltaY < 0) {
    scale.value = Math.min(scale.value + zoomFactor, 15); // Max scale limit
  } else {
    scale.value = Math.max(scale.value - zoomFactor, 0.01); // Min scale limit
  }
  callback('scale');
};


export default () => {
  return {
    scale,
    fitScale,
    scaleRatio,
    isMouseDown,
    imgLocation,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onWheel
  }
}



