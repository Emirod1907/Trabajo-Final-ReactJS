# Tienda Online — React + Firebase

E-commerce desarrollado con React y Vite, con catálogo de productos servido desde Firebase
Firestore y alta de artículos con carga de imágenes.

**Demo:** https://trabajo-final-react-js.vercel.app

> Trabajo práctico final del Diplomado en Desarrollo con React JS — Centro de e-Learning UTN FRBA.

---

## Funcionalidades

- **Catálogo de productos** — listado en grilla responsive con imagen, título, precio de lista,
  descuento y precio final, leído desde Firestore.
- **Detalle de producto** — vista individual por ruta dinámica (`/producto/:product_id`) con la
  descripción completa del artículo.
- **Alta de productos** — formulario que sube la imagen a ImgBB, calcula el precio final a partir
  del descuento y persiste el producto en Firestore.
- **Manejo de estado de compra** — botón que pasa por los estados *no comprado → cargando →
  comprado* y un botón de reinicio, con re-renderizado reactivo.
- **Estados de carga y error** — el listado y el detalle muestran *Cargando...* mientras resuelven
  y un mensaje de error si la consulta falla.

### Alcance actual

Las pantallas de **Registro** y **Login** están maquetadas pero **no tienen lógica**: sus
formularios no envían datos ni validan campos, y el proyecto no integra Firebase Authentication.
Son la base visual sobre la que se implementará la autenticación, que figura en las mejoras
pendientes.

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 19, Vite 6 |
| Ruteo | React Router 7 |
| Base de datos | Firebase Firestore 11 |
| Hosting de imágenes | ImgBB (API REST) |
| Estilos | CSS plano, un archivo por componente |
| Despliegue | Vercel |

---

## Instalación y uso

### Requisitos previos

- Node.js 18 o superior
- npm
- Un proyecto de Firebase con Firestore habilitado

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Emirod1907/Trabajo-Final-ReactJS.git
cd Trabajo-Final-ReactJS

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

No hace falta configurar variables de entorno: la configuración de Firebase está incluida en
`config/firebase.js` y el proyecto apunta a una base ya poblada. Para usar una base propia hay que
reemplazar ese objeto de configuración por el del proyecto de Firebase correspondiente
(*Configuración del proyecto → Tus aplicaciones* en la consola).

### Build de producción

```bash
npm run build     # genera la carpeta dist/
npm run preview   # sirve el build localmente para verificarlo
```

---

## Rutas

| Ruta | Pantalla | Estado |
|---|---|---|
| `/` | Catálogo de productos | Funcional |
| `/producto/:product_id` | Detalle del producto | Funcional |
| `/product/new` | Alta de producto | Funcional |
| `/registro` | Registro de usuario | Solo maqueta |
| `/login` | Inicio de sesión | Solo maqueta |

`ContactScreen` está implementada como componente pero todavía no tiene una ruta asignada, así que
no es alcanzable desde la aplicación.

El archivo `vercel.json` reescribe todas las peticiones hacia `/` para que las rutas del ruteador
no devuelvan 404 al recargar la página o al entrar por un enlace directo, que es el comportamiento
por defecto de un hosting estático frente a una SPA.

---

## Modelo de datos

Colección `products` en Firestore:

| Campo | Tipo | Descripción |
|---|---|---|
| `title` | string | Nombre del producto |
| `real_price` | string \| number | Precio de lista |
| `discount` | string \| number | Porcentaje de descuento |
| `final_price` | number | Precio con el descuento ya aplicado |
| `description` | string | Descripción del artículo |
| `img` | string | URL pública de la imagen en ImgBB |

Los tipos de `real_price` y `discount` son mixtos según el origen del documento: los cargados a
mano desde la consola de Firebase quedaron como números, mientras que los que crea el formulario
se guardan como cadenas, porque el valor de un `<input>` en el DOM siempre es texto y no se
convierte antes de escribir. No rompe la aplicación —esos campos solo se muestran— pero impide
ordenar o filtrar por precio del lado del servidor, y está anotado en las mejoras pendientes.

No existe colección de usuarios: no hay registro ni autenticación implementados.

---

## Decisiones técnicas

**Estado de compra en memoria.**
La acción de compra modifica el estado del componente en React y la interfaz se actualiza
automáticamente, sin recargar la página ni escribir en Firestore. El botón de reinicio devuelve el
estado inicial. Es una decisión deliberada de alcance: la compra demuestra el flujo de estado y el
re-renderizado reactivo, no es una transacción persistida. Persistir órdenes exigiría una colección
propia, reglas de escritura y validación del lado del servidor.

