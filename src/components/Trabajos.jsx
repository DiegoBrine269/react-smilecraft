import DataTable from "react-data-table-component"
import useSmilecraft from "../hooks/useSmilecraft";
import { estilosTabla, formatearDinero, paginationComponentOptions } from "../helpers/helper";
import Modal from "react-modal"
import FormTrabajo from "./FormTrabajo";



Modal.setAppElement('#root')
  

export default function Trabajos() {
    const {trabajosFilter, handleFilterTrabajos, handleClickNuevoTrabajo, formTrabajo, 
           isLoading, modoFormTrabajo, setTrabajo, handleClickEliminarTrabajo } = useSmilecraft()
    

    
    
    const ExpandedComponent = ({ data }) => {

        return (   
            <>
                <div className="px-3 pt-3 grid grid-cols-2 gap-3 w-[100vw] text-sm" >
                    <div className="">
                        <h3 className="font-bold mb-1">Información del trabajo</h3>
                        <p>
                            <span className="font-medium">Doctor: </span>
                            {data.doctor}
                        </p>
                        <p>
                            <span className="font-medium">Paciente: </span>
                            {data.paciente}
                        </p>
                        <p>
                            <span className="font-medium">Trabajo: </span>
                            {data.trabajo}
                        </p>
                        <p>
                            <span className="font-medium">Tono: </span>
                            {data.tono}
                        </p>

                        {
                            data.ganchos_bola &&
                            <p>
                                <span className="font-medium">Ganchos de bola: </span>
                                {data.ganchos_bola}
                            </p>
                        }

                        {
                            data.ganchos_wipla &&
                            <p>
                                <span className="font-medium">Ganchos wipla: </span>
                                {data.ganchos_wipla}
                            </p>
                        }

                        {
                            data.ganchos_vaciado &&
                            <p>
                                <span className="font-medium">Ganchos vaciado: </span>
                                {data.ganchos_vaciado}
                            </p>
                        }
                        <p>
                            <span className="font-medium">Urgente: </span>
                            {data.urgente}
                        </p>
                        <p>
                            <span className="font-medium">Recepción: </span>
                            {data.fecha_recepcion}
                        </p>
                        <p>
                            <span className="font-medium">Entrega: </span>
                            {data.fecha_entrega ?? 'Pendiente'}
                        </p>
                        <p>
                            <span className="font-medium">A cuenta: </span>
                            {formatearDinero(data.a_cuenta)}
                        </p>
                        <p>
                            <span className="font-medium">Total: </span>
                            {formatearDinero(data.total)}
                        </p>


                    </div>
            
                    <div>
                        <h3 className="font-bold mb-1">Historial de pagos</h3>
                            {data.pagos.map((pago, i) => {
                                return (<div className="bg-neutral-100 rounded-md w-min p-2 mb-2" key={i}>
                                    <p className="flex">
                                        <span className="font-medium">Fecha: </span> &nbsp;
                                        {pago[0]}
                                    </p>
                                    <p>
                                        <span className="font-medium">Monto: </span>
                                        {formatearDinero(pago[1])}
                                    </p>
                                </div>)
                            })}
                       
                    </div>
                </div>
                <div className="mt-3 md:mt-0 px-3 grid grid-cols-2 gap-3 w-[95vw] text-sm">
                    <button 
                        className="flex items-center bg-verde text-black px-3 py-2 rounded-lg my-3 md:mb-0"
                        onClick={() => {
                            setTrabajo(data)
                            handleClickNuevoTrabajo('editar')
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        &nbsp;
                        Editar trabajo
                    </button>

                    <button 
                        className="flex items-center bg-red-800 text-white px-3 py-2 rounded-lg my-3 md:mb-0"
                        onClick={() => {
                            // setTrabajo(data)
                            handleClickEliminarTrabajo(data)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                        &nbsp;
                        Eliminar trabajo
                    </button>
                </div>
        
            </>
        )
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
            name: 'ID_Doctor',
            selector: row => row.id_doctor,
            omit: true
        },

        {
            name: 'ID_Descripcion',
            selector: row => row.id_descripcion,
            omit: true
        },

        {
            name: 'Doctor',
            selector: row => row.doctor,
            sortable:true,
            width: "15%" ,                      // added line here

        },
        {
            name: 'Paciente',
            selector: row => row.paciente,
            sortable:true,
            width: "15%" ,  
        },
        {
            name: 'Trabajo',
            selector: row => row.trabajo,
            sortable:true,
            width: "25%" ,  
        },
        {
            name: 'Tono',
            selector: row => row.tono,
            sortable:true
        },
        {
            name: 'Urgente',
            selector: row => row.urgente,
            sortable:true,
            width: "10%" ,
        },
        {
            name: 'Recepción',
            selector: row => row.fecha_recepcion,
            sortable:true,
            width: "12%" ,
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
        {
            name: 'Pagos',
            selector: row => row.pagos,
            omit:true
        },
    ]

    if (isLoading) {
        return 'Cargando...'
    }
    
    return (
        
        <>
            { formTrabajo ||
                <>  
                    <h2 className="mt-2 text-lg">Trabajos</h2>  
                    <div className="my-2 flex flex-col md:flex-row md:justify-between">
                        <input 
                            type="text" 
                            onChange={handleFilterTrabajos}
                            id="doctor"
                            placeholder="Filtrar por doctor"
                            className="bg-gray-200 px-3 py-2 rounded-lg mb-3 md:mb-0 md:w-[25%]"
                        />
                        <input 
                            type="text" 
                            onChange={handleFilterTrabajos}
                            id="paciente"
                            placeholder="Filtrar por paciente"
                            className="bg-gray-200 px-2 py-2 rounded-lg mb-3 md:mb-0 md:w-[25%]"
                        />

                        
                        <button 
                            className="flex bg-indigo-500 text-white px-3 py-2 rounded-lg mb-3 md:mb-0"
                            onClick={() => {handleClickNuevoTrabajo('crear')}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            &nbsp;
                            Registrar nuevo trabajo
                        </button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={trabajosFilter}
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
                formTrabajo &&
                <FormTrabajo
                    modo={modoFormTrabajo}
                />
                
            }
        </>
    )
}
