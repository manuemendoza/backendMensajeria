# API_mensajeria

Esto es una API basica para uso personal de una mensajera instantanea en con la cual podras disfrutar con quien tu desees

## Comenzando 馃殌

Para el desarrollo de esta aplicaci贸n se utiliza Express y una base de datos MongoDB para una mejor definic贸n y gesti贸n de la misma y consultar y modificar los datos. En cuanto al sistema de gesti贸n se ha utilizado moongose.
Con el patr贸n de MVC en mente se ha procedido a ordenar las carpetas internas en una aplicaci贸n principal, que enlaza todos los dem谩s componentes y dividir en tres componentes principares, usuarios (users), mensajes(messages), chat(chats). 
Ambas contienen su propia carpeta de controller, model y router, para as铆 ajustarse al patr贸n mencionado.
Arbol de Archivos
````tree

鈹溾攢鈹? components
|       鈹溾攢鈹? message
|       |   鈹溾攢鈹? controller.js
|       |   鈹溾攢鈹? model.js
|       |   鈹斺攢鈹? router.js
|       鈹溾攢鈹? chat
|       |   鈹溾攢鈹? controller.js
|       |   鈹溾攢鈹? model.js
|       |   鈹斺攢鈹? router.js
|       鈹斺攢鈹? user
|           鈹溾攢鈹? controller.js
|           鈹溾攢鈹? model.js
|           鈹斺攢鈹? router.js
鈹溾攢鈹? node_modules
|
鈹溾攢鈹? package-lock.json
|
鈹溾攢鈹? package.json
|
鈹溾攢鈹? app.js
|
鈹溾攢鈹? auth.js
|
鈹溾攢鈹? .env
|
鈹溾攢鈹? .gitignore
|
鈹斺攢鈹? readme.md

````
Existe un Frontend  para su uso que podras encontrarlo en mi repositorio(poner el nombre del Frontend), para poder comprobar que esta aplicaci贸n funciona, requerimos el uso de Postman, un software que permite la interacci贸n con la base de datos para poder simular su uso.



### Instalaci贸n 馃敡

Una vez clonado, lo primero que debes hacer en la carpeta del proyecto es un npm i para poder instalar las distintas tecnologias y Fremeworks.

TECNOLOGIAS USADAS
- JavaScript
- Express
- MongoDB
- Mongoose
- Postman

## Ejecutando las pruebas 鈿欙笍

Para ejecutar las pruebas en postman usaremos la siguientes endpoint.

Para los usuarios.

localhost:(tu direcci贸n)/users

Para los mensajes.

localhost:(tu direcci贸n)/messages

Para los chat

localhost:(tu direcci贸n)/chats

Utilizando los endpoint anteriores podemos ir a帽adiendo diferentes rutas y llamados HTTP ( GET, PUT, POST, DELETE). Acontinuaci贸n os dejo un ejemplo de como usarlo.

Ejemplo GET.
Ejemplo Put.
Ejemplo POST.
Ejemplo DElETE.


## Autores 鉁掞笍

* **Manuel Mendoza** - *Desarrollador*  

## Gratitud 馃巵

Queria dar las gracias al equipo de GeeksHups academy por su apoyo para la realizaci贸n de este proyecto.


