const API_URL = "/api/productos";
let carrito = [];
let usuario_id = null;

const loginDiv = document.getElementById("loginDiv");
const tiendaDiv = document.getElementById("tiendaDiv");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const tablaProductos = document.getElementById("tablaProductos");
const tablaCarrito = document.getElementById("tablaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const btnFinalizar = document.getElementById("finalizarCompraBtn");
const historial = document.getElementById("historialCompras");

// Login
btnLogin.addEventListener("click", async ()=>{
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({username,password})
  });

  const data = await res.json();
  if(res.ok){
    usuario_id = data.usuario_id;
    loginDiv.style.display="none";
    tiendaDiv.style.display="block";
    cargarProductos();
    cargarHistorial();
  }else{
    alert(data.error);
  }
});

// Función para cerrar sesión
function cerrarSesion() {
  usuario_id = null;
  carrito = [];
  tiendaDiv.style.display = "none";
  loginDiv.style.display = "flex";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  mostrarCarrito(); // Limpiar carrito visualmente
}

// Event listener para botón de cerrar sesión
btnLogout.addEventListener("click", cerrarSesion);

// Cargar productos
async function cargarProductos(){
  const res = await fetch(API_URL);
  const productos = await res.json();
  tablaProductos.innerHTML="";
  productos.forEach(p=>{
    const fila = document.createElement("tr");
    fila.innerHTML=`
      <td>${p.nombre}</td>
      <td>${p.descripcion}</td>
      <td>$${p.precio}</td>
      <td>${p.stock}</td>
      <td>
        <button onclick="agregarAlCarrito(${p.id}, '${p.nombre}', ${p.precio})">Agregar</button>
        <button onclick="eliminarProducto(${p.id})">Eliminar</button>
      </td>
    `;
    tablaProductos.appendChild(fila);
  });
}


// Carrito
function agregarAlCarrito(id,nombre,precio){
  const p = carrito.find(item=>item.id===id);
  if(p) p.cantidad++;
  else carrito.push({id,nombre,precio,cantidad:1});
  mostrarCarrito();
}

function mostrarCarrito(){
  tablaCarrito.innerHTML="";
  let total=0;
  carrito.forEach(item=>{
    const subtotal = item.precio*item.cantidad;
    total+=subtotal;
    const fila=document.createElement("tr");
    fila.innerHTML=`
      <td>${item.nombre}</td>
      <td>${item.cantidad}</td>
      <td>$${item.precio}</td>
      <td>$${subtotal}</td>
      <td>
        <button onclick="cambiarCantidad(${item.id},1)">+</button>
        <button onclick="cambiarCantidad(${item.id},-1)">-</button>
        <button onclick="quitarDelCarrito(${item.id})">Eliminar</button>
      </td>
    `;
    tablaCarrito.appendChild(fila);
  });
  totalCarrito.textContent=`Total: $${total}`;
}

function cambiarCantidad(id,delta){
  const p=carrito.find(item=>item.id===id);
  if(p){ p.cantidad+=delta; if(p.cantidad<=0) carrito=carrito.filter(item=>item.id!==id); mostrarCarrito();}
}
function quitarDelCarrito(id){ carrito=carrito.filter(item=>item.id!==id); mostrarCarrito();}

// CRUD productos
document.getElementById("productoForm").addEventListener("submit", async e=>{
  e.preventDefault();
  const nuevo={
    nombre: document.getElementById("nombre").value,
    descripcion: document.getElementById("descripcion").value,
    precio: parseFloat(document.getElementById("precio").value),
    stock: parseInt(document.getElementById("stock").value)
  };
  
  try {
    const response = await fetch(API_URL,{
      method:"POST", 
      headers:{"Content-Type":"application/json"}, 
      body:JSON.stringify(nuevo)
    });
    
    if(response.ok) {
      document.getElementById("productoForm").reset();
      await cargarProductos();
    } else {
      const errorData = await response.json();
      alert("Error al agregar producto: " + (errorData.error || "Error desconocido"));
    }
  } catch (error) {
    alert("Error de conexión: " + error.message);
  }
});

async function eliminarProducto(id){
  await fetch(`${API_URL}/${id}`,{method:"DELETE"});
  cargarProductos();
}

// Finalizar compra
btnFinalizar.addEventListener("click", async ()=>{
  if(carrito.length===0){ alert("Carrito vacío"); return;}
  const res = await fetch("/api/finalizar-compra", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({usuario_id, productos: carrito})
  });
  const data=await res.json();
  if(res.ok){
    alert(data.mensaje);
    carrito=[];
    mostrarCarrito();
    cargarProductos();
    cargarHistorial();
  } else{
    alert("Error: "+data.error);
  }
});

// Historial
async function cargarHistorial(){
  const res = await fetch(`/api/compras/${usuario_id}`);
  const compras = await res.json();
  historial.innerHTML="";
  compras.forEach(c=>{
    const fila=document.createElement("tr");
    fila.innerHTML=`
      <td>${c.producto}</td>
      <td>${c.cantidad}</td>
      <td>$${c.total}</td>
      <td>${new Date(c.fecha).toLocaleString()}</td>
    `;
    historial.appendChild(fila);
  });
}