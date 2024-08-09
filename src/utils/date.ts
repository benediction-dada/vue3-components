/**
 * @author yuda
 * @description 存放时间处理方法
 */


/**
 * @description 获取格式化时间方法
 * 
 * @param {string} 格式字符串
 * @param {date} 时间【非必填,默认调用时间】
 * @return {string}
 */
export const formatDate = (format: string, time: Date = new Date()): string => {
  const map: { [key: string]: string } = {
    'YYYY': time.getFullYear().toString(),
    'MM': (`0${time.getMonth() + 1}`).slice(-2),
    'DD': (`0${time.getDate()}`).slice(-2),
    'HH': (`0${time.getHours()}`).slice(-2),
    'mm': (`0${time.getMinutes()}`).slice(-2),
    'ss': (`0${time.getSeconds()}`).slice(-2)
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => map[match]);
};