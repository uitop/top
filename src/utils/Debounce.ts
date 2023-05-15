const Debounce = (fn, time) => {
  let timeoutId
  const wrapper =  (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
  return wrapper
}

export default Debounce