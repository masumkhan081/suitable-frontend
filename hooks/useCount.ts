import { useAtom } from 'jotai'
import { countAtom } from '@/store/count'

export function useCounter() {
  const [count, setCount] = useAtom(countAtom)

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => Math.max(0, prev - 1))
  const reset = () => setCount(0)

  return { count, increment, decrement, reset }
}
