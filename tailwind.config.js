/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                'poppins': ["'Poppins', sans-serif"],
            },
            colors: {
                'purpura': '#8383F3',
                'gris' : '#3E8C80',
                'verde' : '#80CBC4'
            },
        },
    },
    plugins: [],
}