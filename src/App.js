import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './Components/Formulario'
import Cita from './Components/Cita'
function App() {
  //pasar el contenido del storage al state inicial
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //useState retorna 2 funciones
  //primero es el state actual y segundo es la funcion que actualiza el state
  const [citas, guardarCita] = useState(citasIniciales);

  //agregar las nuevas citas al state
  const crearCita = cita => {
    //tomar una copia del state y agregar un nuevo cita
    const nuevasCitas = [...citas, cita];
    //almacenamos en el state
    guardarCita(nuevasCitas);
  }

  //elimina las citas del state
  const eliminarCita = index => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    guardarCita(nuevasCitas);
  }

  //cargar condicionalmente un titulo
  const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administrar las citas';

  useEffect(() => {
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));
        if(citasIniciales) {
          localStorage.setItem('citas', JSON.stringify(citas));
        } else {
          localStorage.setItem('citas', JSON.stringify([]));
        }}, [citas] )
  
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index)=>(
              <Cita 
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
