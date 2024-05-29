'use client'
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase';
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
      sessionStorage.removeItem('id');
      route.push('/auth/login')
    }
  }

  return (
    <nav className='containerNav'>
      <ul className='boxNav'>
        <Link href={'/history'}>
          Historial de mensajes enviados
        </Link>
        <Link href={'/dashboard'}>
          Dashboard
        </Link>
        <button onClick={handleLogOut}>Log Out</button>
      </ul>
    </nav>
  )
}

export default NavBar