import { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Header from './components/Header';
import ListadoPacientes from './components/ListadoPacientes';

function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({})

  useEffect( () => {
    const listado = JSON.parse(localStorage.getItem("pacientes")) ?? [];

    if(listado.length > 0){

        setPacientes(listado);

    };
  }, []);


  useEffect( () => {
    localStorage.setItem("pacientes", JSON.stringify( pacientes ));
    console.log(localStorage.getItem("pacientes"));
  }, [pacientes]);



  const eliminarPaciente = (id) => {
    const nuevoArregloPacientes = pacientes.filter( (pacienteActual) => {
      if(pacienteActual.id != id){
        return pacienteActual
      }
    });
    setPacientes(nuevoArregloPacientes)
    //console.log(`Eliminando paciente, ${id}`);
  }

  return (
    <div className='container mx-auto mt-20'>
      <Header/>
      <div className='mt-12 md:flex'>
        <Formulario
          pacientes={pacientes} 
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