**Capa de servicios separada de los componentes.**
Las consultas a Firestore viven en `src/services/productService.js`, no dentro de los componentes.
Las pantallas importan `getProducts` y `getProductById` sin saber que detrás hay Firebase, de modo
que cambiar el origen de datos no obliga a tocar la interfaz. El mismo archivo conserva comentada
una implementación anterior contra un JSON local, que fue exactamente ese cambio de origen.

**Imágenes delegadas a ImgBB.**
El alta de productos sube el archivo a ImgBB por su API REST y guarda en Firestore únicamente la
URL resultante. Esto evita depender de Firebase Storage, que en el plan gratuito requiere
configuración adicional, y mantiene los documentos livianos.

**CSS con nombres de clase acotados por componente.**
Vite reúne todas las hojas de estilo importadas en un único CSS global, sin ámbito por componente.
Dos archivos distintos que definan la misma clase colisionan, y gana el que quede último en el
paquete: así fue como la clase `.conteiner` de la pantalla de detalle terminó deformando las
tarjetas del catálogo. Las reglas se reescribieron con nombres propios por componente
(`.product-card`, `.product-detail`) y sin selectores de elemento sueltos, que eran globales y se
aplicaban a toda la aplicación.

---

## Seguridad — estado actual

El catálogo es de lectura pública, que es el comportamiento esperado de un e-commerce: se ve sin
iniciar sesión.

La escritura, en cambio, **no está protegida**. La aplicación crea productos sin pedir credenciales
porque no hay autenticación implementada, de modo que las reglas de Firestore del proyecto deben
permitir la escritura sin autenticar para que el formulario funcione. Cualquiera que conozca el
identificador del proyecto puede escribir en la colección.

Lo mismo aplica a las dos claves incluidas en el repositorio: la configuración de Firebase en
`config/firebase.js` y la clave de la API de ImgBB en `CreateProductScreen.jsx`. La config web de
Firebase es pública por diseño —viaja al navegador en cualquier caso, y lo que protege la base son
las reglas, no el secreto de esa clave—, pero la de ImgBB sí es una credencial de servicio y no
debería estar versionada.

El cierre de este punto es el mismo trabajo: implementar Firebase Authentication, restringir la
escritura a usuarios autenticados y mover la clave de ImgBB a una variable de entorno.

```javascript
// Reglas de Firestore a aplicar una vez implementada la autenticación
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

---

## Estructura del proyecto

```
├── config/
│   └── firebase.js             # inicialización de Firebase y Firestore
├── public/                     # archivos estáticos
├── src/
│   ├── Components/             # Navbar, ProductCard, ProductList,
│   │                           # BotonComprar, Contador, Login, Registro
│   ├── Screens/                # Home, ProductDetail, CreateProduct, Contact
│   ├── services/
│   │   └── productService.js   # consultas a Firestore
│   ├── App.jsx                 # definición de rutas
│   └── main.jsx                # punto de entrada, monta el ruteador
├── index.html
├── vercel.json                 # reescrituras para el ruteo del lado del cliente
└── vite.config.js
```

`config/` queda fuera de `src/` y los componentes lo importan subiendo niveles
(`../../../config/firebase`), una ruta frágil ante cualquier movimiento de archivos.

---

## Mejoras pendientes

- **Autenticación con Firebase Authentication**, conectando los formularios de registro y login,
  que hoy son solo maquetas.
- **Restringir la escritura en Firestore** a usuarios autenticados, una vez exista autenticación.
- **Mover la clave de la API de ImgBB** a una variable de entorno y quitarla del repositorio.
- **Rutas protegidas** que oculten el alta de productos a usuarios no autenticados.
- **Normalizar los tipos** de `real_price` y `discount` a número antes de escribir en Firestore.
- **Validación de formularios** con mensajes de error por campo.
- **Resolver los componentes sin uso**: asignarle una ruta a `ContactScreen` o quitarla, y lo
  mismo con `Contador`, que no se renderiza en ninguna pantalla.
- **Agregar `eslint.config.js`**: el script `npm run lint` está declarado en `package.json` pero no
  hay configuración de ESLint en el repositorio, así que hoy falla.
- **Calcular el precio final fuera del renderizado**: el formulario de alta lo asigna dentro del
  JSX, un efecto colateral durante el render que conviene mover a un manejador o a un valor
  derivado.
- **Carrito de compras** con persistencia de órdenes en Firestore.
- **Accesibilidad**: etiquetas asociadas a sus campos y textos alternativos revisados.

---

## Autor

**Emiliano Rodríguez** — Técnico Superior en Desarrollo de Software
[GitHub](https://github.com/Emirod1907) · [LinkedIn](https://www.linkedin.com/in/emiliano-jesus-ivan-rodriguez-b0a110252)
