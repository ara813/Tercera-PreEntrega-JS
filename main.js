class Agregados {
    constructor(nombre, precio, id){
        this.nombre=nombre;
        this.precio=precio;
        this.id =id;
    }
}
const marco = new Agregados ("Marco", 4000, 1)
const vidrio = new Agregados ("Vidrio", 3000, 2)
const cancion = new Agregados ("Cancion", 2000, 3)
const texto = new Agregados("Texto", 1000, 4)
const envio = new Agregados ("Envio", 3000, 5)
const arrayAgregados = [ marco, vidrio, cancion, texto, envio]

localStorage.setItem ("arrayAgregados", JSON.stringify(arrayAgregados));
let arrayAgregadosLS = JSON.parse(localStorage.getItem("arrayAgregados"));
console.log (arrayAgregadosLS);

let carrito = JSON.parse(localStorage.getItem("carrito"))||[];

let BD = [];

const button = document.getElementById("formulario");
 
const form = document.getElementById(`${Agregados.id}`);

let x = [];

let Eliminados =[];

let main = document.querySelector('.main-box');

let cart = document.querySelector('.carrito');

let modalContainer = document.querySelector('.modal-container');

let resultado = document.querySelector('.resultado');

localStorage.setItem ('BD', JSON.stringify(carrito))

localStorage.setItem ('Eliminados', JSON.stringify(x))


main.style.display = "flex";
mostrarCarrito();
function crearCards() {
    arrayAgregados.forEach((Agregados) => {
      main.innerHTML += `     
                              <div class="card">
                                <div>
                                    <h2> ${Agregados.nombre} </h2>
                                </div>
                                <span>$${Agregados.precio}</span>
                                <button id="${Agregados.id}">Agregar</button>
                            </div>`;                       
    });
    darFuncionalidadBtns();
  }
  function darFuncionalidadBtns() {
    arrayAgregados.forEach((Agregados) => {
        document.getElementById(`${Agregados.id}`).addEventListener('click', (e) => {
        e.preventDefault();
        agregarAlCarrito(Agregados);
      });
    });
  }
  
  function agregarAlCarrito(Agregados) {
    let existe = carrito.some((element) => element.id == Agregados.id);
  
    if (existe === false) {
      Agregados.cantidad = 1;
      carrito.push(Agregados);
    } else {
      let miProd = carrito.find((element) => element.id == Agregados.id);
      miProd.cantidad++;
    }
    let x = JSON.parse (localStorage.getItem("BD"))
    x.push (Agregados);
    localStorage.setItem('BD', JSON.stringify(x));
    console.log(x);
    mostrarCarrito();
  }
  
  function mostrarCarrito() {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    carrito.forEach((Agregados) => {
    let carritoContent = document.createElement("div");
    carritoContent.innerHTML = `
        <h3>${Agregados.nombre}</h3>
        <p> $ ${Agregados.precio}</p>
        <p> Cantidad: ${Agregados.cantidad}</p>
        <span class="delete-product"> ❌ </span>
      `;

    modalContainer.append(carritoContent);

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(Agregados.id);
    });
  })};
    const eliminarProducto = (id)=> {
    const foundID = carrito.find ((element)=> element.id=== id) 
    carrito = carrito.filter ((carritoID)=>{
    return carritoID !== foundID;})
    let Eliminados = JSON.parse (localStorage.getItem("Eliminados"))
    Eliminados.push (foundID);
    localStorage.setItem('Eliminados', JSON.stringify(Eliminados));
    console.log(Eliminados);
    mostrarCarrito()
  }

  crearCards();

function sumar () {
  const btn = document.getElementById ("btn");
btn.addEventListener ("click", (e)=>{
    e.preventDefault();
    const total = carrito.reduce ((acc, el)=> acc + el.precio*el.cantidad, 1000)

resultado.innerHTML = `<p>El total a pagar es de $${total}</p>
                      <p>Gracias por tu compra que la disfutes :)</p>`;
})
}
 sumar();



