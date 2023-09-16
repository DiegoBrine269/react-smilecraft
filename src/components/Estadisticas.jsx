import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { formatearDinero } from "../helpers/helper";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Estadisticas() {


    const [isLoading, setLoading] = useState(true)
    const [estadisticas, setEstadisticas] = useState()
    const [doctoresLabel, setDoctoresLabel] = useState()
    const [porcentajes, setPorcentajes] = useState()

    const token = localStorage.getItem('AUTH_TOKEN')

    useEffect(() => {
        
        setLoading(true)
        
        clienteAxios.get('/api/estadisticas',             {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {


            const{data} = response

            setEstadisticas(data)
            setLoading(false);

            const { porcentajes } = data
            
            let doctores = []
            let porcentajesDoc = []

            porcentajes.forEach(p => {
                if(p.porcentaje != 0) {
                    doctores.push(p.doctor)
                    porcentajesDoc.push(p.porcentaje)
                }
                
            })

            setDoctoresLabel(doctores)
            setPorcentajes(porcentajesDoc)

        });
        
        

    }, [])

    const data = {
        labels: doctoresLabel,
        datasets: [
          {
            label: 'Porcentaje',
            data: porcentajes,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };


    if (isLoading) return <p>Calculando estadísticas...</p>
    
    return (
        <>
            <h2 className="mt-2 text-lg">Estadísticas</h2>  

            <div className="mt-3">                
                <p><span className="font-semibold">Ingresos totales: </span> {formatearDinero(estadisticas.ventasTotales)}</p>
                <p><span className="font-semibold">Ingresos del mes en curso: </span> {formatearDinero(estadisticas.ventasMesActual)}</p>
                <p><span className="font-semibold">Ingresos del año en curso: </span> {formatearDinero(estadisticas.ventasAnioActual)}</p>
            </div>


            <h3 className="mt-3 text-lg">Estadísticas generales:</h3>

            <Pie data={data} />

        </>
    )
}
