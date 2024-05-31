'use client'

import React, { useEffect, useState } from 'react'
import './ListUsers.scss'


const ListUsers = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const uid = localStorage.getItem('id');
    console.log(uid)
    const fetchContact = async () => {
      const response = await fetch('/api/getContacts', { method: 'POST', body: JSON.stringify({ uid }) });

      const data = await response.json();

      setContacts(data.contacts);
    }

    fetchContact();

  }, [])

  console.log(contacts)
  return (
    <div className='container'>
      <h3>Lista de contactos:</h3>

      <div className='boxList'>

        {contacts && contacts.length != 0 ? contacts.map((item: any, index: number) => {
          return (
            <div key={`${index}`} className='itemList'>
              <div className='contentBox'>
                <span>contacto:</span>
                <span>{item.name} {item.lastname}</span>
              </div>
              <div className='contentBox'>
                <span>Email</span>
                <span>{item.email}</span>
              </div>
              <div className='contentBox'>
                <span>Categoria</span>
                <span>{item.category}</span>
              </div>
              <div className='contentBox'>
                <span>Numero de telefono</span>
                <span>Tel: {item.phoneNumber}</span>
              </div>
              <div className='contentBox'>
                <span>Fecha programada</span>
                <span>{item.time}hs</span>
              </div>
            </div>

          )
        }) : <span>No tiene datos de contacto todavia.</span>}
      </div>
    </div>
  )
}

export default ListUsers;