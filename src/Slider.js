import React, { useState } from 'react'
import './Slider.css';
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react/cjs/react.development';

const variants = {
    resetPosition : {
        scale: 1,
        y: 0,
        backgroundColor: '#000000',
    },

    getBig: {
        scale: 1.2,
        color: '#000000',
        backgroundColor: '#ffffff',
        transition: { duration: 0.1 }
    },

    fade: {
        color: '#ffffff',
        backgroundColor: '#000000',
        transition: { duration: 3 }
    }
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const Slider = React.forwardRef((props, sliderContainerRef) => {

    // This gets the height of the controller to set it's range
    const [sliderHeight, setSliderHeight] = useState(0)

    const [time, setTime] = useState(0)

    // Used to hide / show the live dragging number and the countdown number
    const [draggingControl, setDraggingControl] = useState(false)

    const controls = useAnimation()

    // COUNTDOWN START ANIMATION
    useEffect(() => {
        setDraggingControl(false)
        setTime(0)
        props.isDelayTimerDone && controls.start('resetPosition')
    }, [props.isDelayTimerDone])

    useEffect(() => {
        setTime(0)
        controls.start('resetPosition')
    },[props.triggerReset])
    
    return (
        <motion.div
            className="dragEl"
            style={{ zIndex: '10' }}
            animate={controls}
            variants={variants}
            drag
            dragMomentum={false}
            dragConstraints={sliderContainerRef}
            dragElastic={0.01}
            // dragSnapToOrigin={true}
            // dragTransition={{ type: "spring", duration: "0.2", bounce: "0.4" }}
            onDragStart={(event, info) => {
                setSliderHeight(sliderContainerRef.current.offsetHeight)
                setDraggingControl(true)
                controls.start('getBig')
            }}
            onDrag={(event, info) => {
                setTime(clamp(Math.floor(Math.abs(((sliderHeight - info.point.y) / sliderHeight) * 10)), 0, props.maxNum))
            }}
            onDragEnd={(event, info) => {
                props.onDragEnd(props.id, time)
                controls.start('fade')
            }}
        >
            <div className={draggingControl ? 'visible' : 'hide'}>
                {time}
            </div>

            <div className={draggingControl ? 'hide' : 'visible'}>
                {props.countdownTime}
            </div>

        </motion.div>
    )
})

export default Slider