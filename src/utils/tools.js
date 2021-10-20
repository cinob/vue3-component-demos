// 防抖函数
export function debounce(func, delay = 200) {
  let timer = null
  return (...params) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => func(...params), delay)
  }
}

// 节流函数
export function throttle(func, delay = 200) {
  let timer = null
  return (...params) => {
    if (!timer) {
      timer = setTimeout(() => {
        func(...params)
        timer = null
      }, delay)
    }
  }
}
