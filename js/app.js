//Variables

const elementoCarrito = document.getElementById("carrito");
const contenederCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.getElementById("lista-cursos");
const vaciarCarritoBTN = document.querySelector("#carrito #vaciar-carrito");

//Creando el array de productos en el carrito
let articulosCarrito = [];

//Cargando todos los eventos
cargarEventListeners();

function cargarEventListeners(){

    //Agrega cursos al carrito
    listaCursos.addEventListener('click', agregandoCursos);

    //Elimina cursos del carrito
    elementoCarrito.addEventListener("click", eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBTN.addEventListener("click", () => {
        articulosCarrito = [] // volvemos a inicializar el arreglo en 0

        limpiarHTML(); //ELiminamos todo el HTML del carrito
    });

}

//Elimina los cursos del carrito
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id"); // Obteniendo el valor del id

        //Elimina el articulo del arreglo por el data id;
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId); // Array con los elementos que cumplen la condicion

        //Ocupamos volver a llamar la funcion para imprimir el arreglo con los nuevos elementos en el HTML
        carritoHTML();

    }

    
}

//Agregando los cursos al carrito
function agregandoCursos(e){
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){
        
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCursos(cursoSeleccionado);
    }
}

//Leer el contenido del HTML y extrae la informacion del curso
function leerDatosCursos(curso){
    
    //Crear Objeto con el contenido del curso actual
    const cursoActual = {

        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        autor: curso.querySelector("p").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),//get Attibrute obtiene el valor de un atributo
        cantidad: 1

    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === cursoActual.id)

    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === cursoActual.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    }else{
        //Agregar elementos al array de carritos haciendo una copia de este con spread operator
        articulosCarrito = [...articulosCarrito, cursoActual];
    }

    
    
    //Mostrando el carrito llamando la funcion
    carritoHTML();

}


//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiando el HTMl
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        //Usando destructuring para extraer los valores del objeto
        const {imagen, titulo, precio, cantidad, id} = curso;

        //Creando un elemento row para el carrito
        const row = document.createElement("tr");
        
        row.innerHTML = `
        <td> <img src= "${imagen}" width = "150px"> </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> <a href = "#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `;

        contenederCarrito.appendChild(row);
    })
}

//Limpiando el carrito del HTML antes de mostrar los demas articulos
function limpiarHTML(){
    while(contenederCarrito.firstChild){
        contenederCarrito.removeChild(contenederCarrito.firstChild);
    }
}