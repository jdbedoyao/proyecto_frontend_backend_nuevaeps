# Sistema de Gestión y Consulta de Solicitudes de Medicamentos para Nueva EPS S.A

Este proyecto es una solución full-stack distribuida en microservicios backend desarrollados en \*\*Spring Boot\*\* y una aplicación frontend moderna construida con \*\*Angular\*\*. Permite a los usuarios registrarse, autenticarse mediante JWT, realizar solicitudes de medicamentos (POS y NO POS con validación dinámica) y consultar el historial de solicitudes asociadas a su cuenta.

\---

## 🛠️ Detalles del Entorno de Ejecución

### Prerrequisitos

\- \*\*Java Development Kit (JDK):\*\* Versión 21 o superior.

\- \*\*Node.js:\*\* Versión 24.18 o superior.

\- \*\*npm:\*\* Versión 11.16 o superior.

\- \*\*Angular CLI:\*\* Versión 22.1 (\`npm install -g @angular/cli\`).

\- \*\*Base de Datos:\*\* MySQL 8.4.9 puerto 3306 si lo tiene sirviendo en otro puerto por favor modificar los \`application.properties\` en las url de conexión.

\### Puertos de la Aplicación

| Servicio | Descripción | Puerto / URL |

| :--- | :--- | :--- |

| \*\*Frontend\*\* | Aplicación Angular (Standalone) | \`<http://localhost:4200\`> |

| \*\*API 1 (\`api-usuarios\`)\*\* | Servicio de Registro y Login | \`<http://localhost:10081\`> |

| \*\*API 2 (\`api-solicitudes\`)\*\* | Servicio de Medicamentos y Solicitudes | \`<http://localhost:10082\`> |

\---

## 🚀 Instrucciones de Instalación y Ejecución

### 1. Clonar el Repositorio

\`\`\`bash

git clone &lt;URL_DEL_REPOSITORIO&gt;

cd &lt;NOMBRE_DEL_PROYECTO&gt;

### 1\. Restaurar la base de datos en el motor de Mysql

Se debe crear la base de datos con el nombre \`drogas_nueva_eps_db\` asi:

\$mysql -u root -p

luego en la consola escribir :

\`CREATE DATABASE IF NOT EXISTS drogas_nueva_eps_db\`;

luego salir de la consola de mysql \`\\q\` y digitar:

\$mysql -u root -p drogas_nueva_eps_db</proy_nueva_eps/drogas_nueva_eps_db.sql

y se restaurará el back en la bases de datos ya creada.

### 2\. Ejecutar las APIs Backend (Spring Boot)

#### **API 1: Autenticación y Usuarios (api-usuarios)**

1. Navega a la carpeta de la API de usuarios:

Bash

cd /proy_nueva_eps/api-auth/

1. Ejecuta el servicio con Maven:

Bash

./mvnw spring-boot:run

_(El servicio iniciará en el puerto 10081)_.

1. Tambien puedes correrlo desde IntelliJ IDEA , se usó la versión 2025.3 corriendo el archivo: \` ApiAuthApplication\`

#### **API 2: Solicitudes y Medicamentos (api-solicitudes)**

1. Abre una nueva terminal y navega a la carpeta del microservicio, recuerda que no existan espacion en blanco en las nombres de crapetas de las rutas donde se encuentra los proyectos:

Bash

cd /proy_nueva_eps/apisolicitudes/

1. Ejecuta el servicio con Maven:

Bash

./mvnw spring-boot:run

_(El servicio iniciará en el puerto 10082)_.

1. Tambien puedes correrlo desde IntelliJ IDEA , se usó la versión 2025.3 corriendo el archivo: \` ApisolicitudesApplication\`

### 3\. Ejecutar el Frontend (Angular)

1. Abre una nueva terminal y dirígete a la carpeta del frontend:

Bash

cd /proy_nueva_eps/front_nueva_eps/

1. Instala las dependencias necesarias:

Bash

npm install

1. Inicia el servidor de desarrollo:

Bash

ng serve -o

1. O abre el navegador en <http://localhost:4200>.

## 4.Endpoints de la API

Puedo importar desde postman los archivos que se encuentrane en el repositorio llamados :

\- NuevaEPS_auth.postman_collection.json

\- NuevaEPS_solicitudes.postman_collection.json

Para obtener el token que puede ser usado en los endpoint con autenticación requerida, puedo usar el endpoint login y obtener el token y adicionarlo en la peticion en la pestaña Autorization y seleccionar Bearer Token y adicionar ese valor que le entrega el endpoint de login.

### 1\. Servicio de Usuarios (<http://localhost:10081>)

| **Método** | **Endpoint**                  | **Descripción**                              | **Autenticación** |
| ---------- | ----------------------------- | -------------------------------------------- | ----------------- |
| POST       | localhost:10081/auth/registro | Registra un nuevo usuario en la plataforma.  | No requerida      |
| POST       | localhost:10081/auth/login    | Autentica un usuario y retorna un token JWT. | No requerida      |

### 2\. Servicio de Solicitudes (<http://localhost:10082>)

| **Método** | **Endpoint**                                 | **Descripción**                                              | **Autenticación** |
| ---------- | -------------------------------------------- | ------------------------------------------------------------ | ----------------- |
| GET        | localhost:10082/api/solicitudes/medicamentos | Obtiene el catálogo de medicamentos (POS / NO POS).          | No requerida      |
| POST       | localhost:10082/api/solicitudes              | Registra una nueva solicitud de medicamento.                 | **Bearer JWT**    |
| GET        | localhost:10082/api/solicitudes              | Retorna el historial de solicitudes del usuario autenticado. | **Bearer JWT**    |

## 🔒 Arquitectura de Seguridad y Características Clave

- **Filtro JWT Stateless:** Autenticación basada en Bearer Tokens almacenados en localStorage del cliente.
- **Control de Rutas (Angular authGuard):** Previene el acceso a /solicitudes y /consulta-solicitudes a usuarios no autenticados.
- **Interceptores HTTP (jwtInterceptor):** Inyecta automáticamente la cabecera Authorization: Bearer &lt;TOKEN&gt; en cada petición al backend.
- **Formularios Reactivos Dinámicos:** Mapeo de campos requeridos condicionales (numeroOrden, direccion, telefono, correo) activados únicamente cuando el medicamento seleccionado no forma parte del plan POS.
