import { RefObject, useEffect } from 'react'

// useClickOutside里，使用的是原生的 doucment.addEventListener 的方法添加，那么它是一个原生的 DOM事件，它的事件对象是原生的事件对象(比如这里的 MouseEvent)
// 而React.MouseEvent （各种 react event 事件对象），都是 React 的事件，它并不是 DOM 原生的对象，和普通的 DOM 事件是不一样的
function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside
