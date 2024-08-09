/**
 * @author yuda
 * @description 基于XMLHttpRequest 对象 创建请求实例
 */

class XHR {
  private xhr: XMLHttpRequest
  constructor() {
    this.xhr = new XMLHttpRequest()
    this.xhr.timeout = 15 * 1000 // 超时时间
  }
  get(url: string, callback: callback) {
    this.xhr.open('GET', url)
    this.setRequestHeaders()
    this.xhr.onreadystatechange = this.responseHandler.bind(this, callback)
    this.send()
  }

  post(url: string, callback: callback, data: any) {
    this.xhr.open('POST', url)
    this.setRequestHeaders()
    this.xhr.onreadystatechange = this.responseHandler.bind(this, callback)
    this.send(data)
  }

  put(url: string, callback: callback, data: any) {
    this.xhr.open('POST', url)
    this.setRequestHeaders()
    this.xhr.onreadystatechange = this.responseHandler.bind(this, callback)
    this.send(data)
  }

  patch(url: string, callback: callback, data: any) {
    this.xhr.open('POST', url)
    this.setRequestHeaders()
    this.xhr.onreadystatechange = this.responseHandler.bind(this, callback)
    this.send(data)
  }
  // 发起请求
  private send(data?: any) {
    this.xhr.send(data ? JSON.stringify(data) : null)
  }

  // 添加请求头
  private setRequestHeaders() {
    this.xhr.setRequestHeader('Content-Type', 'application/json');
  }

  // 响应数据处理
  private responseHandler(callback: callback) {
    if(this.xhr.readyState === 4 && this.xhr.status === 200) {
      callback(this.xhr.response)
    } else {
      this.errorHandler(callback, this.xhr.response)
    }
  }

  // 错误 异常处理
  private errorHandler(callback: callback, resError: any = null ) {
    callback({
      status: false,
      code: 500,
      message: '请求失败',
      error: resError
    })
  }

  static ajax(type: string, url: string, data:any, callback: (res:any) => void):void {
    const xhr = new XHR();
    switch (type.toUpperCase()) {
      case 'GET':
        xhr.get(url, callback);
        break;
      case 'POST':
        xhr.post(url, callback, data);
        break;
      case 'PUT':
        xhr.put(url, callback, data);
        break;
      case 'PATCH':
        xhr.patch(url, callback, data);
        break;
      default:
        throw new Error('Unsupported request type');
    }
  }
}

type callback = (res: any) => void 

export default new XHR()