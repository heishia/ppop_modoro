import { TimerMode } from '../types/timer'
import styles from './Timer.module.css'

interface TimerProps {
  timeLeft: number
  progress: number
  mode: TimerMode
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function Timer({ timeLeft, progress, mode }: TimerProps) {
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={styles.timerContainer}>
      <svg className={styles.progressRing} viewBox="0 0 200 200">
        <circle
          className={styles.progressBg}
          cx="100"
          cy="100"
          r="90"
          fill="none"
          strokeWidth="8"
        />
        <circle
          className={`${styles.progressBar} ${styles[mode]}`}
          cx="100"
          cy="100"
          r="90"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className={styles.timeDisplay}>
        <span className={`${styles.time} ${styles[mode]}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  )
}
