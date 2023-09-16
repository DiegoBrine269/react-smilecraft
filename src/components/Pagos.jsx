import DataTable from "react-data-table-component"
import useSmilecraft from "../hooks/useSmilecraft"
import { estilosTabla, formatearDinero, paginationComponentOptions } from "../helpers/helper"
import { customStyles } from "../helpers/helper"
import { useState, useEffect, useRef } from "react"
import FormPago from "./FormPago"
import Swal from "sweetalert2"
import clienteAxios from "../config/axios"
import { toast } from "react-toastify"

export default function Pagos() {
    
    
    const { pagos, formPago, setFormPago, obtenerPagos } = useSmilecraft()
    
    const [pagosFilter, setPagosFilter] = useState(pagos)
    const [modoFormPago, setModoFormPago] = useState('crear')

    const token = localStorage.getItem('AUTH_TOKEN')

    useEffect(() => {
        setPagosFilter(pagos)
    }, [pagos])
    
    
    const handleFilterPagos = (e) => {
        const p = pagos.filter(row => row.doctor.toLowerCase().includes(e.target.value.toLowerCase()))
        setPagosFilter(p)
    }

    const handleClickNuevoPago = (modo) => {
        setFormPago(true)
        setModoFormPago(modo)
    }

    const handleClickEliminarPago = (row) => {
        Swal.fire({
            title: "¿Estás segur@?",
            text: "Una vez eliminado, no podrá ser recuperado.",
            icon: "warning",           
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
         })
        .then((willDelete) => {
            if (willDelete.isConfirmed) {
                try {
                    clienteAxios.delete(`/api/pagos/${row.id}`, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )
                    obtenerPagos()
                    toast.success('Trabajo eliminado correctamente')
                } catch (error) {
                    console.log(error)
                }
            } 
        });
    }

    const columns = [
        // {
        //     name: 'Número de pago',
        //     selector: row => row.id,
        //     sortable: true
        // },
        {
            name: 'Doctor',
            selector: row => row.doctor,
            sortable: true,
            cell: row => row.doctor,
            width: "35%"
        },
        {
            name: 'Fecha',
            selector: row => row.fecha,
            sortable: true,
            width: "35%"
        },
        {
            name: 'Monto',
            selector: row => row.monto,
            sortable: true,
            cell: row => formatearDinero(row.monto),
            width: "30%"
        },
        {
            name: 'Folio',
            selector: row => row.folio,
            sortable: true,
            cell: row => row.folio,
            width: "25%"
        },
    ]


    return (
        <>
            { formPago ||
                <>  
                    <h2 className="mt-2 text-lg">Listado de pagos</h2>  
                    <div className="my-2 flex flex-col md:flex-row md:justify-between">
                        <input 
                            type="text" 
                            onChange={handleFilterPagos}
                            id="doctor"
                            placeholder="Filtrar por doctor"
                            className="bg-gray-200 px-3 py-2 rounded-lg mb-3 md:mb-0 md:w-[25%]"
                        />
                        
                        <button 
                            className="flex bg-gris text-white px-3 py-2 rounded-lg mb-3 md:mb-0"
                            onClick={() => {handleClickNuevoPago('crear')}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                            </svg>
                            &nbsp;
                            Registrar nuevo pago
                        </button>
                    </div>
                    <p>Si deseas eliminar un pago, haz click en él</p>
                    <DataTable
                        columns={columns}
                        data={pagosFilter}
                        noDataComponent="No hay registros para mostrar"
                        pagination
                        customStyles={estilosTabla}
                        onRowClicked={handleClickEliminarPago}
                        paginationComponentOptions={paginationComponentOptions}
                        // expandableRows
                        // expandableRowExpanded={row => row.defaultExpanded}
                        // expandableRowsComponent={ExpandedComponent}
                        // expandOnRowClicked
                    />
                </>

            }
            {
                formPago &&
                <FormPago
                    modo={modoFormPago}
                />
                
            }


        </>
    )
}
