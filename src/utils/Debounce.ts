const Debounce = (fn:() => void, time:number) => {
  let timeoutId:NodeJS.Timeout | null
  const wrapper =  () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn()
    }, time)
  }
  return wrapper
}

export default Debounce