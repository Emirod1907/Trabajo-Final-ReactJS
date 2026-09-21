# Tienda Online — React + Firebase

E-commerce desarrollado con React y Vite, con catálogo de productos, registro y autenticación
de usuarios, y persistencia de datos en Firebase Firestore.

**Demo:** https://trabajo-final-react-js.vercel.app

> Trabajo práctico final del Diplomado en Desarrollo con React JS — Centro de e-Learning UTN FRBA.

---

## Funcionalidades

- **Catálogo de productos** — listado con imagen, título, precio real, precio final y descuento.
- **Detalle de producto** — vista individual con la información completa del artículo.
- **Registro de usuarios** — alta de cuenta con nombre, apellido, email y contraseña.
- **Login** — autenticación por email y contraseña mediante Firebase Authentication.
- **Alta de productos** — formulario para cargar nuevos artículos al catálogo.
- **Manejo de estado de compra** — acción para marcar un producto como comprado y reinicio al
  estado inicial, con re-renderizado reactivo de la interfaz.
- **Persistencia** — el catálogo y las cuentas se almacenan en Firebase; no hay datos mockeados.

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 18, Vite |
| Ruteo | React Router |
| Base de datos | Firebase Firestore |
| Autenticación | Firebase Authentication |
| Estilos | CSS |
| Despliegue | Vercel |

---

## Instalación y uso

### Requisitos previos

- Node.js 18 o superior
- npm
- Un proyecto de Firebase con Firestore y Authentication habilitados

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Emirod1907/Trabajo-Final-ReactJS.git
cd Trabajo-Final-ReactJS

# 2. Instalar dependencias
npm install

# 3. Configurar las variables de entorno
cp .env.example .env
# Completar el archivo .env con las credenciales del proyecto de Firebase

# 4. Levantar el servidor de desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

### Variables de entorno

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Estos valores se obtienen en la consola de Firebase, en *Configuración del proyecto → Tus aplicaciones*.

> **Nota:** Vite reemplaza las variables `VITE_*` durante el build, no en tiempo de ejecución.
> Al desplegar en Vercel hay que cargarlas en el panel del proyecto y **volver a desplegar**
> para que tomen efecto.

### Build de producción

```bash
npm run build     # genera la carpeta dist/
npm run preview   # sirve el build localmente para verificarlo
```

---

## Modelo de datos

Colección `products` en Firestore:

| Campo | Tipo | Descripción |
|---|---|---|
| `title` | string | Nombre del producto |
| `real_price` | string | Precio de lista |
| `final_price` | number | Precio con descuento aplicado |
| `discount` | string | Porcentaje de descuento |
| `img` | string | URL de la imagen |

Los usuarios no se almacenan en Firestore: los gestiona **Firebase Authentication**, que mantiene
su propio almacén de cuentas (email, contraseña hasheada y UID).

---

## Decisiones técnicas

**Reglas de seguridad con permisos mínimos.**
El proyecto se inició con las reglas de Firestore en modo de prueba, que permiten lectura y
escritura a cualquiera y expiran automáticamente a los 30 días. Al vencer, la aplicación dejó de
recuperar el catálogo y devolvía `Missing or insufficient permissions`.

Se reemplazaron por reglas explícitas por colección, en lugar de volver a abrir la base:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{documento} {
      allow read: if true;                      // el catálogo es público
      allow write: if request.auth != null;     // solo usuarios autenticados
    }
  }
}
```

La lectura es pública porque un catálogo de e-commerce está pensado para verse sin iniciar sesión.
La escritura queda restringida a usuarios autenticados, de modo que nadie pueda alterar precios o
productos manipulando peticiones desde el navegador sin haber iniciado sesión.

**Estado de compra en memoria.**
La acción de compra modifica el estado del componente en React y la interfaz se actualiza
automáticamente, sin recargar la página ni escribir en Firestore. El botón de reinicio devuelve
el estado inicial. Es una decisión deliberada de alcance: la compra es una demostración del flujo
de estado y del re-renderizado reactivo, no una transacción persistida. Persistir órdenes exigiría
una colección propia con reglas de escritura y validación del lado del servidor, que quedó fuera
del alcance de este trabajo y figura en las mejoras pendientes.

**Credenciales en variables de entorno.**
La configuración de Firebase no está escrita directamente en el código, sino en variables de
entorno. Aunque la config web de Firebase es pública por diseño —viaja al navegador en cualquier
caso—, mantenerla fuera del repositorio permite usar distintos proyectos para desarrollo y
producción sin tocar el código.

**Autenticación delegada.**
No se implementó manejo propio de contraseñas. Firebase Authentication se encarga del hash, el
almacenamiento y la validación de credenciales, que es exactamente el tipo de problema donde una
implementación casera introduce vulnerabilidades.

---

## Estructura del proyecto

```
├── config/           # configuración de Firebase
├── public/           # archivos estáticos
├── src/              # componentes, vistas y lógica de la aplicación
├── index.html
├── vercel.json       # configuración de despliegue
└── vite.config.js
```

---

## Mejoras pendientes

- Carrito de compras con persistencia de órdenes en Firestore.
- Rutas protegidas en la interfaz para ocultar el alta de productos a usuarios no autenticados.
- Validación de formularios con mensajes de error por campo.
- Mejoras de accesibilidad y diseño responsive.

---

## Autor

**Emiliano Rodríguez** — Técnico Superior en Desarrollo de Software
[GitHub](https://github.com/Emirod1907) · [LinkedIn](https://www.linkedin.com/in/emiliano-jesus-ivan-rodriguez-b0a110252)
