import Paciente from "./Paciente";

const ListadoPacientes = ( {pacientes, setPaciente, eliminarPaciente} ) => {

    return (
        <div className="md:w-1/2 lg:w-3/5 ">
            {pacientes.length == 0?(
                <>
                    <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                    <p className="mt-5 mb-10 text-lg text-center">
                    Comienza a agregar pacientes {" "}
                        <span className="text-orange-600 font-bold">y aparecerán en este lugar</span>
                    </p>
                </>
            ) : (
                <>
                    
                    <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
                    <p className="mt-5 mb-10 text-lg text-center">
                        Administra tus {" "}
                        <span className="text-orange-600 font-bold">Pacientes</span>
                    </p>
                    <div className="md:h-screen overflow-y-scroll">
                    
                    { pacientes.map( (paciente) => (
                        
                            
                            <Paciente
                                key={paciente.id}
                                paciente={paciente}
                                setPaciente={setPaciente}
                                eliminarPaciente={eliminarPaciente}
                            />

                        )
                    )}
                    </div>
                </>
            )}
        </div>
    )
}

export default ListadoPacientes;