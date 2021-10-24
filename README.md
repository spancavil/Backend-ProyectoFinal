# Backend Proyecto-Final (3era preentrega)

## Persistencia
Mongo Atlas

## Body para Postman
A continuación, se adjuntan los bodies a utilizar en los distintos endpoints.

### Productos
- POST /guardar
```Javascript 
{
    "admin":true,
    "nombre":"un lindo producto",
    "descripcion":"Una linda descripción",
    "codigo":"iasjdijx8374hasdb",
    "imagen":"/path/ficticio/2912u38",
    "precio":200,
    "stock":10
}
```

- PUT /actualizar/:id
```Javascript 
{
    "admin":true,
    "nombre":"un FEO producto",
    "descripcion":"Una FEA descripción",
    "codigo":"iasjdijx8374hasdb",
    "imagen":"/path/ficticio/2912u38",
    "precio":200,
    "stock": 2
}
```

### Carrito
No requiere bodies

## Notas importantes

- Request para usar con POSTMAN:
``

- Para acceder a entorno de desarrollo simplemente escribir por consola `npm run dev`. Para entorno de producción `npm run prod`.
Se toman argumentos a través de yargs y se configura la persistencia, no hay 2 archivos .env, sólo 1.

- Se escriben archivos con loggers con cada warn y con cada error de la app. En el caso que se acceda a información sensible (datos) se escribe un warn de acceso, con el nombre de usuario y id.

- No se utiliza JWT, en su lugar se utiliza sessions cuyo id se almancena en el cliente utilizando passport y express session. Poseen un tiempo de expiración en minutos, que se refresca con cada request. Los datos de dichas sessions se almacenan del lado del server en la nube (Mongo Atlas)

- De todos modos en el código se añadió un ruta `/get-token`, que obtiene un JSON web token en caso de necesitar a futuro.

- Se generaron las vistas correspondientes acorde a cada etapa del flow de la app.
````
Sign-up => Login => Vista de datos/menú del usuario => Carrito => Checkout
````

- Motores de plantillas utilizados: EJS y PUG (este último solamente para renderizar la configuración del server)

