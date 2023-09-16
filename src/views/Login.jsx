
import { createRef, useState } from 'react'
import Alerta from '../components/Alerta'
import { useAuth } from '../hooks/useAuth';

export default function Login() {

    const passwordRef = createRef();
	const emailRef = createRef();

	const [errores, setErrores] = useState([])
    const { login } = useAuth({
        middleware: 'guest',
        url: '/'
    })

    const handleSubmit = async e => {
		e.preventDefault()

		const datos = {
			email: emailRef.current.value,
			password: passwordRef.current.value
    }

        login(datos, setErrores)
	}

    return (
        <form  
            className="font-poppins mt-3"
            onSubmit={handleSubmit}
        >
            {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

            <div className="w-full mb-4">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                    Correo electrónico
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="email" type="email" placeholder="Correo electrónico" name="email" ref={emailRef}/>
            </div>

            <div className="w-full mb-4">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="password" type="password" placeholder="Correo electrónico" name="password" ref={passwordRef}/>
            </div>

            <input 
                type="submit" 
                value="Guardar" 
                className="w-full flex justify-center bg-purpura text-white px-3 py-2 rounded-lg mb-3 md:mb-0"
            />
        </form>
    )
}
