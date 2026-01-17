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
  const circumference = 2 * Math.PI * 140
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={styles.timerContainer}>
      <svg className={styles.progressRing} viewBox="0 0 320 320">
        <circle
          className={styles.progressBg}
          cx="160"
          cy="160"
          r="140"
          fill="none"
          strokeWidth="12"
        />
        <circle
          className={`${styles.progressBar} ${styles[mode]}`}
          cx="160"
          cy="160"
          r="140"
          fill="none"
          strokeWidth="12"
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
