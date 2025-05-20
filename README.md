# Azul Café - Menú Online

Un sitio web para mostrar el menú de Azul Café con un panel de administración para actualizar fácilmente los precios.

## Características

- Menú online responsive
- Panel de administración protegido con contraseña
- Capacidad para editar precios, añadir y eliminar productos
- Listo para desplegar en Vercel
- Sistema de persistencia de datos para entornos serverless

## Configuración para Desarrollo Local

1. Clona este repositorio
2. Abre el proyecto en tu editor de código
3. Para probar localmente, puedes usar un servidor local como Live Server (extensión de VS Code)
4. Para probar el entorno Vercel, utiliza `vercel dev`

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
- **POST /api/auth**: Autentica al administrador y devuelve un API key

### Sistema de Base de Datos

Para resolver el problema de persistencia de datos en entornos serverless como Vercel, esta aplicación implementa:

1. **Simulación de base de datos (`db.js`)**: Maneja los datos del menú en memoria y sincronización con variables de entorno
2. **Persistencia vía Variables de Entorno**: Almacena los datos del menú actualizados en variables de entorno
3. **Sistema de Caché**: En caso de reinicio de función, recupera los datos desde la variable de entorno

Este enfoque permite que los cambios en el menú persistan entre múltiples invocaciones de las funciones serverless, lo que tradicionalmente es un desafío en este tipo de arquitecturas.

Para implementaciones de producción más robustas, considera usar:
- Vercel KV (almacenamiento clave-valor basado en Redis)
- MongoDB Atlas
- Supabase o PostgreSQL

#### Flujo de Datos:
1. El panel de administración hace peticiones a `/api/update-menu` con los cambios
2. La función actualiza los datos en memoria y los escribe en la variable de entorno
3. Futuras peticiones a `/api/get-menu` recogerán estos datos persistentes

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

Para que los cambios en el menú persistan entre sesiones, **es obligatorio** configurar las siguientes variables de entorno en Vercel:

1. En la consola de Vercel, ve a tu proyecto
2. Navega a "Settings" > "Environment Variables"
3. Añade estas variables:
   - `API_KEY`: Clave para autenticar peticiones de actualización del menú (ej: `azulcafe-admin-123`)
   - `ADMIN_PASSWORD`: Contraseña para el panel de administración (ej: `admin123`)
   - `AZUL_CAFE_MENU_DATA`: (se creará automáticamente) Almacena los datos del menú
   - `AZUL_CAFE_MENU_UPDATED_AT`: (se creará automáticamente) Marca de tiempo de la última actualización
4. Aplica las variables a los entornos de Production, Preview y Development

**Importante**: Después de realizar cambios en el menú a través del panel de administración, estos se almacenarán en la instancia actual de la función. Para hacer que estos cambios sean permanentes en todas las instancias, debes actualizar manualmente las variables de entorno en el panel de Vercel con los valores que aparecen en los logs de la función, o implementar una solución de base de datos más robusta como se sugiere en este documento.

## Pruebas de API

Para probar las funciones serverless, puedes utilizar las herramientas incluidas:

1. **Usando la página de prueba en el navegador**:
   - Después de desplegar en Vercel, abre `https://tu-proyecto.vercel.app/api-test.html`
   - Utiliza los botones para probar diferentes endpoints

2. **Usando el script de API Test**:
   - El script está disponible en `js/api-test.js`
   - Actualiza `API_BASE_URL` con la URL de tu proyecto desplegado
   - Ejecuta el script en un navegador o usando Node.js

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

3. **Endpoints disponibles para pruebas**:
   - `/api/health` - Para verificar que la API esté funcionando
   - `/api/get-menu` - Para obtener datos del menú
   - `/api/test` - Obtener información de diagnóstico
   - `/api/auth` - Autenticación (POST)
   - `/api/update-menu` - Actualizar menú (POST, requiere autenticación)

## Contacto

Para cualquier pregunta o soporte, contacta con el equipo de desarrollo.
