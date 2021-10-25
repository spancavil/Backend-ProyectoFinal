# Backend Proyecto-Final (3era preentrega)

## Persistencia
Mongo Atlas

## Observaciones

- No se utiliza JWT, en su lugar se utiliza sessions cuyo id se almancena en el cliente utilizando passport y express session. Poseen un tiempo de expiración en minutos, que se refresca con cada request. Los datos de dichas sessions se almacenan del lado del server en la nube (Mongo Atlas).

- Heroku deploy: https://backend-entrega-final-coder.herokuapp.com/ (nota: facebook no está accesible como autenticación por requiere instalar ACM para el manejo de certificados SSL, que es pago)

- Listado de requests con sus endpoints para usar con POSTMAN:
https://www.getpostman.com/collections/1740382bdd3779037cba

- Hay vistas que son únicamente accesibles desde el browser (porque requieren autenticación). Las que son accesibles a través de POSTMAN están especificadas en el JSON adjunto previamente.

- Para acceder a entorno de desarrollo simplemente escribir por consola `npm run dev`. Para entorno de producción `npm run prod`.
Se toman argumentos a través de yargs y se configura la persistencia, no hay 2 archivos .env, sólo 1.

- Se emplea el patrón factory para obtener persistencias.

- Se escriben archivos con loggers con cada warn y con cada error de la app. En el caso que se acceda a información sensible (datos) se escribe un warn de acceso, con el nombre de usuario y id.


- Se generaron las vistas correspondientes acorde a cada etapa del flow de la app.
````
Sign-up => Login => Vista de datos/menú del usuario => Carrito => Checkout => View orders
````

- Motores de plantillas utilizados: EJS y PUG, este último solamente para renderizar la configuración del server y en caso de haber un error como requisito de la consigna.

- Se añadió un ruta `/get-token`, que obtiene un JSON web token en caso de necesitar a futuro.

