'use client'

import React from 'react'
import './controlcontain.scss'
const ControlContain = () => {
  const handleSubmit = async () => {
    const response = await fetch('/api/sendEmail', { method: 'POST' });
  }
  return (
    <div>
      <div className='boxList'>
        lista de usuarios que se le esta enviando mensajes y el horario
      </div>
    </div>
  )
}

export default ControlContain;