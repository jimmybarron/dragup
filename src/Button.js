import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Button.css'


const variants = {
  zero: {
    transition: {
      duration: 0.25,
    },
    scale: [null, 1.2, 1],
  },
  tapped: {
    x: 100
  }
}

const Button = props => {

  return (
        <motion.button
          className="Button"
          variants={variants}
          animate={props.mode}
          onClick={props.onClick}
        >
          {props.children}
        </motion.button>
  )
}

export default Button
