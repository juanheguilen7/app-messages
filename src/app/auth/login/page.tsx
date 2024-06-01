'use client'
import React, { useEffect, useState } from 'react';
import { auth, provider } from '@/app/utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';


import './login.scss'
import Image from 'next/image';

const Page = () => {

  const [value, setValue] = useState<any>('');
  const [error, setError] = useState<string | null>(null);
  const route = useRouter();

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data: any) => {
      setValue(data);
    })
  }
  useEffect(() => {
    const createUser = async () => {
      if (value) {
        localStorage.setItem('id', value.user.uid);
        try {
          const response = await fetch('/api/create-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
          });

          if (!response.ok) {
            throw new Error("Failed to create user");
          } else {
            route.push("/dashboard")
          }
        } catch (error) {
          setError("Failed to create user");
          console.error(error);
        }
      }
    };

    createUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <main className='login'>
      <div className='containerLog'>
        <h3>APP Sender Mailer</h3>
        <div className='box-login'>
          <Image src={"/images/google-icon.png"} alt='google-icon' width={35} height={35} />
          <button onClick={handleClick} className='btn-session' >
            Iniciar sesion
          </button>
        </div>
      </div>


    </main>
  )
}

export default Page;