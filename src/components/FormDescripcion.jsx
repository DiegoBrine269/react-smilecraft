import clienteAxios from "../config/axios"
import useSmilecraft from "../hooks/useSmilecraft"
import { createRef } from "react"
import Alerta from "./Alerta"
import { toast } from "react-toastify"

export default function FormDescripcion() {

    const {handleClickAtras, errores, setErrores, obtenerDescripciones} = useSmilecraft()

    const descRef = createRef()
    const montoRef = createRef()
    const tipoRef = createRef()

    const token = localStorage.getItem('AUTH_TOKEN')

    const handleSubmitDesc = async e => {
        setErrores([])
        e.preventDefault()

        const datos = {
            desc : descRef.current.value,
            monto : montoRef.current.value,
            tipo: tipoRef.current.value
        }

        try {
            await clienteAxios.post('/api/descripciones', {
                desc : datos.desc,
                precio : datos.monto,
                tipo: '1'
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            obtenerDescripciones()
            handleClickAtras()
            toast.success('Servicio creado exitosamente')
        } catch(error){
            console.log(error)
            setErrores(Object.values(error?.response?.data?.errors))
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
                <h2 className="text-lg">Nuevo servicio</h2>  
            </div>

            <form  
                className="font-poppins"
                onSubmit={handleSubmitDesc}
            >
                <div className="w-full mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="txtServicio">
                        Nombre del servicio
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="txtServicio" type="text" placeholder="Nombre del servicio" name="paciente" ref={descRef}/>
                </div>

                <div className="w-full mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numPrecio">
                        Precio del servicio
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="numPrecio" type="number" placeholder="Precio del servicio" name="precio" ref={montoRef}/>
                </div>


                <div className="w-full mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="selectDoctor">
                        Tipo de servicio
                    </label>
                    <div className="relative">
                        <select defaultValue="0" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="selectDoctor" name="id_doctor" ref={tipoRef} >
                            <option value="1">Tipo 1 - Requiere color de tono</option>
                            <option value="2">Tipo 2 - No requiere tono (metálico)</option>
                            <option value="3">Tipo 3 - Retenedores opcionales</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
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
