const estilosTabla = {
    rows: {
        style: {
            minHeight: '3rem', 
        },
    },
    headCells: {
        style: {
            fontWeight: 'bold',
            fontSize: '1rem',
            display: 'flex',
            justifyContent: 'center',
        },
    },
    cells: {
        style: {
            textAlign: 'center',
            fontSize: '1rem',
            display: 'flex',
            justifyContent: 'center',
            // overflowWrap: 'visible',
            // whiteSpace: 'unset'

        },
    },
};

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "100vh"
    },
};

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

const formatearDinero = (cantidad) => {
    return Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',minimumFractionDigits:0,maximumFractionDigits:0}).format(cantidad)
}

export {
    estilosTabla,
    formatearDinero,
    customStyles,
    paginationComponentOptions
}
