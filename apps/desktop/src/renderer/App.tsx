import { useEffect, useCallback, useState } from 'react'
import { useTimer } from './hooks/useTimer'
import { useSound } from './hooks/useSound'
import { Timer } from './components/Timer'
import { Controls } from './components/Controls'
import { Settings } from './components/Settings'
import { TimerMode } from './types/timer'
import styles from './styles/App.module.css'

function App() {
  const { play: playDing } = useSound()
  const [showSettings, setShowSettings] = useState(false)

  const handleTimerEnd = useCallback((completedMode: TimerMode) => {
    playDing()
    
    const title = '뽑모도로'
    const body = completedMode === 'focus' 
      ? '휴식 시간입니다!' 
      : '집중할 시간입니다!'
    
    if (window.electronAPI) {
      window.electronAPI.showNotification(title, body)
    }
  }, [playDing])

  const {
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
  } = useTimer(handleTimerEnd)

  useEffect(() => {
    document.body.className = mode === 'break' ? 'break-mode' : ''
  }, [mode])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button 
          className={styles.settingsButton}
          onClick={() => setShowSettings(true)}
          aria-label="설정"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="12" cy="19" r="2"/>
          </svg>
        </button>
        <p className={`${styles.modeLabel} ${mode === 'break' ? styles.break : ''}`}>
          {mode === 'focus' ? '집중 시간' : '휴식 시간'}
        </p>
      </header>

      <Timer timeLeft={timeLeft} progress={progress} mode={mode} />

      <Controls
        isRunning={isRunning}
        mode={mode}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />

      <Settings
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        mode={mode}
        isRunning={isRunning}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onFocusChange={setFocusDuration}
        onBreakChange={setBreakDuration}
      />
    </div>
  )
}

export default App
