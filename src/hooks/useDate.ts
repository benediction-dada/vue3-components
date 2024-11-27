/**
 * @author yuda
 * @description 返回时间处理方法
 */
type Time = Date | string | number | undefined // 日期、字符串、时间戳

/**
 * @description 获取格式化时间方法
 * 
 * @param {string} 格式字符串
 * @param {date} 时间【非必填,默认调用时间】
 * @return {string}
 */
const format = (format: string = 'YYYY-MM-DD hh:mm:ss', timeFormat: Time = new Date()): string => {
  const time = formatTime(timeFormat)
  const map: { [key: string]: string } = {
    'YYYY': time.getFullYear().toString(),
    'MM': (`0${time.getMonth() + 1}`).slice(-2),
    'DD': (`0${time.getDate()}`).slice(-2),
    'hh': (`0${time.getHours()}`).slice(-2),
    'mm': (`0${time.getMinutes()}`).slice(-2),
    'ss': (`0${time.getSeconds()}`).slice(-2)
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => map[match]);
};

/**
 * @description 获取当前星期信息
 * @param timeFormat 
 * @returns {string}
 */
const getDay = (timeFormat: Date = new Date()):string => {
  const mapDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return mapDay[timeFormat.getDay()]
}


/**
 * @description 将Date、字符串、时间戳、转为Date实例对象
 * 
 * @param timeFormat {Time} 
 * @returns {Date}
 */
const formatTime = (timeFormat: Time = new Date()):Date => {
  let time = timeFormat
  if(!(time instanceof  Date)) {
    time = new Date(timeFormat)
  }
  return time
}

// 抛出方法
export default () => ({
  format,
  getDay
})