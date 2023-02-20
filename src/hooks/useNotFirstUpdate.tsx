import { useEffect, useRef } from 'react'
function useNotFirstUpdate(value: any, handler: Function) {
  const firstTime = useRef(false)
  useEffect(() => {
    if (firstTime.current) {
      handler()
    } else {
      firstTime.current = true
    }
  }, [value])
}
export default useNotFirstUpdate
