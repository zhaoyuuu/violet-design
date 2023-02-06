import { useEffect, useState } from 'react'

function useDebounce(value: any, wait = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, wait)
    return () => {
      clearTimeout(handler)
    }
  }, [value, wait])
  return debouncedValue
}

export default useDebounce
