import useSmilecraft from "../hooks/useSmilecraft";
import Trabajos from "../components/Trabajos";
import Estadisticas from "../components/Estadisticas";
import Doctores from "../components/Doctores";
import Descripciones from "../components/Descripciones";
import Pagos from "../components/Pagos";


export default function Inicio() {

    const {opcion} = useSmilecraft()

    return  opcion === 1 ? 
            <Trabajos/> :
            opcion === 2 ?
            <Pagos/> :
            opcion === 3 ?
            <Descripciones/> :
            opcion === 4 ?
            <Doctores/> :
            opcion === 5 ?
            <Estadisticas/> 
            : null;
}
