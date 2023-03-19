//constructor
class Productos{
    constructor(id, nombre, precio, cantidad, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.img= img;
    }
}

//productos
const producto0 = new Productos (0, "Apple watch", 1000, 1, "producto0.jpg")
const producto1 = new Productos (1, "Air pods", 200,1, "producto1.jpg")
const producto2 = new Productos (2, "iphone 14", 1200, 1, "producto2.jpg")
const producto3 = new Productos (3, "macbook", 900,1 , "producto3.jpg")
const producto4 = new Productos (4, "imac", 2000, 1, "producto4.jpg")

//array de productos
const arrayProductos = [producto1, producto2, producto3]
arrayProductos.unshift(producto0);
arrayProductos.push(producto4);



//array vacio para el carrito
//le digo que haga el get en el local storage;

let carrito = JSON.parse(localStorage.getItem("guardarCarrito")) || [];
contadorCarrito()
//foreach para crear cada card con su producto
function mostrarProductos(){


    const containerProduct=document.getElementById("containerProduct");
    containerProduct.className= "container-product";
    containerProduct.innerHTML="";
    arrayProductos.forEach(muestra =>{
        const cardProduct = document.createElement("div")
        cardProduct.className = "cardProduct";
        cardProduct.innerHTML = `<div class="containerImgProduct"><img class = "imggg"src="./img/${muestra.img}"></div>
                                <h2 class="tittleCard">${muestra.nombre}</h2
                                <div class="contentCard">
                                    <p class= "textCard">$ ${muestra.precio}</p>
                                </div>`
        
        containerProduct.append(cardProduct);
        //creacion del boton agregar y su evento
        const botonAgregar = document.createElement("button");
        botonAgregar.innerText = "Agregar";
        botonAgregar.className ="botonAgregar";
        cardProduct.append(botonAgregar);

        botonAgregar.addEventListener("click", () => {   
            //carga productos a un carrito por el usuario


            //verifico si el producto existe o no en el carrito

            const existe = carrito.find(e => e.id === muestra.id)

            if(existe != undefined){
                carrito.map(e => {
                    if(e.id === muestra.id)
                        e.cantidad++
                })
            }else{
                carrito.push({
                id: muestra.id,
                nombre: muestra.nombre,
                precio: muestra.precio,
                cantidad: muestra.cantidad,
                    
                }) 
            }
            //funcion con eventos para aparecer el modal del contador de productos

            contadorCarrito();
            guardarProducto();


        })

    })

}
mostrarProductos()

//construccion de toda la funcion que va a ejecutar el boton del carrito
const carritoHeader = document.getElementById("carritoHeader");
const modal = () => {
    const ventanaCarrito = document.getElementById("ventanaCarrito");
    ventanaCarrito.className="ventanaCarrito";
    ventanaCarrito.style.display=""; // con esto hago que el carrito sea visible nuevamente luego de que en la linea 95 le diera display none
    ventanaCarrito.innerHTML= " "; // evito que el modal del carrito se multiplique
    //empiezo a cargar todo el contenido al modal
    //header
    const headerModal = document.createElement("div")
    headerModal.className = "headerModal";
    headerModal.innerHTML = `<h3 class="tittleModal">Carrito</h3>
                            <button class="x" id="cierraVentana">X</button>`
    ventanaCarrito.append(headerModal);
    //productos
    carrito.forEach(muestra => {

        const contentModal = document.createElement("div")
        contentModal.className = "containerContentModal";
        contentModal.innerHTML = `  <p class="textModal"> ${muestra.nombre.toUpperCase()} </p>
                                    <p class="textModal">$${muestra.precio} </p>
                                    <p class="textModal">Cantidad: ${muestra.cantidad}</p>
                                    <p class="textModal">Total: $${muestra.cantidad * muestra.precio}`

        ventanaCarrito.append(contentModal);

        //creo el boton para eliminar productos de manera individual

        const botonEliminar = document.createElement("button");
        botonEliminar.innerText="X";
        botonEliminar.className="textModal botonEliminar";
        
        contentModal.append(botonEliminar);

        //evento boton de eliminar, le paso una funcion que construyo luego del llamado al evento carritoHeader
        botonEliminar.addEventListener("click", () =>{
        eliminarProducto(muestra.id);
        })

    })
    //cierro ventana
    const cierraVentana = document.getElementById("cierraVentana");
    cierraVentana.addEventListener("click", () =>{
        ventanaCarrito.style.display="none";
    })

    //armo el algoritmo para dar el total del carrito

    let total = carrito.reduce((acc, e) => acc + e.precio * e.cantidad ,0);

    //armo el footer de la ventana modal

    const footerModal = document.createElement("div")
    footerModal.className = "footerModal";
    footerModal.innerHTML=`<p class="totalCarrito">total: $ ${total}</p>
                            <button id="vaciarCarrito" class="vaciarCarrito">Vaciar carrito</button>`
    ventanaCarrito.append(footerModal);

    const vaciarCarrito = document.getElementById("vaciarCarrito");
    vaciarCarrito.addEventListener("click", () => {
        carrito.splice(0, carrito.length);
        ventanaCarrito.style.display="none";
        contadorCarrito();
        //llamo a la funcion guardarProducto para que me actualice el listado y que no se vuelva a llenar luego de eliminar todo
        guardarProducto();

    })
    
}    

//evento pora mostrar la ventana del carrito

carritoHeader.addEventListener("click", modal);

//eliminar producto
function eliminarProducto (idEncontrado){
    const buscarId = carrito.find(e => e.id === idEncontrado )
    carrito = carrito.filter(e => e !== buscarId);
    contadorCarrito();
    //llamo a la funcion guardarProducto para que me actualice el listado antes de cargar todo el modal devuelta
    guardarProducto();
    modal();
}


//contador pequeño
function contadorCarrito(){
    const containerModalContador = document.getElementById("containerModalContador")
    containerModalContador.innerText="";
    const contador = document.createElement("p")
    contador.className="containerModalContador"
    //almaceno el contador de productos en el localStorage y llamo a la funcion a principio del algoritmo para que me lo muestre desde el inicio
    const carritoLength = carrito.length;
    localStorage.setItem("guardarContador", JSON.stringify(carritoLength));
    contador.innerText= JSON.parse(localStorage.getItem("guardarContador"));

    containerModalContador.append(contador)
}



//ordenar productos por precio:

const containerOrdenPrecios = document.getElementById("containerOrdenPrecios")
containerOrdenPrecios.className="containerOrdenPrecios";
const tituloOrden = document.createElement("div")
containerOrdenPrecios.innerHTML = ` <h2 class="tituloOrden">ORDENAR</h2>
                                    <div>
                                        <button id="menorPrecio">Menor precio</button>
                                        <button id="mayorPrecio">Mayor precio</button>
                                    </div>`

const menorPrecio = document.getElementById("menorPrecio");
const mayorPrecio = document.getElementById("mayorPrecio");
menorPrecio.className ="ordenPrecio"
mayorPrecio.className="ordenPrecio"

menorPrecio.addEventListener("click", () =>{
    arrayProductos.sort((a,b) => a.precio-b.precio)
    mostrarProductos()

})

mayorPrecio.addEventListener("click", () =>{
    arrayProductos.sort((a,b) => b.precio - a.precio)
    mostrarProductos()
})

//incluyo localStorage al proyecto

//1 creo una funcion con  el set item

const guardarProducto = () =>{
    localStorage.setItem("guardarCarrito", JSON.stringify(carrito));
}

