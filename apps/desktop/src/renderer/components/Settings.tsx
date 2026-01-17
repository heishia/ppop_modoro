import { FocusDuration, BreakDuration, TimerMode } from '../types/timer'
import styles from './Settings.module.css'

interface SettingsProps {
  focusDuration: FocusDuration
  breakDuration: BreakDuration
  mode: TimerMode
  isRunning: boolean
  isOpen: boolean
  onClose: () => void
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
  isOpen,
  onClose,
  onFocusChange,
  onBreakChange,
}: SettingsProps) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />
        <h2 className={styles.title}>설정</h2>
        
        <div className={styles.settingGroup}>
          <span className={styles.label}>집중 시간</span>
          <div className={styles.options}>
            {FOCUS_OPTIONS.map((opt) => (
              <button
                key={opt}
                className={`${styles.option} ${focusDuration === opt ? styles.active : ''} ${styles[mode]}`}
                onClick={() => onFocusChange(opt)}
                disabled={isRunning}
              >
                {opt}분
              </button>
            ))}
          </div>
        </div>

        <div className={styles.settingGroup}>
          <span className={styles.label}>휴식 시간</span>
          <div className={styles.options}>
            {BREAK_OPTIONS.map((opt) => (
              <button
                key={opt}
                className={`${styles.option} ${breakDuration === opt ? styles.active : ''} ${styles[mode]}`}
                onClick={() => onBreakChange(opt)}
                disabled={isRunning}
              >
                {opt}분
              </button>
            ))}
          </div>
        </div>

        {isRunning && (
          <p className={styles.warning}>타이머 실행 중에는 변경할 수 없습니다</p>
        )}

        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  )
}
