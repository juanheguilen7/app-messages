'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './AddUsers.scss';
import { auth, onAuthStateChanged } from '@/app/utils/firebase';
import Image from 'next/image';

const initialValues = {
    name: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    category: '',
    time: ''
}

const AddUsers = () => {
    const [dataForm, setDataForm] = useState(initialValues);
    const router = useRouter();


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const id = localStorage.getItem('id');
        if (id) {
            const sendData = {
                contact: dataForm,
                uid: id
            };
            const response = await fetch('/api/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendData)
            });
            if (response.ok) {
                setDataForm(initialValues);
            } else {
                console.error('Failed to save contact');
            }
        }
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setDataForm({
            ...dataForm,
            [name]: value
        });
    };

    return (
        <>
            <div>
                <h3 className='addUser-title'>Agregar usuarios</h3>
                <form onSubmit={handleSubmit} className='form-addUser'>
                    <div className='form-input'>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id='name' name='name' onChange={handleChange} value={dataForm.name} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor="lastname">Apellido:</label>
                        <input type="text" id='lastname' name='lastname' onChange={handleChange} value={dataForm.lastname} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor="phoneNumber">Número:</label>
                        <input type="text" name='phoneNumber' id='phoneNumber' onChange={handleChange} value={dataForm.phoneNumber} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' id='email' value={dataForm.email} onChange={handleChange} />
                    </div>
                    <div className='form-input'>
                        <label htmlFor="category">Categoría:</label>
                        <select name="category" id="category" value={dataForm.category} onChange={handleChange} className='selectUser'>
                            <option value="romanticas">Románticas</option>
                            <option value="motivadoras">Motivadoras</option>
                            <option value="curioso">Dato Curioso</option>
                            <option value="graciosas">Graciosas</option>
                        </select>
                    </div>
                    <div className='form-input'>
                        <label htmlFor="time">Hora para enviar el mensaje:</label>
                        <input type="time" name='time' id='time' onChange={handleChange} value={dataForm.time} />
                    </div>
                    <button type="submit">Guardar contacto</button>
                </form>
            </div>
        </>
    )
}

export default AddUsers;
