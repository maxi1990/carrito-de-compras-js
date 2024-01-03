const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const notificacionCarrito = document.getElementById('notificacion-carrito')
let articulosCarrito = []


añadirNotificacion(articulosCarrito.length) 
cargarEventListener()
function cargarEventListener() {
    // cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso)


    // ELIMINA CURSOS DEL CARRITO

    carrito.addEventListener('click', eliminarCurso);

    // vaciar el carrito

    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = []; // RESETEAMOS EL ARREGLO

        limpiarHTML() // ELIMINAMOS TODO EL HTML

        añadirNotificacion(articulosCarrito.length) 

    })
}


// funciones
function agregarCurso(e) {
    e.preventDefault()

     if (e.target.classList.contains('agregar-carrito')) {
      const cursoSeleccionado =  e.target.parentElement.parentElement
         leerDatosCurso(cursoSeleccionado)
        
     }  

     añadirNotificacion(articulosCarrito.length)
}
function añadirNotificacion(cantidad) {
    if (cantidad !== 0) {
        notificacionCarrito.dataset.cantidadnotificacion = articulosCarrito.length
        notificacionCarrito.classList.add('notificacion-carrito--visible')
    } else if (cantidad === 0) {
        notificacionCarrito.classList.remove('notificacion-carrito--visible')
    }
}


// ELIMINA UN CURSO DEL CARRITO
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML() // iterar sobre el carrito y mostrar su html
    }
    añadirNotificacion(articulosCarrito.length)
}

// lee el contenido del html al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {
    // crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').innerHTML,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        // actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso; // retorna el objeto actualizado
            }else{
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos]
    } else {
        // agrega elementos al arreglo de  carrito
    articulosCarrito = [...articulosCarrito, infoCurso];

    }

    // AGREGA ELEMENTOS AL CARRITO

    console.log(articulosCarrito);
    carritoHTML()
}

// muestra el carrito de compras en el html

function carritoHTML() {

    // limpiar el html
limpiarHTML()

    // recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
       <img src="${imagen}" width = "100">        
        </td>
        
        <td>
        ${titulo}        
        </td>

        <td>
        ${precio}        
        </td>

        <td>
        ${cantidad}        
        </td>

        <td>
        <a href= "#" class= "borrar-curso" data-id="${id}">X</a>       
        </td>
        
        `;
        // agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    });
}


// ELIMINA LOS CURSOS DEL TBODY

function limpiarHTML() {
    // FORMA LENTA
 //   contenedorCarrito.innerHTML = "";

 while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
 }
}