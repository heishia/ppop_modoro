import { FocusDuration, BreakDuration, TimerMode } from '../types/timer'
import styles from './Settings.module.css'

interface SettingsProps {
  focusDuration: FocusDuration
  breakDuration: BreakDuration
  mode: TimerMode
  isRunning: boolean
  onFocusChange: (duration: FocusDuration) => void
  onBreakChange: (duration: BreakDuration) => void
}

const FOCUS_OPTIONS: FocusDuration[] = [25, 45, 60]
const BREAK_OPTIONS: BreakDuration[] = [5, 10, 15]

export function Settings({
  focusDuration,
  breakDuration,
  mode,
  isRunning,
  onFocusChange,
  onBreakChange,
}: SettingsProps) {
  return (
    <div className={styles.settings}>
      <div className={styles.settingGroup}>
        <span className={styles.label}>Focus</span>
        <div className={styles.options}>
          {FOCUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`${styles.option} ${focusDuration === opt ? styles.active : ''} ${styles[mode]}`}
              onClick={() => onFocusChange(opt)}
              disabled={isRunning}
            >
              {opt}m
            </button>
          ))}
        </div>
      </div>
      <div className={styles.settingGroup}>
        <span className={styles.label}>Break</span>
        <div className={styles.options}>
          {BREAK_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`${styles.option} ${breakDuration === opt ? styles.active : ''} ${styles[mode]}`}
              onClick={() => onBreakChange(opt)}
              disabled={isRunning}
            >
              {opt}m
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
