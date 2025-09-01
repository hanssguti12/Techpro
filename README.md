# 🚗 TechPro - Tienda de Equipos tecnológicos


> **TechPro** Es un sistema web que permite la gestión y venta de equipos tecnológicos de manera sencilla. Incluye un login de usuarios, CRUD de productos, carrito de compras dinámico y la opción de finalizar compra, la cual descuenta el stock y guarda el historial de ventas en una base de datos SQLite.

## ✨ Características Principales

- **Gestión integral de productos**: El sistema permite registrar, actualizar. consultar y eliminar equipos tecnológicos, manteniendo un inventario organizado y actualizado.

- **Autenticación y Seguridad**: Implementa un sistema de login y cierre de sesión con manejo de sesiones, garantizando que solo usuarios autorizados accedan a la plataforma.
‎

- **Historial de Transacciones**: Cada compra queda registrada en la base de datos, permitiendo consultar las operaciones realizadas y llevar un control del flujo de ventas.


## ‎🎯 Objetivos de TechPro 

- Optimizar la administración del inventario tecnológico, ofreciendo una herramienta práctica y eficiente para el control de productos.

- Simular una plataforma de comercio electrónico real, integrando funcionalidades de gestión, carrito de compras y registro de transacciones.

- Consolidar el aprendizaje en desarrollo web full stack, aplicando Node.js y SQLite en la construcción de un sistema funcional y escalable.

- Garantizar accesibilidad y seguridad en el uso del sistema, mediante autenticación de usuarios y resguardo de la información en la base de datos.


## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **HTML** - Estructura de la página 
- **CSS** - Diseño y Presentación 
- **JavaScript** - Interactividad

### **Backend (Node.js + Express)**
- **Node.js** - Runtime de JavaScript
- **Express 4.18.2** - Framework web


### **Base de Datos**
- **SQLite3** - Base de datos relacional


## 🚀 Configuración

### **Prerrequisitos**
- Node.js (v16 o superior)
- npm 
- Git

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/tu-usuario/TechPro.git
cd TechPro
```

### **2. Instalar Dependencias**
```bash
# Instalar dependencias del proyecto
npm install

# Instalar dependencias de desarrollo
npm install -g nodemon
```

### **3. Ejecución del Proyecto**

#### **Ejecución por Separado**
```bash
# Desarrollo
npm start # Opción 1
node server.js # Opción 2
```


## 📱 Uso de la Aplicación

### **Registro y Autenticación**
1. **Registro de Trabajador**: Registro con cuenta de usuario y contraseña
2. **Login**: Autenticación segura para gestionar productos, realizar compras y consultar el historial de trasacciones


## 🗂️ Estructura del Proyecto

```
TechPro/
├── server.js
├── db.js
├── public/
│    ├── index.html
│    ├── styles.css
│    ├── script.js
│    └── assets/
│       └── logo TechPro.png
├── 📊 Base de Datos   
│   └── tienda.sqlite 
└── 📝 Documentación
    └── README.md    
         
```

## 🔌 API Endpoints

### **Usuarios**
- `POST /api/login` - Inicio de sesión

### **Productos**
- `GET /api/productos` - Lista todos los productos en la tienda
- `POST /api/productos` - Agregar nuevo producto

### **Compras**
- `POST /api/finalizar-compra` - Fin del pago
- `GET /api/compras/:usuario_id` - Historial de Compras


## 🧪 Usuarios de Prueba

### **Datos**
- **Usuario**: admin
- **Contraseña**: 1234

## 🔒 Seguridad

- **Validación de Datos**: Validación en frontend y backend
- **Sanitización**: Limpieza de datos de entrada
- **CORS**: Configuración de seguridad para APIs
- **Variables de Entorno**: Configuración segura

## 📊 Base de Datos

### **Tablas Principales**
- `usuarios` - Usuarios (clientes y trabajadores)
- `productos` - Inventario de la tienda
- `compras` - Historial de Pagos


## 🚀 Despliegue

### **Backend (Render)**
```bash
# Configurar variables de entorno en la plataforma
# Subir código al repositorio
# Conectar con servicio de despliegue
```

## 🙏 Agradecimientos

- **SQLite** por la base de datos ligera
- **Express** por el framework web

---

**Desarrollado con ❤️ para la innovación tecnológica**  
