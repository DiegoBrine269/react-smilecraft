import {  useEffect, useState } from "react";
import useSmilecraft from "../hooks/useSmilecraft";
import clienteAxios from "../config/axios"
import Alerta from "./Alerta";
import { toast } from "react-toastify"
import DataTable from "react-data-table-component";
import { estilosTabla } from "../helpers/helper";
import { formatearDinero, paginationComponentOptions } from "../helpers/helper";
import Swal from "sweetalert2";


export default function FormPago({modo}) {

    const { doctores,  handleClickAtras, obtenerPagos, obtenerTrabajos } = useSmilecraft()
    const [deudas, setDeudas] = useState([])

    const token = localStorage.getItem('AUTH_TOKEN')

    const registrarPago = (row) => {
        Swal.fire({
            title: "Ingresa el monto",
            // text: "Para marcar como completado, por favor ingresa tu nombre:",
            input: 'number',
            cancelButtonText: 'Cancelar',
            showCancelButton: true      ,
            inputAttributes: {
                required: 'true',
            },
            inputValidator: (value) => {
                if (value === '') {
                    return 'Por favor, ingresa una cantidad'
                }
            },
        }).then( async result => {
            // Se ingresó un nombre
            if (result.value) {
                try {

                    const date = new Date();
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Suma 1 ya que los meses son basados en cero
                    const day = String(date.getDate()).padStart(2, '0');

                    await clienteAxios.post('/api/pagos', {
                        id_trabajo : row.id,
                        monto : result.value,
                        fecha: `${year}-${month}-${day}`
                    },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )

                    obtenerPagos()
                    obtenerTrabajos()
                    handleClickAtras()
                    toast.success('Pago registrado existosamente')
                } catch(error) {
                    console.log(error)
                }
            }
        });
    }


    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            omit: true
        },
        {
            name: 'Folio',
            selector: row => row.folio,
            sortable: true
        },

        {
            name: 'ID_Descripcion',
            selector: row => row.id_descripcion,
            omit: true
        },

        {
            name: 'Paciente',
            selector: row => row.paciente,
            sortable:true,
            width: "15%" ,  
        },
        {
            name: 'Trabajo',
            selector: row => row.desc,
            sortable:true,
            width: "25%" ,  
        },

        {
            name: 'Recepción',
            selector: row => row.fecha,
            sortable:true,
            width: "20%" ,
        },
        {
            name: 'Entrega',
            selector: row => row.fecha_entrega,
            sortable:true,
            width: "12%" ,
            cell: row => (
                row.fecha_entrega ?? <p>Pendiente</p> 
            ),
        },
        {
            name: 'A cuenta',
            selector: row => row.a_cuenta,
            width: "12%" ,
            cell: row => (
                formatearDinero(row.a_cuenta)
            ),
        },
        {
            name: 'Total',
            selector: row => row.total,
            sortable:true,
            width: "12%" ,
            cell: row => (
                formatearDinero(row.total)
            ),
        },
    ]



    const obtenerDeudas = (e) => {
        const id = e.target.value;
        setDeudas([])
        clienteAxios.get(`/api/trabajos/deudas/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(response => {
            setDeudas(response.data)
        })
    } 

    return (
        <>

            <div className="flex items-center my-3">
                <button 
                    className="mr-3"
                    onClick={()=>{handleClickAtras()}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <h2 className="text-lg">{ modo === 'crear' ? 'Registrar nuevo pago' : 'Editar pago'}</h2>  
            </div>

            <div className="w-full mb-4">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="selectDoctor">
                    Doctor
                </label>
                <div className="relative">
                    <select defaultValue="0" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="selectDoctor" 
                        name="id_doctor" 
                        onChange={obtenerDeudas}
                    >
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
            

            {/* {deudas || <p>Selecciona un trabajo al que deseas abonar</p>} */}
            <DataTable
                columns={columns}
                data={deudas}
                noDataComponent="Sin deudas"
                pagination
                customStyles={estilosTabla}
                onRowClicked={registrarPago}
                pointerOnHover
                highlightOnHover
                paginationComponentOptions={paginationComponentOptions}
            />
                
            
        </>
    )
}
