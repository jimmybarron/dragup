import { React, useRef } from 'react'
import { motion } from 'framer-motion';
import Slider from './Slider';

const SliderContainer = props => {

    const sliderContainerRef = useRef(null)

    const controlVariants = {
        zero: {
            opacity: 0,
            pathLength: 0,
        },
        
        edit: {
            opacity: 1,
            pathLength: 1,
            transition: {
                opacity: { duration: 0.05 },
                pathLength: { type: "spring", duration: 0.3, bounce: 0 },
            },
        },
        
        delay: {
            opacity: 1,
            pathLength: 1,
        },
        
        count: {
            opacity: 0,
            pathLength: 0,
        },
    }

    const dotVariants = {
        zero: {
            opacity: 0,
            pathLength: 0,
        },
        
        edit: {
            opacity: 1,
            pathLength: 1,
            transition: {
                opacity: { duration: 0.1 },
                pathLength: { type: "spring", duration: 0.5, bounce: 0 },
            },
        },
        
        delay: {
            opacity: 1,
            pathLength: 1,
        },
        
        count: {
            opacity: 0,
            pathLength: 0,
        },
    }

    return (

        <div
            id={props.id}
            className="numberSlider"
            style={{
                display: "flex",
                flexDirection: "column",
                position: 'relative',
                width: props.width,
                height: "75vh",
                overflow: "visible",
            }}
        >
            
            <svg
                className="indicators"
                width="100%"
                height="80%"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    overflow: "visible",
                    position: "absolute",
                    marginTop: '4rem',
                }}
            >

                <svg>
                    <motion.line
                        x1="50%"
                        x2="50%"
                        y1="100%"
                        y2="0%"
                        stroke="#666"
                        strokeWidth="2"
                        variants={controlVariants}
                        animate={props.mode}
                    />
                </svg>

                <svg style={{overflow: 'visible'}}>
                    <motion.circle
                        cx="50%"
                        cy="0%"
                        r="3"
                        fill="#666"
                        variants={dotVariants}
                        animate={props.mode}
                    />
                </svg>

                <svg style={{overflow: 'visible'}}>
                    <motion.circle
                        cx="50%"
                        cy="11.1%"
                        r="3"
                        fill="#666"
                        variants={dotVariants}
                        animate={props.mode}
                    />
                </svg>

                <svg style={{overflow: 'visible'}}>
                    <motion.circle
                        cx="50%"
                        cy="22.2%"
                        r="3"
                        fill="#666"
                        variants={dotVariants}
                        animate={props.mode}
                    />
                </svg>
                
                <svg style={{overflow: 'visible'}}>
                    <motion.circle
                        cx="50%"
                        cy="33.3%"
                        r="3"
                        fill="#666"
                        variants={dotVariants}
                        animate={props.mode}
                    />
                </svg>

                <svg style={{overflow: 'visible'}}>
                    <motion.circle
                        cx="50%"
                        cy="44.4%"
                        r="3"
                        fill="#666"
                        variants={dotVariants}
                        animate={props.mode}
                    />
                </svg>

                <svg style={{overflow: 'visible'}}>
                    <motion.circle
                        cx="50%"
                        cy="55.5%"
                        r="3"
                        fill="#666"
                        variants={dotVariants}
                        animate={props.mode}
                    />
                </svg>

                <svg style={{overflow: 'visible'}}>
                    <motion.circle
                        cx="50%"
                        cy="66.6%"
                        r="3"
                        fill="#666"
                        variants={dotVariants}
                        animate={props.mode}
                    />
                </svg>

                <svg style={{overflow: 'visible'}}>
                    <motion.circle
                        cx="50%"
                        cy="77.7%"
                        r="3"
                        fill="#666"
                        variants={dotVariants}
                        animate={props.mode}
                    />
                </svg>

                <svg style={{overflow: 'visible'}}>
                    <motion.circle
                        cx="50%"
                        cy="88.8%"
                        r="3"
                        fill="#666"
                        variants={dotVariants}
                        animate={props.mode}
                    />
                </svg>

                <svg style={{overflow: 'visible'}}>
                    <motion.circle
                        cx="50%"
                        cy="100%"
                        r="3"
                        fill="#666"
                        variants={dotVariants}
                        animate={props.mode}
                    />
                </svg>

            </svg>

            <div
                ref={sliderContainerRef}
                className="sliderContainer"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'flex-end',
                    position: 'relative',
                    width: props.width,
                    height: "100%",
            }}>
    
                <Slider
                    {...props}
                    ref={sliderContainerRef}
                />
            
            </div>

        </div>
        
    )
}

export default SliderContainer;