import React from 'react';

import './EditUser.scss';

const EditUser = () => {
  return (
    <div>
        <h4 className='editUser-title'>Edita el usuario:</h4>
        <form className='formEdit'>
            <div className='inputEdit'>
                <label htmlFor="">Seleciona el usuario</label>
                <select name="" id="" className='selectEdit'>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </div>
            <div className='inputEdit'>
                <label htmlFor="">Seleciona que quiere editar</label>
                <select  name="" id="" className='selectEdit' >
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </div>
            <div className='inputEdit'>
                <label htmlFor="">Valor viejo</label>
                <input type="text" value={''} />
            </div>
            <div className='inputEdit'>
                <label htmlFor="">Nuevo valor</label>
                <input type="text" />
            </div>
            <button type="submit">Editar</button>
        </form>
    </div>
  )
}

export default EditUser