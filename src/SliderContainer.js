/* eslint-disable react/prop-types */
import { React, useRef } from 'react'
import { motion } from 'framer-motion'
import Slider from './Slider'

const SliderContainer = props => {
  const sliderContainerRef = useRef(null)

  const indicatorVariants = {
    zero: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    },
    edit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    delay: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
    // count: {
    //     opacity: 0,
    //     transition: {
    //         staggerChildren: 0.05,
    //         staggerDirection: 1,
    //     },
    // },
  }

  const lineVariants = {
    zero: {
      opacity: 0,
      pathLength: 0,
      transition: {
        delay: 0.2
      }
    },

    edit: {
      opacity: 1,
      pathLength: 1,
      transition: {
        opacity: { duration: 0.05 },
        pathLength: { type: 'spring', duration: 0.3, bounce: 0 }
      }
    },

    delay: {
      opacity: 1,
      pathLength: 1,
      transition: {
        delay: 1
      }
    },

    count: {
      opacity: 0,
      pathLength: 0
    }
  }

  const dotVariants = {
    zero: {
      opacity: 0,
      pathLength: 0,
      transition: {
        delay: 0,
        opacity: { duration: 0.5 },
        pathLength: { type: 'spring', duration: 0.5, bounce: 0 }
      }
    },
    edit: {
      opacity: 1,
      pathLength: 1,
      transition: {
        opacity: { duration: 0.1 },
        pathLength: { type: 'spring', duration: 0.5, bounce: 0 }
      }
    },
    delay: {
      opacity: 1,
      pathLength: 1,
      transition: {
        opacity: { duration: 0.1 },
        pathLength: { type: 'spring', duration: 0.5, bounce: 0 }
      }
    },
    count: {
      opacity: 0,
      pathLength: 0
    }
  }

  const motionCircleProps = {
    cx: '50%',
    r: 3,
    fill: '#666',
    variants: dotVariants
  }

  const motionCircleCys = ['0%', '11.1%', '22.2%', '33.3%', '44.4%', '55.5%', '66.6%', '77.7%', '88.8%', '100%']

  return (

        <div
            id={props.id}
            className="numberSlider"
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              width: props.width,
              height: '75vh',
              overflow: 'visible'
            }}
        >

            <motion.svg
                className="indicators"
                width="100%"
                height="80%"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  overflow: 'visible',
                  position: 'absolute',
                  marginTop: '4rem'
                }}
                variants={indicatorVariants}
                animate={props.mode}
            >

                <motion.line
                    x1="50%"
                    x2="50%"
                    y1="100%"
                    y2="0%"
                    stroke="#666"
                    strokeWidth="2"
                    variants={lineVariants}
                    animate={props.mode}
                />

                {
                    motionCircleCys.map((cy, index) => {
                      return (
                            <motion.circle
                                {...motionCircleProps}
                                cy={cy}
                                key={index}
                            />
                      )
                    })
                }

            </motion.svg>

            <div
                ref={sliderContainerRef}
                className="sliderContainer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  position: 'relative',
                  width: props.width,
                  height: '100%'
                }}>

                <Slider
                    {...props}
                    ref={sliderContainerRef}
                />

            </div>

        </div>

  )
}

export default SliderContainer
