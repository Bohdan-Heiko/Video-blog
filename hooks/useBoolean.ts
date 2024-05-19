import { useCallback, useState } from "react"

interface InitialData<T> {
  value: boolean
  data?: T | null
}

type ReturnType<T> = {
  value: InitialData<T>
  setTrue: (data?: T) => void
  setFalse: () => void
}

const useBoolean = <T>(defaultValue: boolean): ReturnType<T> => {
  const [value, setValue] = useState<InitialData<T>>({
    value: Boolean(defaultValue),
    data: null
  })

  const setTrue = useCallback(
    (data?: InitialData<T>["data"]) => setValue({ value: true, data }),
    []
  )
  const setFalse = useCallback(() => setValue({ value: false, data: null }), [])
  // const toggle = useCallback(() => setValue((prev) => ({ ...prev, value: !prev.value })), [])

  return { value, setTrue, setFalse }
}

export default useBoolean
