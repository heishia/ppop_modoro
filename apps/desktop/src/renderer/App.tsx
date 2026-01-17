import { useEffect, useCallback } from 'react'
import { useTimer } from './hooks/useTimer'
import { useSound } from './hooks/useSound'
import { Timer } from './components/Timer'
import { Controls } from './components/Controls'
import { Settings } from './components/Settings'
import { TimerMode } from './types/timer'
import styles from './styles/App.module.css'

function App() {
  const { play: playDing } = useSound()

  const handleTimerEnd = useCallback((completedMode: TimerMode) => {
    playDing()
    
    const title = 'Ppop Modoro'
    const body = completedMode === 'focus' 
      ? 'Time to take a break!' 
      : 'Time to focus!'
    
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
        <h1 className={styles.title}>Ppop Modoro</h1>
        <p className={`${styles.modeLabel} ${mode === 'break' ? styles.break : ''}`}>
          {mode === 'focus' ? 'Focus Time' : 'Break Time'}
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
        onFocusChange={setFocusDuration}
        onBreakChange={setBreakDuration}
      />
    </div>
  )
}

export default App
