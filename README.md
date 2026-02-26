# 🎮 Proyecto Desarrollo de Software - Mattpache Games Store

Aplicación e-commerce desarrollada en React con implementación de caché en backend utilizando Redis.

Tecnologías Utilizadas:

# Frontend
- React
- React Bootstrap
- React Router
- Context API
- Vite

# Backend
- Node.js
- Express
- Redis
- Docker

# Base de datos
- MockAPI (simulación de base remota)

# Arquitectura del Proyecto:

El proyecto implementa una arquitectura con separación de responsabilidades:

Frontend  
↓  
Backend (Express)  
↓  
Redis (Cache)  
↓  
MockAPI (Base de datos simulada)

# Implementación de Caché con Redis:

Se implementó un sistema de caché para optimizar el endpoint:

GET /products

# Funcionamiento:

1. El frontend solicita los productos al backend.
2. El backend verifica si existen en Redis:
   - ✅ Si existen → responde desde CACHE.
   - ❌ Si no existen → consulta MockAPI, guarda en Redis y responde desde DATABASE.
3. La caché tiene una duración de 60 segundos (TTL).

Se simula una base de datos lenta con un delay de 2 segundos para evidenciar la mejora de rendimiento.

# Evidencia de Mejora:

Primera petición:
- Fuente: DATABASE
- Tiempo: ~2000 ms

Segunda petición:
- Fuente: CACHE
- Tiempo: < 50 ms

Reducción aproximada del tiempo de respuesta: 95%+

# Invalidación de Caché:

Se implementó el endpoint:

POST /cache/invalidate

Permite borrar manualmente la caché y forzar nueva consulta a la base.

# 🐳 Redis en Docker

Redis se ejecuta en contenedor Docker:

docker run -d -p 6379:6379 redis

# Cómo ejecutar el proyecto: 

# Backend: 

Parados en la terminal de nuestro proyecto ejecutamos:
cd backend
1) npm install
2) node app.js

Servidor disponible en:
http://localhost:3000

# Frontend: 

Parados en la terminal de nuestro proyecto ejecutamos:
cd backend
1) npm install
2) npm run dev

# El objetivo del proyecto fue:

- Implementar una solución de caché con Redis.
- Analizar la mejora de rendimiento.
- Integrar frontend y backend en arquitectura desacoplada.
- Aplicar conceptos de optimización de APIs.

# Proyecto desarrollado por:  Matias Delozano






