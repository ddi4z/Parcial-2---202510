# ISIS3710 - Parcial 2

**Daniel Felipe Díaz Moreno - 202210773**

## Configuración

Para ejecutar el código, debe crear un archivo `.env` basado en el archivo `env.template`. Esto permitirá la conexión con la base de datos.

Como alternativa, puede utilizar el siguiente comando para levantar una instancia de PostgreSQL mediante Docker:

```bash
docker-compose up -d
```

## Pruebas unitarias

Para ejecutar las pruebas unitarias, utilice el siguiente comando:

```bash
npm run test
```

## Pruebas con Postman

El conjunto de pruebas en Postman incluye casos positivos y negativos para los distintos endpoints. Puede ejecutarlas para visualizar ejemplos de respuestas y los códigos de error correspondientes.