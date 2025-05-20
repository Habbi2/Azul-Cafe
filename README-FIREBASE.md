# Azul Café - Menú Online (Firebase Version)

Un sitio web para mostrar el menú de Azul Café con un panel de administración para actualizar fácilmente los precios, ahora utilizando Firebase para una experiencia en tiempo real.

## Características

- Menú online responsive
- Panel de administración protegido con contraseña
- Capacidad para editar precios, añadir y eliminar productos
- Actualizaciones en tiempo real (sin necesidad de recargar la página)
- Fácil despliegue en Firebase Hosting
- Persistencia de datos mediante Firebase Realtime Database

## Tecnologías Utilizadas

- HTML, CSS, JavaScript (Vanilla)
- Firebase Realtime Database
- Firebase Authentication (anónimo)
- Firebase Hosting

## Configuración para Desarrollo Local

1. Clona este repositorio
2. Abre el proyecto en tu editor de código
3. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
4. Actualiza el archivo `js/firebase-config.js` con tus credenciales de Firebase
5. Para probar localmente, puedes usar un servidor local como Live Server (extensión de VS Code)

## Despliegue en Firebase

Para desplegar esta aplicación en Firebase:

1. Crea una cuenta en [Firebase](https://firebase.google.com/) si aún no tienes una
2. Instala Firebase CLI: `npm i -g firebase-tools`
3. En la terminal, ve a la carpeta del proyecto
4. Ejecuta `firebase login` y sigue las instrucciones
5. Ejecuta `firebase init` para inicializar el proyecto (selecciona Hosting y la base de datos)
6. Ejecuta `firebase deploy` para desplegar

Consulta el archivo `FIREBASE-DEPLOYMENT.md` para instrucciones detalladas.

## Estructura de Datos

La aplicación utiliza Firebase Realtime Database con la siguiente estructura:

```
- menu
  - categorias
    - [0]
      - id: "sin-leche"
      - nombre: "Sin Leche"
      - items
        - [0]
          - id: "sin-leche-1"
          - nombre: "Espresso"
          - descripcion: "Shot de café negro intenso"
          - precio: 1.20
        - [1]
          ...
    - [1]
      ...
```

## Autenticación

Para simplificar, este proyecto utiliza autenticación anónima de Firebase:

- Los usuarios anónimos pueden ver el menú
- El administrador se autentica con una contraseña y luego Firebase crea una sesión anónima
- Solo los usuarios autenticados pueden modificar el menú

En un entorno de producción, es recomendable implementar un método de autenticación más robusto, como email/contraseña o autenticación social.

## Uso del Panel de Administración

- Accede a la página de administración en `/admin.html`
- Contraseña por defecto: `admin123` (¡Cámbiala en producción!)
- Después de hacer cambios, haz clic en "Guardar Cambios"
- Los cambios se sincronizan automáticamente con todos los clientes

## Personalización

Personaliza la apariencia editando los archivos CSS en la carpeta `css`.

## Nota de Seguridad

Este proyecto está diseñado para demostración. En un entorno de producción, deberías:

1. Implementar reglas de seguridad más estrictas en Firebase Database
2. Utilizar autenticación más segura (como email/contraseña)
3. Implementar validación de datos en el servidor mediante Cloud Functions
4. Habilitar el modo de seguridad en Firebase
5. Cambiar la contraseña de administrador a algo más seguro

## Reglas de Seguridad de Firebase

Las reglas de seguridad básicas para la base de datos están en el archivo `database.rules.json`. Estas permiten:
- A cualquier persona leer los datos del menú
- Solo a usuarios autenticados modificar los datos

Para aplicar estas reglas, ejecuta:
```
firebase deploy --only database
```

## Migración desde Vercel

Esta versión del proyecto reemplaza el enfoque anterior basado en Vercel Serverless Functions con Firebase. Las principales diferencias son:

1. No se requieren funciones serverless personalizadas
2. Los datos se actualizan en tiempo real sin recargar la página
3. No es necesario gestionar variables de entorno para el almacenamiento de datos
4. La autenticación se maneja a través de Firebase en lugar de tokens personalizados

Los archivos en la carpeta `/api` ya no son necesarios en esta implementación.

## Contacto

Para cualquier pregunta o soporte, contacta con el equipo de desarrollo.
