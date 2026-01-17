import { useState, useEffect, useCallback, useRef } from 'react'
import { TimerMode, FocusDuration, BreakDuration } from '../types/timer'

interface UseTimerReturn {
  mode: TimerMode
  timeLeft: number
  isRunning: boolean
  focusDuration: FocusDuration
  breakDuration: BreakDuration
  progress: number
  start: () => void
  pause: () => void
  reset: () => void
  stop: () => void
  setFocusDuration: (duration: FocusDuration) => void
  setBreakDuration: (duration: BreakDuration) => void
}

const FOCUS_OPTIONS: FocusDuration[] = [25, 45, 60]
const BREAK_OPTIONS: BreakDuration[] = [5, 10, 15]

export function useTimer(onTimerEnd: (mode: TimerMode) => void): UseTimerReturn {
  const [mode, setMode] = useState<TimerMode>('focus')
  const [focusDuration, setFocusDurationState] = useState<FocusDuration>(45)
  const [breakDuration, setBreakDurationState] = useState<BreakDuration>(15)
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const totalTime = mode === 'focus' ? focusDuration * 60 : breakDuration * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const switchMode = useCallback(() => {
    const nextMode = mode === 'focus' ? 'break' : 'focus'
    setMode(nextMode)
    const nextDuration = nextMode === 'focus' ? focusDuration : breakDuration
    setTimeLeft(nextDuration * 60)
    onTimerEnd(mode)
  }, [mode, focusDuration, breakDuration, onTimerEnd])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      clearTimer()
      switchMode()
    }

    return clearTimer
  }, [isRunning, timeLeft, clearTimer, switchMode])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
    clearTimer()
  }, [clearTimer])

  const reset = useCallback(() => {
    setIsRunning(false)
    clearTimer()
    const duration = mode === 'focus' ? focusDuration : breakDuration
    setTimeLeft(duration * 60)
  }, [mode, focusDuration, breakDuration, clearTimer])

  const stop = useCallback(() => {
    setIsRunning(false)
    clearTimer()
    setMode('focus')
    setTimeLeft(focusDuration * 60)
  }, [focusDuration, clearTimer])

  const setFocusDuration = useCallback((duration: FocusDuration) => {
    if (!FOCUS_OPTIONS.includes(duration)) return
    setFocusDurationState(duration)
    if (mode === 'focus' && !isRunning) {
      setTimeLeft(duration * 60)
    }
  }, [mode, isRunning])

  const setBreakDuration = useCallback((duration: BreakDuration) => {
    if (!BREAK_OPTIONS.includes(duration)) return
    setBreakDurationState(duration)
    if (mode === 'break' && !isRunning) {
      setTimeLeft(duration * 60)
    }
  }, [mode, isRunning])

  return {
    mode,
    timeLeft,
    isRunning,
    focusDuration,
    breakDuration,
    progress,
    start,
    pause,
    reset,
    stop,
    setFocusDuration,
    setBreakDuration,
  }
}
