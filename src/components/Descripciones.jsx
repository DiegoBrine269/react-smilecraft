import useSmilecraft from "../hooks/useSmilecraft"
import { useState } from "react"
import { estilosTabla, formatearDinero, paginationComponentOptions } from "../helpers/helper"
import Swal from "sweetalert2"
import DataTable from "react-data-table-component"
import FormDescripcion from "./FormDescripcion"
import clienteAxios from "../config/axios"
import { toast } from "react-toastify"


export default function Descripciones() {
    const {isLoading, obtenerDescripciones, descripciones, formDesc, setFormDesc, handleClickAtras, obtenerTrabajos} = useSmilecraft()
    
    const ExpandedComponent = ({ data }) => { 

        const handleClickCambiarPrecio = async data => {

            Swal.fire({
                title: "Ingresa el nuevo precio",
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
               
                if (result.value) {
                    try {
                        const token = localStorage.getItem('AUTH_TOKEN')
                        await clienteAxios.put(`/api/descripciones/${data.id}`, {
                            precio :  result.value
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
    
                        obtenerDescripciones()
                        handleClickAtras()
                        toast.success('Precio actualizado exitosamente')
                    } catch(error) {
                        console.log(error)
                    }
                }
            });
        }

        const handleClickEliminarDesc = (data) => {
            Swal.fire({
                title: "¿Estás segur@?",
                text: "Todos los trabajos relacionados a este servicio se eliminarán también",
                icon: "warning",           
                showCancelButton: true,
                cancelButtonText: 'Cancelar'
             })
            .then((willDelete) => {
                if (willDelete.isConfirmed) {
                    try {
                        const token = localStorage.getItem('AUTH_TOKEN')
                        clienteAxios.delete(`/api/descripciones/${data.id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        obtenerTrabajos()
                        obtenerDescripciones()
                        handleClickAtras()
                        toast.success('Servicio eliminado exitosamente')
                    } catch (error) {
                        console.log(error)
                    }
                } 
            });
        }

        return (
            <div className="my-2 px-3 grid grid-cols-2 gap-3 w-[95vw] text-sm">
                <button 
                    className="flex items-center bg-verde text-black px-3 py-2 rounded-lg my-3 md:mb-0"
                    onClick={()=>{handleClickCambiarPrecio(data)}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    &nbsp;
                    Cambiar precio
                </button>

                <button 
                    className="flex items-center bg-red-800 text-white px-3 py-2 rounded-lg my-3 md:mb-0"
                    onClick={()=>{handleClickEliminarDesc(data)}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                    &nbsp;
                    Eliminar servicio
                </button>
            </div>
        )
    }

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.desc,
            sortable:true,
        },
        {
            name: 'Precio',
            selector: row => row.precio,
            sortable:true,
            cell: row => (
                formatearDinero(row.precio)
            ),
        }
    ]

    const handleClickNuevaDesc = (modo) => {
        setFormDesc(true)
    }

    if (isLoading) {
        return 'Cargando...'
    }

    return (
        <>
        { formDesc ||
                <>  
                    <h2 className="mt-2 text-lg">Listado de servicios</h2>  
                    <div className="my-2 flex flex-col md:flex-row md:justify-end">
                        <button 
                            className="flex bg-indigo-500 text-white px-3 py-2 rounded-lg"
                            onClick={handleClickNuevaDesc}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            &nbsp;
                            Registrar nuevo servicio
                        </button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={descripciones}
                        noDataComponent="No hay registros para mostrar"
                        pagination
                        customStyles={estilosTabla}
                        expandableRows
                        expandableRowExpanded={row => row.defaultExpanded}
                        expandableRowsComponent={ExpandedComponent}
                        expandOnRowClicked
                        paginationComponentOptions={paginationComponentOptions}
                    />
                </>

            }
            {
                formDesc &&
                <FormDescripcion/>
                
            }

        </>
    )
}
