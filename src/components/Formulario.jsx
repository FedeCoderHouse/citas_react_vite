import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect( () => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const hash = Date.now().toString(36) + Math.random().toString(36).substring(2);
    return hash;
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      
      setError(true);
      return;
    } 
    setError(false);

    //Objeto de paciente
    const objetoPaciente = {
      nombre: nombre, 
      propietario: propietario, 
      email: email, 
      fecha: fecha, 
      sintomas: sintomas
    }
    
    if(paciente.id){
      //Editando registro anterior
      objetoPaciente.id = paciente.id;
      console.log(objetoPaciente)

      const pacientesActualizados = pacientes.map( (pacienteState) => {
        if(pacienteState.id == paciente.id){
          return objetoPaciente;
        } else {
          return pacienteState;
        }
      });

      setPacientes(pacientesActualizados);

    } else {
      //Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }
    

    //Reiniciar el form
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setPaciente("");
  }
  

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento de pacientes</h2>
      <p className="mt-5 text-lg text-center">
        Añade pacientes y {' '}
        <span className="text-orange-600 font-bold">Administalos</span>
      </p>
        <form 
        onSubmit={handleSubmit}
        className="bg-amber-300 shadow-md rounded-lg py-5 px-5 mt-10 mb-10">
          { error && 
            <Error>Falta completar al menos un campus</Error>
          }
          <div className="mb-5">
            <label 
                htmlFor="mascota"
                className="block text-gray-700 uppercase font-bold">
                Nombre Mascota
            </label>
            <input 
                id="mascota"
              type="text"
              placeholder="Nombre de la Mascota"
              className="border-2 focus:border-amber-600 focus:outline-none w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={ (e) => setNombre(e.target.value)}
              />
          </div>
          <div className="mb-5">
            <label 
                htmlFor="propietario"
                className="block text-gray-700 uppercase font-bold">
                Nombre Propietario
            </label>
            <input 
                id="propietario"
              type="text"
              placeholder="Nombre del propietario"
              className="border-2 focus:border-amber-600 focus:outline-none w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={ (e) => setPropietario(e.target.value) }
              />
          </div>
          <div className="mb-5">
            <label 
                htmlFor="email"
                className="block text-gray-700 uppercase font-bold">
                Email
            </label>
            <input 
                id="email"
                type="email"
                placeholder="Email contacto propietario"
                className="border-2 focus:border-amber-600 focus:outline-none w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={ (e) => setEmail(e.target.value) }          
            />
          </div>
          <div className="mb-5">
            <label 
                htmlFor="alta"
                className="block text-gray-700 uppercase font-bold">
                Alta
            </label>
            <input 
                id="alta"
                type="date"
                className="border-2 focus:border-amber-600 focus:outline-none w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fecha}
              onChange={ (e) => setFecha(e.target.value) }
            />
          </div>
          <div className="mb-5">
            <label 
                htmlFor="sintomas"
                className="block text-gray-700 uppercase font-bold">
                Síntomas
            </label>
            <textarea
                id="sintomas"
                placeholder="Describe los síntomas"
                className="h-32 border-2 focus:border-amber-600 focus:outline-none w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={sintomas}
              onChange={ (e) => setSintomas(e.target.value) }
            />
          </div>
          <input
            type="submit"
            className="bg-amber-600 w-full p-3 rounded-lg hover:text-amber-100 hover:bg-amber-700 transition-all uppercase cursor-pointer"
            value={paciente.id ? "modificar paciente" : "agregar paciente"}
          />
        </form>

    </div>
  )
}

export default Formulario
