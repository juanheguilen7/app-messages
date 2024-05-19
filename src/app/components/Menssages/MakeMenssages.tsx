'use client'

import React, { useState } from 'react'
import './MakeMenssages.scss'

const initialValues = {
    menssage:'',
    category: 'romanticas'
}

const MakeMenssages = () => {
    const [dataForm, setDataForm] = useState<any>(initialValues);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await fetch('/api', { method: 'POST', body: JSON.stringify(dataForm) });

        if(res.ok){
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
        <form onSubmit={handleSubmit} className='formMensagges'>
            <div className='boxForm'>
                <label htmlFor='menssage'>
                    Menssage
                </label>
                <input type="text" name='menssage' id='menssage' onChange={handleChange} value={dataForm.menssage}/>
            </div>
            <div className='boxForm'>
                <label htmlFor='category'>
                    Category
                </label>
                <select name="category" id="category" onChange={handleChange} value={dataForm.category}>
                    <option value="romanticas">Romanticas</option>
                    <option value="graciosas">Graciosas</option>
                    <option value="motivadoras">Motivadoras</option>
                    <option value="financieras">Financieras</option>
                    <option value="curioso">Dato curioso</option>
                </select>
            </div>
            <button type='submit'>Create Menssage</button>
        </form>
    )
}

export default MakeMenssages