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

main.innerHTML = `<div class="texto">
<p>A continuacion encontraras todo lo que podes agregarle a tu fotografia:</p>
<p>El precio inicial de la lamina es de $1000</p>
<p>Los productos que selecciones apareceran debajo del bonton TOTAL</p>
</div>`
main.style.display = "flex";
modalContainer.innerHTML =`<p class="color">Productos seleccionados:</p>`
mostrarCarrito();
function crearCards() {
    arrayAgregados.forEach((Agregados) => {
      main.innerHTML += `     <button id="${Agregados.id}" class="botones">
                              <div class="card">
                               <div>
                                    <h2> ${Agregados.nombre} </h2>
                                </div>
                                <span>$${Agregados.precio}</span>
                            </div> </button>`;                       
    });
    darFuncionalidadBtns();
  }
  function darFuncionalidadBtns() {
    arrayAgregados.forEach((Agregados) => {
        document.getElementById(`${Agregados.id}`).addEventListener('click', (e) => {
        e.preventDefault();
        agregarAlCarrito(Agregados);
        if (Agregados.id === 3){
          song();
         } 
        else if (Agregados.id === 4){
          textoExtra();
        } 
        else if (Agregados.id === 5){
          direction();
        }
      });
    });
  }
  function song() {
    Swal.fire({
      title: 'Ingresá la cancion que deseas incrustar en la fotografia como aparece en Spotify seguido del nombre del interprete:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result);
        localStorage.setItem("cancionIncrustada", result.value);
        Swal.fire({
          title: `Has agregado la cancion ${result.value}`,
        })
      }
    })
  }
  function textoExtra() {
    Swal.fire({
      title: 'Ingresá el texto que desea agregar en la fotografia y la zona donde le gustaria que se encuentre escrita:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result);
        localStorage.setItem("textoExtra", result.value);
        Swal.fire({
          title: `Has agregado el siguiente texto adicional: ${result.value}`,
        })
      }
    })
  }
  function direction() {
    Swal.fire({
      title: 'Ingresá la direccion a la que quieres que llegue la fotografia y el codigo postal:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result);
        localStorage.setItem("envioADomicilio", result.value);
        Swal.fire({
          title: `Has agregado la siguiente direccion: ${result.value}`,
        })
      }
    })
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
    carritoContent.innerHTML += `
      <div class="card">
        <h3>${Agregados.nombre}</h3>
        <p> $ ${Agregados.precio}</p>
        <p> Cantidad: ${Agregados.cantidad}</p>
        <span class="delete-product"> ❌ </span>
        </div>
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
                       <p>Si desea eliminar uno de los seleccionados solo haga click en la ❌ y luego vuelva tocar el boton de "TOTAL" para conocer el monto final a abonar</p>
                      <p>Gracias por tu compra que la disfutes :)</p>`;
})
}
 sumar();



