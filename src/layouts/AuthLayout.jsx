import { Outlet } from "react-router-dom"

export default function AuthLayout() {
    return (
        <div className="font-poppins">
            <div className="w-[95%] mx-auto mt-3 mb-24">
                <h1 className="text-2xl font-semibold">Inicio de sesión</h1>
                <Outlet />
            </div>


            


        </div>
    )
}
