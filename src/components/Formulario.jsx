import React, {Fragment, useState} from 'react'
import uuid from 'uuid/v4'
import PropType from 'prop-types'

const Formulario = ({crearCita}) => {

    // Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [ error, actualizarError ] = useState(false)

    // Función que se ejecuta cada que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value 
        })
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();

        // Validar
        if(mascota.trim() === '' || propietario.trim() === ''  || fecha.trim() === ''  || hora.trim() === ''  || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }
        // Eliminar el mensaje previo 
        actualizarError(false);

        // Asignar un ID
        cita.id = uuid();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <Fragment>
             <h2>Citas</h2>

             { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

             <form onSubmit={submitCita}>
                 <label>Nombre Mascota</label>
                 <input
                 type="text"
                 name="mascota"
                 placeholder="Nombre mascota"
                 className="u-full-width"
                 onChange={actualizarState}
                 value={mascota}
                 />
                 <label>Nombre del dueño</label>
                 <input
                 type="text"
                 name="propietario"
                 placeholder="Nombre del dueño"
                 className="u-full-width"
                 onChange={actualizarState}
                 value={propietario}
                 />
                 <label>Fecha</label>
                 <input
                 type="date"
                 name="fecha"
                 className="u-full-width"
                 onChange={actualizarState}
                 value={fecha}
                 />
                 <label>Hora</label>
                 <input
                 type="time"
                 name="hora"
                 className="u-full-width"
                 onChange={actualizarState}
                 value={hora}
                 />
                 <label>Sintomas</label>
                 <textarea
                 name="sintomas"
                 className="u-full-width"
                 onChange={actualizarState}
                 value={sintomas}
                 ></textarea>
                 <button
                 type="submit"
                 className="u-full-width button-primary"
                 >Agregar cita</button>
             </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropType.func.isRequired
}

export default Formulario;