import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(initialValue)

  useEffect(() => {
    const item = localStorage.getItem(key)
    if (item) setState(parse(item))
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, parse(state))
  }, [state, key])

  return { state, setState }
}

const parse = (obj: any) => {
  try {
    return JSON.parse(obj)
  } catch {
    return obj
  }
}
