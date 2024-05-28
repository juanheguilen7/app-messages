import React from 'react'

const EditUser = () => {
  return (
    <div>
        <h4>Selecciona el usuario a editar</h4>
        <form action="">
            <div>
                <label htmlFor="">Seleciona el usuario</label>
                <select name="" id="">
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </div>
            <div>
                <label htmlFor="">Seleciona que quiere editar</label>
                <select>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
            </div>
            <div>
                <label htmlFor="">Valor viejo</label>
                <input type="text" value={'valor viejo'} />
            </div>
            <div>
                <label htmlFor="">Nuevo valor</label>
                <input type="text" />
            </div>
        </form>
    </div>
  )
}

export default EditUser