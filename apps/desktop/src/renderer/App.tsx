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
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
        </button>
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
