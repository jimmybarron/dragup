import React, { useState } from 'react'
import './Slider.css';
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react/cjs/react.development';

const variants = {
    resetPosition : {
        scale: 1,
        y: 0,
        backgroundColor: '#000000',
        color: '#ffffff',
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
    },
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const Slider = React.forwardRef((props, sliderContainerRef) => {

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
                controls.start('fade')
                break
            case 'count':
                setControllerTime(0)
                controls.start('resetPosition')
                break
            default:
                break;
        }
    }, [props.mode])
    
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
            onTapStart={(event, info) => {
                controls.start('getBig')
            }}
            onDragStart={(event, info) => {
                setSliderHeight(sliderContainerRef.current.offsetHeight)
                props.setMode('edit')
            }}
            onDrag={(event, info) => {
                setControllerTime(clamp(Math.floor(Math.abs(((sliderHeight - info.point.y) / sliderHeight) * 10)), 0, props.maxNum))
            }}
            onDragEnd={(event, info) => {
                props.onDragEnd(props.id, controllerTime)
                controls.start('getBig')
                props.setMode('delay')
            }}
        >
            <div>
                {props.mode === 'zero' && props.countdownTime}
                {props.mode === 'edit' && controllerTime}
                {props.mode === 'delay' && controllerTime}
                {props.mode === 'count' && props.countdownTime}
            </div>

        </motion.div>
    )
})

export default Slider