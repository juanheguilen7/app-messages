'use client'
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/utils/firebase';
import { useRouter } from 'next/navigation';

import './navbar.scss';
import Link from 'next/link';

const NavBar = () => {
  const route = useRouter();
  const handleLogOut = async () => {
    signOut(auth);
    const response = await fetch('/api/logOut', {
      method: 'POST'
    })

    if (response.ok) {
      localStorage.removeItem('id');
      route.push('/auth/login')
    }
  }

  return (
    <nav className='containerNav'>
      <ul className='boxNav'>
        <Link href={'/history'}>
          Historial
        </Link>
        <Link href={'/dashboard'}>
          Panel de control
        </Link>
        <span onClick={handleLogOut}>Cerarr sesion</span>
      </ul>
    </nav>
  )
}

export default NavBar