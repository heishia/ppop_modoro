import { TimerMode } from '../types/timer'
import styles from './Controls.module.css'

interface ControlsProps {
  isRunning: boolean
  mode: TimerMode
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export function Controls({ isRunning, mode, onStart, onPause, onReset }: ControlsProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.mainControls}>
        {isRunning ? (
          <button
            className={`${styles.mainButton} ${styles[mode]}`}
            onClick={onPause}
          >
            일시정지
          </button>
        ) : (
          <button
            className={`${styles.mainButton} ${styles[mode]}`}
            onClick={onStart}
          >
            시작
          </button>
        )}
      </div>
      <div className={styles.secondaryControls}>
        <button className={styles.secondaryButton} onClick={onReset}>
          초기화
        </button>
      </div>
    </div>
  )
}
