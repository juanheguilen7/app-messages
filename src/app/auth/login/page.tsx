'use client';

import { auth } from '@/utils/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import './login.scss'

const Login = () => {

  console.log(auth.currentUser);
  const [phone, setPhone] = useState<any>();
  const [user, setUser] = useState<any>();
  const [otp, setOtp] = useState<any>();
  const [name, setName] = useState<string>('');

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      console.log(recaptcha)
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setUser(confirmation)
    } catch (error) {
      console.error(error)
    }
  }

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      console.log(data);
      let userData = {
        phoneNumber: data.user.phoneNumber,
        name: name,
        id: data.user.uid
      }
      const response = await fetch('/api/create-user', { method: 'POST', body: JSON.stringify(userData) })

      if (response.ok) {
        setPhone('');
        setOtp('');
        setUser('');
        setName('')

      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='formContainer'>
      <h2>Iniciar sesion con el celular</h2>
      <div className='boxContent'>
        <div className='inputBox'>
          <label htmlFor="name">Ingrese su nombre</label>
          <input type="text" placeholder='pablito perez' name='name' id='name' onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div className='inputBox'>
          <PhoneInput
            country={"ar"}
            value={phone}
            onChange={(phone) => setPhone("+" + phone)} />
          <button onClick={sendOtp}>Send Otp</button>
          <div id='recaptcha'></div>
        </div>
        <div className='inputBox'>
          <input type="text" name="otp" id="otp" onChange={(e) => { setOtp(e.target.value) }} />
          <button onClick={verifyOtp}>Verify otp</button>
        </div>
      </div>
    </div>
  )
}

export default Login