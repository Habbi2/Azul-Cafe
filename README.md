# Azul Café - Menú Online

Un sitio web para mostrar el menú de Azul Café con un panel de administración para actualizar fácilmente los precios.

## Características

- Menú online responsive
- Panel de administración protegido con contraseña
- Capacidad para editar precios, añadir y eliminar productos
- Listo para desplegar en Vercel

## Configuración para Desarrollo Local

1. Clona este repositorio
2. Abre el proyecto en tu editor de código
3. Para probar localmente, puedes usar un servidor local como Live Server (extensión de VS Code)

## Despliegue en Vercel

Para desplegar esta aplicación en Vercel:

1. Crea una cuenta en [Vercel](https://vercel.com) si aún no tienes una
2. Instala Vercel CLI: `npm i -g vercel`
3. En la terminal, ve a la carpeta del proyecto
4. Ejecuta `vercel login` y sigue las instrucciones
5. Ejecuta `vercel` para desplegar
6. Sigue las instrucciones del asistente de despliegue

También puedes desplegar conectando tu repositorio de GitHub a Vercel:

1. Sube este proyecto a un repositorio de GitHub
2. En Vercel, ve a la sección "Import project"
3. Selecciona "Import Git Repository" y conecta tu cuenta de GitHub
4. Selecciona el repositorio y Vercel se encargará del resto

### Funciones Serverless

La aplicación utiliza funciones serverless para manejar la API:

- **GET /api/get-menu**: Obtiene los datos del menú actual
- **POST /api/update-menu**: Actualiza los datos del menú (requiere autenticación)

La configuración de las funciones serverless está en el archivo `vercel.json`, que especifica:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    },
    {
      "src": "**/*.{html,css,js,json,png,jpg,jpeg,gif,svg,ico}",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### Seguridad de la API

La API para actualizar el menú está protegida con un token de autenticación. En un entorno de producción, es recomendable utilizar un sistema de autenticación más robusto, como JWT o OAuth.

## Uso del Panel de Administración

- Accede a la página de administración en `/admin.html`
- Contraseña por defecto: `admin123` (¡Cámbiala en producción!)
- Después de hacer cambios, haz clic en "Guardar Cambios"

## Personalización

Personaliza la apariencia editando los archivos CSS en la carpeta `css`.

## Nota de Seguridad

Este proyecto está diseñado para demostración. En un entorno de producción, deberías:

1. Implementar una autenticación más segura (como JWT, OAuth, o Auth0)
2. Almacenar los datos del menú en una base de datos real (MongoDB, PostgreSQL, etc.)
3. Utilizar variables de entorno para almacenar secretos y claves API
4. Implementar HTTPS para todas las comunicaciones
5. Añadir rate limiting para prevenir ataques de fuerza bruta
6. Validar todas las entradas del usuario
7. Implementar CORS para controlar qué dominios pueden acceder a la API

### Configuración de Variables de Entorno en Vercel

Para mejorar la seguridad, deberías configurar las claves API y contraseñas como variables de entorno en Vercel:

1. En la consola de Vercel, ve a tu proyecto
2. Navega a "Settings" > "Environment Variables"
3. Añade tus variables de entorno (ejemplo: `API_KEY`, `ADMIN_PASSWORD`)
4. Aplica las variables a los entornos de production, preview y development según sea necesario

## Pruebas de API

Para probar las funciones serverless, puedes utilizar el script de prueba incluido:

1. Después de desplegar en Vercel, abre `api/test.js`
2. Actualiza `API_BASE_URL` con la URL de tu proyecto desplegado
3. Ejecuta el script en un navegador o usando Node.js

```javascript
// Ejecutar todas las pruebas
runAllTests();

// O pruebas individuales
testHealthEndpoint();
testGetMenuEndpoint();
testAuthEndpoint('admin123').then(result => {
  if (result && result.apiKey) {
    testUpdateMenuEndpoint(result.apiKey);
  }
});
```

## Contacto

Para cualquier pregunta o soporte, contacta con el equipo de desarrollo.
