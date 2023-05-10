import { useEffect, useState } from "react"

export default function useDebounce(value, delay = 200) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('set timeout')
      setDebounceValue(value);
    }, delay)

    return () => {
      console.log('set timeout')
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceValue
}
