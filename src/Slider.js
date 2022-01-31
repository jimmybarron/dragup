import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Slider.css'
import { motion, useAnimation } from 'framer-motion'

const dragElVariants = {
  resetPosition: {
    transition: { duration: 0.1 },
    scale: 1,
    y: 0,
    backgroundColor: '#00000000',
    color: '#ffffff',
    border: '0px solid #000',
  },
  
  editing: {
    scale: 1.2,
    color: '#fff',
    backgroundColor: '#ffffff',
    border: '3px solid #fff',
    transition: { duration: 0.1 },
  },
  
  delay: {
    color: '#00ffffff',
    backgroundColor: '#000000',
    transition: { duration: 3 }
  }
}

const timerNumVariants = {
  delay: {
    color: '#ffffff'
  }
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const Slider = React.forwardRef((props, sliderContainerRef) => {
  Slider.displayName = 'Slider'
  Slider.propTypes = {
    mode: PropTypes.string
  }

  // This gets the height of the controller to set it's range
  const [sliderHeight, setSliderHeight] = useState(0)

  const [controllerTime, setControllerTime] = useState(0)

  const controls = useAnimation()

  // ANIMATION CONTROLS ON MODE CHANGE
  useEffect(() => {
    switch (props.mode) {
      case 'zero':
        controls.start('resetPosition')
        setControllerTime(0)
        break
      case 'edit':
        break
      case 'delay':
        controls.start('delay')
        break
      case 'count':
        setControllerTime(0)
        controls.start('resetPosition')
        break
      default:
        break
    }
  }, [props.mode])

  return (
        <motion.div style={{ display: 'flex', justifyContent: 'center' }}>

          <motion.div
            className="dragEl"
            animate={controls}
            variants={dragElVariants}
            drag
            dragMomentum={false}
            dragConstraints={sliderContainerRef}
            dragElastic={0.01}
            onTapStart={(event, info) => {
              controls.start('editing')
              props.setMode('edit')
            }}
            onDragStart={(event, info) => {
              setSliderHeight(sliderContainerRef.current.offsetHeight)
              props.setMode('edit')
            }}
            onDrag={(event, info) => {
              setControllerTime(clamp(Math.floor(((sliderHeight - info.point.y) / sliderHeight) * 10), 0, props.maxNum))
            }}
            onDragEnd={(event, info) => {
              props.onDragEnd(props.id, controllerTime)
              props.setMode('delay')
            }}
          >
          </motion.div>

          <motion.div className='timerNum' animate={controls} variants={timerNumVariants}>
            {props.mode === 'zero' && props.countdownTime}
            {props.mode === 'edit' && controllerTime}
            {props.mode === 'delay' && controllerTime}
            {props.mode === 'count' && props.countdownTime}
          </motion.div>
  
        </motion.div>
  )
})

export default Slider
