import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { SmilecraftProvider } from './context/SmilecraftProvider'
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SmilecraftProvider>
            <RouterProvider router={router}/>
        </SmilecraftProvider>
    </React.StrictMode>,
)
