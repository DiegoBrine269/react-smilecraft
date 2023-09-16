import { createContext, useEffect, useState } from "react"
import clienteAxios from "../config/axios"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const SmilecraftContext = createContext()

const SmilecraftProvider = ({children}) => {
    
    
    const [opcion, setOpcion] = useState(1)

    const [trabajos, setTrabajos] = useState([])
    const [trabajosFilter, setTrabajosFilter] = useState(trabajos)
    const [formTrabajo, setFormTrabajo] = useState(false)
    const [modoFormTrabajo, setModoFormTrabajo] = useState(false)
    const [trabajo, setTrabajo] = useState({})
        
    const [doctores, setDoctores] = useState([])
    const [doctoresFilter, setDoctoresFilter] = useState(doctores)

    const [tonos, setTonos] = useState([])
    
    const [descripciones, setDescripciones] = useState([])
    const [tipoDesc, setTipoDesc] = useState(1)
    const [formDesc, setFormDesc] = useState(false)
    

    const [pagos, setPagos] = useState([])
    const [formPago, setFormPago] = useState(false)
    
    const [modal, setModal] = useState(false)
    const [isLoading, setLoading] = useState(true)

    const [errores, setErrores] = useState([])

    const token = localStorage.getItem('AUTH_TOKEN')

    useEffect(() => {
        
        obtenerTonos()
        obtenerTrabajos()
        obtenerDoctores()
        obtenerDescripciones()
        obtenerPagos()

    }, []);

    const handleClickOpcion = (o) =>  {
        setOpcion(o)
    }

    const handleSetTrabajos = (t) => {
        setTrabajos(t)
        setTrabajosFilter(t)
    } 

    const handleSetDoctores = (t) => {
        setDoctores(t)
        setDoctoresFilter(t)
    } 

    const handleFilterTrabajos = (e) => {
        let t
        if(e.target.id === 'doctor')
            t = trabajos.filter(row => row.doctor.toLowerCase().includes(e.target.value.toLowerCase()))
        else if(e.target.id === 'paciente')
            t = trabajos.filter(row => row.paciente.toLowerCase().includes(e.target.value.toLowerCase()))

        setTrabajosFilter(t)
    }

    const handleFilterDoctores = (e) => {
        const d = doctores.filter(row => row.nombre.toLowerCase().includes(e.target.value.toLowerCase()))
        setDoctoresFilter(d)
        // console.log(0)
    }



    const handleClickAtras = () => {
        setFormTrabajo(false)
        setFormPago(false)
        setFormDesc(false)
    }



    const obtenerTrabajos = () => {
        setLoading(true)
        clienteAxios.get('/api/trabajos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            handleSetTrabajos(response.data.data);
            setLoading(false);
        });
    }

    const obtenerDoctores = () => {
        setLoading(true)
        clienteAxios.get('/api/doctores', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            handleSetDoctores(response.data.data);
            setLoading(false);
        });
    }

    const obtenerDescripciones = () => {
        setLoading(true)
        clienteAxios.get('/api/descripciones', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setDescripciones(response.data.data);
            setLoading(false);
        });
    }

    const obtenerTonos = () => {
        setLoading(true)
        clienteAxios.get('/api/tonos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setTonos(response.data.data)
            setLoading(false);
        });
    }

    const obtenerPagos = () => {
        setLoading(true)
        clienteAxios.get('/api/pagos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        ).then(response => {
            setPagos(response.data.data)
            setLoading(false);
        });
    }



    const handleClickNuevoTrabajo = (modo) => {
        setFormTrabajo(true)
        setModoFormTrabajo(modo)
    }


    const handleClickEliminarTrabajo = (data) => {
        
        Swal.fire({
            title: "¿Estás segur@?",
            text: "Una vez eliminado, no podrá ser recuperado.",
            icon: "warning",
            // buttons: true,
            
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
         })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {
                try {
                    console.log(data)
                    // clienteAxios.delete(`/api/pagos/${data.id}`)
                    // obtenerTrabajos()
                    // toast.success('Trabajo eliminado correctamente')
                } catch (error) {
                    console.log(error)
                }
            } 
        });

    }

    const handleClickCerrarModal = () => {
        setModal(false)
    }

    const handleChangeTrabajo = (e) => {
        // setTrabajo(t)
        const idDesc = e.target.value
        const tipo = descripciones.find(d => d.id == idDesc).tipo
        setTipoDesc(tipo)
        console.log(tipoDesc)
    }

    return (
        <SmilecraftContext.Provider
            value = {{
                handleClickOpcion,
                opcion,
                isLoading,

                handleClickNuevoTrabajo,
                handleClickEliminarTrabajo,
                trabajos,
                obtenerTrabajos,
                handleFilterTrabajos,
                trabajosFilter,
                formTrabajo,
                trabajo, 
                handleChangeTrabajo,
                modoFormTrabajo,
                setTrabajo,


                doctores,
                doctoresFilter,
                handleFilterDoctores,
                obtenerDoctores,

                descripciones,
                obtenerDescripciones,
                tipoDesc,
                setTipoDesc,
                formDesc,
                setFormDesc,

                tonos,

                pagos,
                formPago,
                setFormPago,
                obtenerPagos,

                modal,
                handleClickCerrarModal,

                handleClickAtras,

                errores, setErrores
            }} 
        >
            {children}
        </SmilecraftContext.Provider>
    )
}

export {
    SmilecraftProvider
}

export default SmilecraftContext
