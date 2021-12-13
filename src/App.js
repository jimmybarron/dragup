/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useTimer from 'easytimer-react-hook'
import './App.css'
import './Sliders.css'
import SliderContainer from './SliderContainer'
import Button from './Button'

const App = function () {
  // COUNTDOWN MEMORY: Used to send the current drag number to the countdown on drag end event
  const [countdownMinOnes, setCountdownMinOnes] = useState(0)
  const [countdownMinTens, setCountdownMinTens] = useState(0)
  const [countdownSecOnes, setCountdownSecOnes] = useState(0)
  const [countdownSecTens, setCountdownSecTens] = useState(0)

  // const [triggerReset, setTriggerReset] = useState(0)
  const [mode, setMode] = useState('zero')

  // COUNTDOWN TIMER
  const [countdownTimer, isCountdownDone] = useTimer({
    countdown: true,
    updateWhenTargetAchieved: true
  })

  let countdownTotalSeconds
  // PROGRESS METER
  const [countdownProgress, setCountdownProgress] = useState(0)

  countdownTimer.addEventListener('secondsUpdated', () => {
    setCountdownProgress(countdownTimer.getTotalTimeValues().seconds / countdownTotalSeconds)
    console.log(countdownProgress)
  })

  // DELAY TIMER
  const [delayTimer, isDelayTimerDone] = useTimer({
    countdown: true,
    updateWhenTargetAchieved: true
  })

  // NUMBER PADDER HELPER: This adds the zero padding eg. '01' instead of default of '1'
  // So the controls show zeros instead of being blank
  const countdownZeroPadder = (position, set) => {
    // convert number to string then array
    const time = countdownTimer.getTimeValues()[set].toString().split('')
    // if the time is a single digit; add a zero for padding and return
    if (time.length === 1) {
      time.unshift(0)
    }
    return time[position]
  }

  // COUNTDOWN LOADER & DELAY START: Loads time values from controls into their respective countdown states; starts delay Timer
  const loadCountdownStartDelay = (position, time) => {
    // Clear and stop countdown
    position === 'minTens' && setCountdownMinTens(time)
    position === 'minOnes' && setCountdownMinOnes(time)
    position === 'secTens' && setCountdownSecTens(time)
    position === 'secOnes' && setCountdownSecOnes(time)
    delayTimer.reset()
    delayTimer.start({
      startValues: {
        seconds: 3
      }
    })
    setMode('delay')
  }

  // DELAY TIMER TO COUNT MODE
  useEffect(() => {
    if (isDelayTimerDone === true) {
      setMode('count')
    }
  }, [isDelayTimerDone])

  // RESET
  const handleReset = () => {
    // Clear countdown memory
    setCountdownMinOnes(0)
    setCountdownMinTens(0)
    setCountdownSecOnes(0)
    setCountdownSecTens(0)

    // Clear and stop countdown
    countdownTimer.start({
      startValues: {
        minutes: 0,
        seconds: 0
      }
    })
    countdownTimer.stop()

    // Reset Delay and Stop
    delayTimer.reset()
    delayTimer.stop()
  }

  // TIMER CONTROLS ON MODE CHANGE
  useEffect(() => {
    const minutes = [countdownMinTens, countdownMinOnes].join('')
    const seconds = [countdownSecTens, countdownSecOnes].join('')
    switch (mode) {
      case 'zero':
        handleReset()
        break
      case 'edit':
        if (isDelayTimerDone) {
          handleReset()
        }
        break
      case 'delay':
        break
      case 'count': // Compiles the time and starts the time
        countdownTimer.start({
          startValues: {
            minutes,
            seconds
          }
        })
        countdownTotalSeconds = countdownTimer.getTotalTimeValues().seconds
        console.log(countdownTotalSeconds)
        break
      default:
        break
    }
  }, [mode])

  const sliderContainerProps = {
    width: '70px',
    isDelayTimerDone,
    onDragEnd: loadCountdownStartDelay,
    mode,
    setMode
  }

  return (
    <div className="App">

      <motion.div
                    // initial={{
                    //     scaleY: 0,
                    // }}
        animate={{
          scaleY: countdownProgress
        }}
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100%',
          backgroundColor: '#111'
        }}
      />

      <div className="sliders">

        <SliderContainer
          {...sliderContainerProps}
          id="minTens"
          maxNum="5"
          countdownTime={countdownZeroPadder(0, 'minutes')}
        />

        <div style={{ width: '8px' }} />

        <SliderContainer
          {...sliderContainerProps}
          id="minOnes"
          maxNum="9"
          countdownTime={countdownZeroPadder(1, 'minutes')}
        />

        <div style={{ color: 'white', fontSize: '64px', margin: '0 12px' }}>:</div>

        <SliderContainer
          {...sliderContainerProps}
          id="secTens"
          maxNum="5"
          countdownTime={countdownZeroPadder(0, 'seconds')}
        />

        <div style={{ width: '8px' }} />

        <SliderContainer
          {...sliderContainerProps}
          id="secOnes"
          maxNum="9"
          countdownTime={countdownZeroPadder(1, 'seconds')}
        />

      </div>

      <Button style={{ marginTop: '30px' }} onClick={() => { setMode('zero') }}>
        Reset
      </Button>

    </div>
  )
}

export default App
