import React from 'react'

import './AddUsers.scss';
const AddUsers = () => {
    return (
        <div>
            <h3>Agregar usuarios</h3>
            <form action="">
                <div>
                    <label htmlFor="">
                        Nombre
                    </label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">
                        Apellido
                    </label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">
                        Number
                    </label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">
                        Categorias
                    </label>
                    <input type="text" />
                </div>
            </form>
        </div>
    )
}

export default AddUsers;