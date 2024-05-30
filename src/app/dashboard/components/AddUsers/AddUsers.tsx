'use client'
import React, { useState } from 'react'

import './AddUsers.scss';
const initialValues = {
    name: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    category: 'romanticas',
    time: ''
}
const AddUsers = () => {
    const [dataForm, setDataForm] = useState<any>(initialValues);
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const id = localStorage.getItem('id');
        if (id) {
            const sendData = {
                contact: dataForm,
                uid: id
            }
            const response = await fetch('/api/addUser', { method: 'POST', body: JSON.stringify(sendData) });
            if (response.ok) {
                setDataForm(initialValues);
            }
        }
    }
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        const dataOject = {
            ...dataForm,
            [name]: value
        }
        setDataForm(dataOject);

    }


    return (
        <div>
            <h3>Agregar usuarios</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">
                        Nombre
                    </label>
                    <input type="text" id='name' name='name' onChange={handleChange} value={dataForm.name} />
                </div>
                <div>
                    <label htmlFor="lastname">
                        Apellido
                    </label>
                    <input type="text" id='lastname' name='lastname' onChange={handleChange} value={dataForm.lastname} />
                </div>
                <div>
                    <label htmlFor="phoneNumber">
                        Number
                    </label>
                    <input type="text" name='phoneNumber' id='phoneNumber' onChange={handleChange} value={dataForm.phoneNumber} />
                </div>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name='email' id='email' value={dataForm.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="category">
                        Categorias
                    </label>
                    <select name="category" id="category" value={dataForm.category}>
                        <option value="romanticas">Romanticas</option>
                        <option value="motivadoras">Motivadoras</option>
                        <option value="curioso">Dato Curioso</option>
                        <option value="graciosas">Graciosas</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="time">
                        Hora en la que quiero que se envie el mensaje
                    </label>
                    <input type="time" name='time' id='time' onChange={handleChange} value={dataForm.time} />
                </div>
                <button type="submit">Guardar contacto</button>
            </form>
        </div>
    )
}

export default AddUsers;