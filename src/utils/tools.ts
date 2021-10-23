// 防抖函数
export function debounce(func: Function, delay = 200) {
  let timer: any = null
  return (...params: any[]) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => func(...params), delay)
  }
}

// 节流函数
export function throttle(func: Function, delay = 200) {
  let timer: any  = null
  return (...params: any[]) => {
    if (!timer) {
      timer = setTimeout(() => {
        func(...params)
        timer = null
      }, delay)
    }
  }
}
