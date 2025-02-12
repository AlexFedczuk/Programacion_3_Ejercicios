import { Aereo } from "./Clases/Aereo.js";
import { Terrestre } from "./Clases/Terrestre.js";

console.log("El archivo funciones.js se ha cargado correctamente.");

/**
 * Función para generar un array de objetos de las clases Vehiculo, Aereo y Terrestre desde una cadena JSON.
 * @param {string} jsonString - La cadena JSON con los datos de los vehículos.
 * @returns {Array} - Un array con las instancias creadas (Aereo o Terrestre).
 */
export function generarVehiculosDesdeJSON(jsonString) {
  const vehiculosArray = JSON.parse(jsonString); // Parsear JSON
  const vehiculos = []; // Array para almacenar las instancias

  vehiculosArray.forEach((vehiculoData) => {
    if (vehiculoData.cantPue !== undefined && vehiculoData.cantRue !== undefined) {
      // Es un vehículo Terrestre
      const terrestre = new Terrestre(
        vehiculoData.id,
        vehiculoData.modelo,
        vehiculoData.anoFab,
        vehiculoData.velMax,
        vehiculoData.cantPue,
        vehiculoData.cantRue
      );
      vehiculos.push(terrestre);
    } else if (vehiculoData.altMax !== undefined && vehiculoData.autonomia !== undefined) {
      // Es un vehículo Aereo
      const aereo = new Aereo(
        vehiculoData.id,
        vehiculoData.modelo,
        vehiculoData.anoFab,
        vehiculoData.velMax,
        vehiculoData.altMax,
        vehiculoData.autonomia
      );
      vehiculos.push(aereo);
    }
  });

  return vehiculos; // Devuelve el array de vehículos creados
}

/**
 * Muestra los vehículos en la tabla de "Form Datos".
 * @param {Array} vehiculos - Array de objetos (instancias de Terrestre o Aereo).
 */
export function mostrarVehiculosEnTabla(vehiculos) {
  const tbody = document.querySelector("tbody"); // Seleccionamos el cuerpo de la tabla

  // Limpiamos cualquier fila existente en la tabla antes de agregar nuevos datos
  tbody.innerHTML = "";

  // Iteramos sobre los vehículos y creamos filas en la tabla
  vehiculos.forEach((vehiculo) => {
    const fila = document.createElement("tr");

    // Crear celdas con la información del vehículo
    fila.innerHTML = `
        <td>${vehiculo.id}</td>
        <td>${vehiculo.modelo}</td>
        <td>${vehiculo.anoFab}</td>
        <td>${vehiculo.velMax}</td>
        <td>${vehiculo.altMax || "--"}</td>
        <td>${vehiculo.autonomia || "--"}</td>
        <td>${vehiculo.cantPue || "--"}</td>
        <td>${vehiculo.cantRue || "--"}</td>
      `;

    // Agregamos la fila al cuerpo de la tabla
    tbody.appendChild(fila);
  });
}

/**
 * Filtra los vehículos y los muestra en la tabla según el tipo seleccionado.
 * @param {Array} vehiculos - Array de vehículos.
 * @param {string} filtro - Valor del filtro ('todos', 'terrestre', 'aereo').
 */
export function filtrarVehiculos(vehiculos, filtro) {
  let vehiculosFiltrados = [];

  if (filtro === 'terrestre') {
    vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo instanceof Terrestre);
  } else if (filtro === 'aereo') {
    vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo instanceof Aereo);
  } else {
    vehiculosFiltrados = vehiculos; // Mostrar todos si el filtro es 'todos'
  }

  mostrarVehiculosEnTabla(vehiculosFiltrados); // Mostramos los vehículos filtrados
}

/**
 * Calcula el promedio de la velocidad máxima de los vehículos.
 * @param {Array} vehiculos - Array de objetos (instancias de Terrestre o Aereo).
 * @returns {number} - El promedio de la velocidad máxima.
 */
export function calcularPromedioVelocidadMax(vehiculos) {
  if (vehiculos.length === 0) return 0;

  // Usamos map para extraer las velocidades máximas y reduce para calcular la suma
  const sumaVelMax = vehiculos
    .map(vehiculo => vehiculo.velMax)  // Extraemos la velocidad máxima
    .reduce((suma, velMax) => suma + velMax, 0);  // Sumamos todas las velocidades

  // Calculamos el promedio
  return sumaVelMax / vehiculos.length;
}

/**
 * Muestra el formulario ABM con los datos del vehículo o vacío.
 * @param {Object|null} vehiculo - El objeto vehículo a editar, o null si se va a agregar uno nuevo.
 */
export function mostrarFormularioABM(vehiculo) {
  console.log("mostrarFormularioABM llamada con vehiculo:", vehiculo); // Para verificar que se llama
  // Ocultamos el "Form Datos"
  document.querySelector('.form-filtros').style.display = 'none';

  // Mostramos el "Formulario ABM"
  const formABM = document.getElementById('form-abm');
  formABM.style.display = 'block';

  if (vehiculo) {
    // Si estamos editando, llenamos los campos con los datos del vehículo
    document.getElementById('id').value = vehiculo.id;
    document.getElementById('modelo').value = vehiculo.modelo;
    document.getElementById('anoFab').value = vehiculo.anoFab;
    document.getElementById('velMax').value = vehiculo.velMax;
    document.getElementById('tipo').value = vehiculo instanceof Aereo ? 'aereo' : 'terrestre';
    document.getElementById('altMax').value = vehiculo.altMax || '';
    document.getElementById('autonomia').value = vehiculo.autonomia || '';
    document.getElementById('cantPue').value = vehiculo.cantPue || '';
    document.getElementById('cantRue').value = vehiculo.cantRue || '';

    // Mostramos el botón "Modificar" y ocultamos "Agregar"
    document.getElementById('btn-alta').style.display = 'none';
    document.getElementById('btn-modificar').style.display = 'inline-block';
  } else {
    // Si es un nuevo registro, vaciamos los campos
    document.getElementById('id').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('anoFab').value = '';
    document.getElementById('velMax').value = '';
    document.getElementById('tipo').value = 'aereo'; // Valor por defecto
    document.getElementById('altMax').value = '';
    document.getElementById('autonomia').value = '';
    document.getElementById('cantPue').value = '';
    document.getElementById('cantRue').value = '';

    // Mostramos el botón "Agregar" y ocultamos "Modificar"
    document.getElementById('btn-alta').style.display = 'inline-block';
    document.getElementById('btn-modificar').style.display = 'none';
  }
}