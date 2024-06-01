'use client'

import React, { useEffect, useState } from 'react'
import './MakeMenssages.scss'
import { auth } from '@/app/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';

const initialValues = {
    menssage: '',
    category: 'romanticas'
}

const MakeMenssages = () => {
    const [dataForm, setDataForm] = useState<any>(initialValues);
    const [user, setUser] = useState<any>('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser({
                    name: user.displayName,
                    image: user.photoURL
                });
            } else {
                // User is signed out
                setUser(null);
            }
        });


        return () => unsubscribe(); // Ensure unsubscribe is called during cleanup
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await fetch('/api', { method: 'POST', body: JSON.stringify(dataForm) });

        if (res.ok) {
            setDataForm(initialValues);
        }
    }

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        const dataObject = {
            ...dataForm,
            [name]: value
        }

        setDataForm(dataObject);
    }

    return (
        <div className='container-message'>
            {
                user ? <div className='welcomBox'>
                    <h3>Bienvenido: <mark>{user.name}</mark></h3>
                    <Image src={`${user.image}`} alt='foto-google' width={50} height={50} />

                </div> : null
            }

            <div>
                <h3>Crear mensaje</h3>
                <form onSubmit={handleSubmit} className='formMensagges'>
                    <div className='boxForm'>
                        <label htmlFor='menssage'>
                            Mensaje
                        </label>
                        <input type="text" name='menssage' id='menssage' onChange={handleChange} value={dataForm.menssage} />
                    </div>
                    <div className='boxForm'>
                        <label htmlFor='category'>
                            Categoria
                        </label>
                        <select name="category" id="category" onChange={handleChange} value={dataForm.category}>
                            <option value="romanticas">Romanticas</option>
                            <option value="graciosas">Graciosas</option>
                            <option value="motivadoras">Motivadoras</option>
                            <option value="financieras">Financieras</option>
                            <option value="curioso">Dato curioso</option>
                        </select>
                    </div>
                    <button type='submit'>Crear mensaje</button>
                </form>
            </div>
        </div>
    )
}

export default MakeMenssages