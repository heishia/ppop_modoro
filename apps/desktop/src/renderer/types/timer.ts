export type TimerMode = 'focus' | 'break'

export type FocusDuration = 25 | 45 | 60
export type BreakDuration = 5 | 10 | 15

export interface TimerState {
  mode: TimerMode
  timeLeft: number
  isRunning: boolean
  focusDuration: FocusDuration
  breakDuration: BreakDuration
}
