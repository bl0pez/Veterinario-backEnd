[Url fronend](https://github.com/bl0pez/Veterinario-backEnd)

## Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
npm i
```
3. Clonar el archivo __.example.env__ y renombrar la copia a __.env__ 
4. llenar las variales de entorno en el ```.env```

#

## Endpoints de la API

### Autenticación 
- URL base: http://localhost:3000/api/veterinario
- POST /login (Iniciar sesión)
    - Body:
        ```
        {
            "email": ""
            "password": ""
        }
        ```

- POST /register (Registrar un nuevo usuario)
    - Body:
        ```
        {
            "name": ""
            "email": ""
            "password": ""
        }
        ```
- GET /confirm/:token (Confirmar cuenta)

- POST /recovery-password (Recuperar contraseña)
    - Body:
        ```
        {
            "email": ""
        }
        ```
- GET /recovery-password/:token (Verificar token de recuperación de contraseña)

- POST /new-password/:token (Cambiar contraseña)
    - Body:
        ```
        {
            "password": ""
        }
        ```
### Rutas protegidas
- URL base: http://localhost:3000/api/veterinario
- GET /profile (Obtener información del usuario)
    - Headers:
        ```
        {
            "token": ""
        }
        ```
- PUT /profile/:id (Actualizar información del usuario)
    - Headers:
        ```
        {
            "token": ""
        }
        ```
    - Body:
        ```
        {
            "name": "",
            "email": "",
            "phone": "",
            "website": ""
        }
        ```
- PUT /password (Actualizar contraseña)
    - Headers:
        ```
        {
            "token": ""
        }
        ```
    - Body:
        ```
        {
            "password": "",
            "newPassword": ""
        }
        ```
#

### Pacientes
- URL base: http://localhost:3000/api/paciente

- POST "/" (Crear un nuevo paciente)
    - Headers:
        ```
        {
            "token": ""
        }
        ```
    - Body:
        ```
        {
            "name": "",
            "owner": "",
            "email": "",
            "data": "",
            "symptom": "",
        }
        ```
- GET "/" (Obtener todos los pacientes)

- GET "/:id" (Obtener un paciente)
- PUT "/:id" (Actualizar un paciente)
    - Headers:
        ```
        {
            "token": ""
        }
        ```
    - Body:
        ```
        {
            "name": "",
            "owner": "",
            "email": "",
            "data": "",
            "symptom": "",
        }
        ```
- DELETE "/:id" (Eliminar un paciente)



<hr>

<img src="https://raw.githubusercontent.com/bl0pez/Veterinario-backEnd/master/preview.png" alt="1" width="100%"/>