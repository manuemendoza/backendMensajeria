# API_mensajeria

Esto es una API basica para uso personal de una mensajera instantanea en con la cual podras disfrutar con quien tu desees

## Comenzando 🚀

Para el desarrollo de esta aplicación se utiliza como lenguaje JavaScript y una base de datos MongoDB para una mejor definicón y gestión de la misma y consultar y modificar los datos. En cuanto al sistema de gestión se ha utilizado moongose.
Con el patrón de MVC en mente se ha procedido a ordenar las carpetas internas en una aplicación principal, que enlaza todos los demás componentes y dividir en tres componentes principares, usuarios (users), mensajes(messages), chat(chats). 
Ambas contienen su propia carpeta de controller, model y router, para así ajustarse al patrón mencionado.
Arbol de Archivos
````tree

├── components
|       ├── message
|       |   ├── controller.js
|       |   ├── model.js
|       |   └── router.js
|       ├── chat
|       |   ├── controller.js
|       |   ├── model.js
|       |   └── router.js
|       └── user
|           ├── controller.js
|           ├── model.js
|           └── router.js
├── node_modules
|
├── package-lock.json
|
├── package.json
|
├── app.js
|
├── auth.js
|
├── .env
|
├── .gitignore
|
└── readme.md

````
Existe un Frontend  para su uso que podras encontrarlo en mi repositorio(poner el nombre del Frontend), para poder comprobar que esta aplicación funciona, requerimos el uso de Postman, un software que permite la interacción con la base de datos para poder simular su uso.



### Instalación 🔧

Una vez clonado, lo primero que debes hacer en la carpeta del proyecto es un npm i para poder instalar las distintas tecnologias y Fremeworks.

TECNOLOGIAS USADAS
- JavaScript
- Express
- MongoDB
- Mongoose
- Postman

## Ejecutando las pruebas ⚙️

Para ejecutar las pruebas en postman usaremos la siguientes endpoint.

Para los usuarios.

localhost:(tu dirección)/users

Para los mensajes.

localhost:(tu dirección)/messages

Para los chat

localhost:(tu dirección)/chats

Utilizando los endpoint anteriores podemos ir añadiendo diferentes rutas y llamados HTTP ( GET, PUT, POST, DELETE). Acontinuación os dejo un ejemplo de como usarlo.

Ejemplo GET.
Ejemplo Put.
Ejemplo POST.
Ejemplo DElETE.

## Despliegue 📦

_Agrega notas adicionales sobre como hacer deploy_

## Autores ✒️

* **Manuel Mendoza** - *Desarrollador*  

## Licencia 📄

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Gratitud 🎁

Queria dar las gracias al equipo de GeeksHups academy por su apoyo para la realización de este proyecto.


