import { createRef, useEffect, useRef, useState } from "react";
import useSmilecraft from "../hooks/useSmilecraft";
import clienteAxios from "../config/axios"
import Alerta from "./Alerta";
import { toast } from "react-toastify"

export default function FormTrabajo({modo = 'crear'}) {

    const {doctores, descripciones, tonos, handleClickAtras, tipoDesc, 
        handleChangeTrabajo, trabajo, errores, setErrores, obtenerTrabajos, setTipoDesc} = useSmilecraft()

    // const [fechaRec, setFechaRec] = useState(new Date());
    // const [fechaEnt, setFechaEnt] = useState(new Date());

    const token = localStorage.getItem('AUTH_TOKEN')

    
    const doctorRef = createRef()
    const descripcionRef = createRef()
    const pacienteRef = createRef()
    const tonoRef = createRef()
    const folioRef = createRef()
    const recRef = createRef()
    const entRef = createRef()
    const aCuentaRef = createRef()
    const ganchosBolaRef = createRef()
    const ganchosWiplaRef = createRef()
    const ganchosVaciadoRef = createRef()
    const [urgente, setUrgente] = useState(false)

    useEffect(() => {
        setErrores([])
        if(modo === 'editar') {
            doctorRef.current.value = trabajo?.id_doctor
            descripcionRef.current.value = trabajo?.id_descripcion
            setTipoDesc(trabajo.tipo)
            pacienteRef.current.value = trabajo?.paciente
            if(tonoRef.current)
                tonoRef.current.value = trabajo?.tono 
            folioRef.current.value = trabajo?.folio

            const fecha1 = trabajo.fecha_recepcion.split('/').reverse().join('-')
            recRef.current.value = fecha1

            if(trabajo.fecha_entrega){
                const fecha2 = trabajo?.fecha_entrega.split('/').reverse().join('-') 
                entRef.current.value = fecha2
            }

            if(trabajo?.urgente === 'Sí')
                setUrgente(true)

            if(trabajo.ganchos_bola) ganchosBolaRef.current.value = trabajo.ganchos_bola
            if(trabajo.ganchos_wipla) ganchosWiplaRef.current.value = trabajo.ganchos_wipla
            if(trabajo.ganchos_vaciado) ganchosVaciadoRef.current.value = trabajo.ganchos_vaciado
        }
    }, [])
    
    
    const handleSubmitTrabajo = async e => {
        e.preventDefault()
        const datos = {
            id_doctor : doctorRef.current.value,
            id_descripcion : descripcionRef.current.value,
            paciente : pacienteRef.current.value,
            id_tono : tonoRef.current?.value,
            folio : folioRef.current?.value,
            fecha_recepcion : recRef.current.value,
            fecha_entrega : entRef.current.value,
            a_cuenta : aCuentaRef.current?.value,
            ganchos_bola : ganchosBolaRef.current?.value,
            ganchos_wipla : ganchosWiplaRef.current?.value,
            ganchos_vaciado : ganchosVaciadoRef.current?.value,
            urgente : urgente
        }

        const headers = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            if(modo === 'crear')
                await clienteAxios.post('/api/trabajos/', datos, headers)
            else if(modo === 'editar')
                await clienteAxios.put(`/api/trabajos/${trabajo.id}`, datos, headers)
            
            obtenerTrabajos()
            handleClickAtras()
            toast.success('Trabajo guardado correctamente')
            
        } catch(error) {
            console.log(error.response.data.errors)
            setErrores(Object.values(error?.response?.data?.errors))
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        }
    }

    return (
        <>
            {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
            <div className="flex items-center my-3">
                <button 
                    className="mr-3"
                    onClick={()=>{handleClickAtras()}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <h2 className="text-lg">{ modo === 'crear' ? 'Registrar nuevo trabajo' : 'Editar'}</h2>  
            </div>
            <form  
                className="font-poppins"
                onSubmit={handleSubmitTrabajo}
            >
                <div className="w-full mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="selectDoctor">
                        Doctor
                    </label>
                    <div className="relative">
                        <select defaultValue="0" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="selectDoctor" name="id_doctor" ref={doctorRef} >
                            <option value="0" disabled>Selecciona un doctor</option>
                            {
                                doctores.map((doctor, i) => {
                                    return <option value={doctor.id} key={i}>{doctor.nombre}</option>
                                })
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <div className="w-full mb-4 ">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="selectDescripcion">
                        Descripcion
                    </label>
                    <div className="relative">
                        <select 
                            defaultValue="0" 
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="selectDescripcion"
                            onChange={handleChangeTrabajo}
                            ref={descripcionRef}
                        >
                            <option value="0" disabled>Selecciona una descripción</option>
                            {
                                descripciones.map((descripcion, i) => {
                                     return (descripcion.tipo === 1 || descripcion.tipo === 2 || descripcion.tipo === 3) ? 
                                        <option value={descripcion.id} key={i}>{descripcion.desc}</option> 
                                        : null
                                })
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <div className="w-full mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="txtPaciente">
                        Paciente
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="txtPaciente" type="text" placeholder="Paciente" name="paciente" ref={pacienteRef}/>
                </div>

                { 
                    (tipoDesc === 3) && <div className="w-full mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numGancho1">
                            Retenedores
                        </label>
                        <div className="pl-3">
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="numGanchosBola" className="mr-3 ">Ganchos de bola</label>
                                <input className="appearance-none block w-[50%] bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="numGanchosBola" name="ganchos_bola" type="number" placeholder="Cantidad" ref={ganchosBolaRef}/>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="numGanchosWipla" className="mr-3 ">Ganchos wipla</label>
                                <input className="appearance-none block w-[50%] bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="numGanchosWipla" name="ganchos_wipla" type="number" placeholder="Cantidad" ref={ganchosWiplaRef}/>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="numGanchosVaciado" className="mr-3 ">Ganchos vaciados</label>
                                <input className="appearance-none block w-[50%] bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="numGanchosVaciado" name="ganchos_vaciado" type="number" placeholder="Cantidad" ref={ganchosVaciadoRef}/>
                            </div>
                        </div>
                    </div>
                }

                {
                    (tipoDesc === 2) ||
                    <div className="w-full mb-4 ">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="selectDescripcion">
                            Tono
                        </label>
                        <div className="relative">
                            <select defaultValue="0" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="selectDescripcion" ref={tonoRef}>
                                <option value="0" disabled>Selecciona un tono</option>
                                {
                                    tonos.map(tono => {
                                        return <option value={tono.id} key={tono.id}>{tono.id}</option>
                                    })
                                }
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                }

                
                <div className="w-full mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="txtFolio">
                        Folio
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="txtFolio" type="text" placeholder="Folio" name="folio" ref={folioRef}/>
                </div>


                <div className="w-full mb-4 ">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dateFechaRec">
                        Recepción
                    </label>
                    <input  
                        // value={fechaRec.toISOString().split("T")[0]}
                        // onChange={(e) => setFechaRec(new Date(e.target.value))}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="dateFechaRec" type="date" placeholder="Paciente"
                        ref={recRef}
                    />
                </div>

                <div className="w-full mb-4 ">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dateFechaRec">
                        Entrega
                    </label>
                    <input
                        // onChange={(e) => setFechaEnt(new Date(e.target.value))}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="dateFechaRec" type="date" placeholder="Paciente"
                        ref={entRef} 
                        defaultValue={null}   
                    />
                </div>

                <div className={`w-full mb-4 ${modo === 'editar' ? 'hidden' : ''}`}>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numACuenta">
                        A cuenta
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="numACuenta" type="number" placeholder="Cantidad" ref={aCuentaRef}/>
                </div>

                <div className="w-full mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="checkUrgente">
                        Urgente
                    </label>
                    
                    <input 
                        id="checkUrgente"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                        checked={urgente}
                        onChange={()=>{setUrgente(!urgente)}}
                    />
                </div>

                <div className="w-full mb-4">   
                    <input 
                        type="submit" 
                        value="Guardar" 
                        className="w-full flex justify-center bg-gris text-white px-3 py-2 rounded-lg mb-3 md:mb-0"
                    />
                </div>

            </form>
        </>
    )
}
