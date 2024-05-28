'use client'

import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';

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
    <nav>
      <ul>
        <li>Historial de mensajes enviados</li>
        <li>Dashboard</li>
        <button onClick={handleLogOut}>Log Out</button>
      </ul>
    </nav>
  )
}

export default NavBar