import { TimerMode } from '../types/timer'
import styles from './Controls.module.css'

interface ControlsProps {
  isRunning: boolean
  mode: TimerMode
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onStop: () => void
}

export function Controls({ isRunning, mode, onStart, onPause, onReset, onStop }: ControlsProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.mainControls}>
        {isRunning ? (
          <button
            className={`${styles.mainButton} ${styles[mode]}`}
            onClick={onPause}
          >
            Pause
          </button>
        ) : (
          <button
            className={`${styles.mainButton} ${styles[mode]}`}
            onClick={onStart}
          >
            Start
          </button>
        )}
      </div>
      <div className={styles.secondaryControls}>
        <button className={styles.secondaryButton} onClick={onReset}>
          Reset
        </button>
        <button className={`${styles.secondaryButton} ${styles.stopButton}`} onClick={onStop}>
          Stop
        </button>
      </div>
    </div>
  )
}
