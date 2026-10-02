cristian alexis Jimenez
Sebastian Granda Cordoba 
Manuel Alejandro Villarreal

# Plataforma LowCost de reservas de vuelos

Proyecto académico que demuestra el patrón de diseño Decorator mediante una plataforma sencilla para seleccionar vuelos y agregar servicios opcionales.

## Requisitos

- Node.js 18 o superior
- npm (se instala junto con Node.js)

## Instalación y ejecución en Windows

Descomprime el ZIP. Abre una terminal nueva en Visual Studio Code y entra en la carpeta que contiene `package.json`:

```powershell
cd .\Plataforma_LowCost_Decorator
npm install
npm start
```

Si abriste la terminal directamente dentro de `Plataforma_LowCost_Decorator`, ejecuta solo:

```powershell
npm install
npm start
```

Cuando aparezca `LowCost running at http://localhost:3000`, abre esa dirección en el navegador. Deja la terminal abierta mientras uses la plataforma; para detener el servidor, presiona `Ctrl+C`.

> Ejecuta los comandos desde la carpeta del proyecto donde está `package.json`, no desde `backend` ni desde `frontend`.

## Pruebas

```powershell
npm test
```

## Funciones

- Selección de vuelos
- Tarifa básica
- Equipaje de bodega de 23 kg
- Equipaje de cabina
- Selección de asiento
- Embarque prioritario
- Cálculo dinámico del precio
- Validación del precio en el servidor
- Confirmación de reserva
- API REST
- Handler preparado para AWS Lambda

## Patrón Decorator

`BasicTicket` es el componente base. Los servicios opcionales envuelven el boleto y agregan su propio precio y descripción:

`BasicTicket -> CheckedBaggageDecorator -> CarryOnDecorator -> SeatDecorator`

## Arquitectura cloud

El frontend estático puede alojarse en Amazon S3. API Gateway puede dirigir solicitudes a la lógica de reservas en AWS Lambda. El servidor Express local permite ejecutar y demostrar el proyecto sin credenciales de AWS.
