const data = [
    {"id": 1, "nombre": "Marcelo", "apellido": "Luque", "edad": 45, "ventas": 15000, "sueldo": 2000},
    {"id": 2, "nombre": "Ramiro", "apellido": "Escobar", "edad": 35, "ventas": 6000, "sueldo": 1000},
    {"id": 3, "nombre": "Facundo", "apellido": "Cairo", "edad": 30, "ventas": 500, "sueldo": 15000},
    {"id": 4, "nombre": "Fernando", "apellido": "Nieto", "edad": 18, "compras": 8000, "telefono": "152111131"},
    {"id": 5, "nombre": "Manuel", "apellido": "Loza", "edad": 20, "compras": 50000, "telefono": "42040077"},
    {"id": 666, "nombre": "Nicolas", "apellido": "Serrano", "edad": 23, "compras": 7000, "telefono": "1813181563"}
];

// Función para filtrar columnas según los checkboxes
function filtrarColumnas() {
    // Obtenemos los estados de los checkboxes
    const mostrarId = document.querySelector('#checkbox-id').checked;
    const mostrarNombre = document.querySelector('#checkbox-nombre').checked;
    const mostrarApellido = document.querySelector('#checkbox-apellido').checked;
    const mostrarEdad = document.querySelector('#checkbox-edad').checked;
    const mostrarSueldo = document.querySelector('#checkbox-sueldo').checked;
    const mostrarVentas = document.querySelector('#checkbox-ventas').checked;
    const mostrarCompras = document.querySelector('#checkbox-compras').checked;
    const mostrarTelefono = document.querySelector('#checkbox-telefono').checked;

    // Obtener todas las celdas del encabezado (th) y las filas (td)
    const ths = document.querySelectorAll('th');
    const tds = document.querySelectorAll('td');

    // Mostrar u ocultar según el checkbox
    ths.forEach(th => {
        switch (th.getAttribute('data-column')) {
            case 'id':
                th.style.display = mostrarId ? '' : 'none';
                break;
            case 'nombre':
                th.style.display = mostrarNombre ? '' : 'none';
                break;
            case 'apellido':
                th.style.display = mostrarApellido ? '' : 'none';
                break;
            case 'edad':
                th.style.display = mostrarEdad ? '' : 'none';
                break;
            case 'sueldo':
                th.style.display = mostrarSueldo ? '' : 'none';
                break;
            case 'ventas':
                th.style.display = mostrarVentas ? '' : 'none';
                break;
            case 'compras':
                th.style.display = mostrarCompras ? '' : 'none';
                break;
            case 'telefono':
                th.style.display = mostrarTelefono ? '' : 'none';
                break;
        }
    });

    // Lo mismo para las celdas de las filas (td)
    tds.forEach(td => {
        switch (td.getAttribute('data-column')) {
            case 'id':
                td.style.display = mostrarId ? '' : 'none';
                break;
            case 'nombre':
                td.style.display = mostrarNombre ? '' : 'none';
                break;
            case 'apellido':
                td.style.display = mostrarApellido ? '' : 'none';
                break;
            case 'edad':
                td.style.display = mostrarEdad ? '' : 'none';
                break;
            case 'sueldo':
                td.style.display = mostrarSueldo ? '' : 'none';
                break;
            case 'ventas':
                td.style.display = mostrarVentas ? '' : 'none';
                break;
            case 'compras':
                td.style.display = mostrarCompras ? '' : 'none';
                break;
            case 'telefono':
                td.style.display = mostrarTelefono ? '' : 'none';
                break;
        }
    });
}

// Función para cargar la tabla con los datos
function loadTableData() {
    const tableBody = document.getElementById("data-table-body");
    tableBody.innerHTML = ""; // Limpiar la tabla antes de llenarla
    
    data.forEach(item => {
        let ventas = item.ventas !== undefined ? item.ventas : "--";
        let compras = item.compras !== undefined ? item.compras : "--";
        let sueldo = item.sueldo !== undefined ? item.sueldo : "--";
        let telefono = item.telefono !== undefined ? item.telefono : "--";

        // Crear una fila
        const row = document.createElement("tr");
        row.innerHTML = `
            <td data-column="id">${item.id}</td>
            <td data-column="nombre">${item.nombre}</td>
            <td data-column="apellido">${item.apellido}</td>
            <td data-column="edad">${item.edad}</td>
            <td data-column="sueldo">${sueldo}</td>
            <td data-column="ventas">${ventas}</td>
            <td data-column="compras">${compras}</td>
            <td data-column="telefono">${telefono}</td>
        `;
        tableBody.appendChild(row);
    });

    filtrarColumnas(); // Aseguramos que las columnas se filtren al cargar los datos
}