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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
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
        onStop={stop}
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
