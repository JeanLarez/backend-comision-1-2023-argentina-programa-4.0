# backend-comision-1-2023-argentina-programa-4.0
Desafíos y ejercicios. Construcción de aplicaciones de servidor (back-end). Creación de servicios web que proveen datos a aplicaciones web front-end, aplicaciones de escritorio como también aplicaciones móviles. Creación y administración de bases de datos SQL y noSQL, e integradas éstas a los servicios web.


# API de Posts con Node.js, Express y Sequelize

Esta es una API de ejemplo que utiliza Node.js, Express y Sequelize para gestionar posts, comentarios, usuarios, etiquetas y categorías. A continuación, encontrarás la documentación para utilizar esta API.

## Modelo - Entidad - Relación

![Modelo Api Post](https://i.imgur.com/71yGKvH.png)

##

![Modelo Api Post](https://i.imgur.com/vFMGmKd.png)

##

![Modelo Api Post](https://i.imgur.com/ULQa9Nx.png)


##

![Modelo Api Post](https://i.imgur.com/sJ5ARb0.png)



## Requisitos Previos

Asegúrate de tener Node.js y MySQL instalados en tu sistema antes de ejecutar la aplicación. Además, crea una base de datos MySQL y configura las credenciales en un archivo `.env` en la raíz del proyecto como se muestra en el siguiente ejemplo.

## Archivo `.env`

### Configuración de la base de datos
```plaintext
DB_HOST=localhost
DB_PORT=3000
DB_NAME=mi_basededatos(en este caso Posts)
DB_USER=mi_usuario(root)
DB_PASSWORD=mi_contraseña_secreta_de_mysql
```
## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/urldelproyecto...
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd posts...
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

La API estará disponible en `http://localhost:3000`.

## Endpoints

A continuación, se detallan los endpoints disponibles y cómo utilizarlos:

### Categorías

#### Listar todas las categorías

- **URL**: `/api/categorias`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "Categoria_id": 1,
        "Nombre_categoria": "Tecnología"
      },
      {
        "Categoria_id": 2,
        "Nombre_categoria": "Deportes"
      }
    ]
    ```

#### Crear una nueva categoría

- **URL**: `/api/categorias`
- **Método**: `POST`
- **Cuerpo de la Petición**:

  ```json
  {
    "Nombre_categoria": "Ciencia"
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 201 Created
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Categoria_id": 3,
      "Nombre_categoria": "Ciencia"
    }
    ```

#### Obtener una categoría por ID

- **URL**: `/api/categoria/:id`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Categoria_id": 1,
      "Nombre_categoria": "Tecnología"
    }
    ```

#### Actualizar una categoría por ID

- **URL**: `/api/categoria/:id`
- **Método**: `PUT`
- **Cuerpo de la Petición**:

  ```json
  {
    "Nombre_categoria": "Tecnología e Innovación"
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Categoria_id": 1,
      "Nombre_categoria": "Tecnología e Innovación"
    }
    ```

#### Eliminar una categoría por ID

- **URL**: `/api/categoria/:id`
- **Método**: `DELETE`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "mensaje": "Categoría eliminada con éxito"
    }
    ```

### Comentarios

#### Listar todos los comentarios

- **URL**: `/api/comentarios`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "Comentario_id": 1,
        "Contenido_comentario": "Excelente artículo",
        "Usuario_ID": 1,
        "Post_ID": 1
      },
      {
        "Comentario_id": 2,
        "Contenido_comentario": "Gracias por compartir",
        "Usuario_ID": 2,
        "Post_ID": 1
      }
    ]
    ```

#### Crear un nuevo comentario

- **URL**: `/api/comentarios`
- **Método**: `POST`
- **Cuerpo de la Petición**:

  ```json
  {
    "Contenido_comentario": "Gran publicación",
    "Usuario_ID": 1,
    "Post_ID": 2
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 201 Created
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Comentario_id": 3,
      "Contenido_comentario": "Gran publicación",
      "Usuario_ID": 1,
      "Post_ID": 2
    }
    ```

#### Obtener un comentario por ID

- **URL**: `/api/comentario/:id`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Comentario_id": 1,
      "Contenido_comentario": "Excelente artículo",
      "Usuario_ID": 1,
      "Post_ID": 1
    }
    ```

#### Actualizar un comentario por ID

- **URL**: `/api/comentario/:id`
- **Método**: `PUT`
- **Cuerpo de la Petición**:

  ```json
  {
    "Contenido_comentario": "Gran artículo"
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Comentario_id": 1,
      "Contenido_comentario": "Gran artículo",
      "Usuario_ID": 1,
      "Post_ID": 1
    }
    ```

#### Eliminar un comentario por ID

- **URL**: `/api/comentario/:id`
- **Método**: `DELETE`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "mensaje": "Comentario eliminado con éxito"
    }
    ```

### Etiquetas

#### Listar todas las etiquetas

- **URL**: `/api/etiquetas`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "Etiqueta_id": 1,
        "Nombre_etiqueta": "Node.js"
      },
      {
        "Etiqueta_id": 2,
        "Nombre_etiqueta": "Express"
      }
    ]
    ```

#### Crear una nueva etiqueta

- **URL**: `/api/etiquetas`
- **Método**: `POST`
- **Cuerpo de la Petición**:

  ```json
  {
    "Nombre_etiqueta": "Sequelize"
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 201 Created
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Etiqueta_id": 3,
      "Nombre_etiqueta": "Sequelize"
    }
    ```

#### Obtener una etiqueta por ID

- **URL**: `/api/etiqueta/:id`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Etiqueta_id": 1,
      "Nombre_etiqueta": "Node.js"
    }
    ```

#### Actualizar una etiqueta por ID

- **URL**: `/api/etiqueta/:id`
- **Método**: `PUT`
- **Cuerpo de la Petición**:

  ```json
  {
    "Nombre_etiqueta": "Node.js y Express"
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Etiqueta_id": 1,
      "Nombre_etiqueta": "Node.js y Express"
    }
    ```

#### Eliminar una etiqueta por ID

- **URL**: `/api/etiqueta/:id`
- **Método**: `DELETE`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "mensaje": "Etiqueta eliminada con éxito"
    }
    ```


## Tabla `Post_etiquetas`

La tabla `Post_etiquetas` se utiliza para mantener un registro de las relaciones entre las publicaciones y las etiquetas. Esta tabla es esencial para implementar una relación de muchos a muchos entre las publicaciones y las etiquetas, ya que permite asociar múltiples etiquetas con múltiples publicaciones.

### Esquema de la tabla

| Campo         | Tipo   | Descripción                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| `id`          | Entero | Identificador único de la relación.                           |
| `post_id`     | Entero | Clave foránea que hace referencia a la tabla `Publicaciones`. |
| `etiqueta_id` | Entero | Clave foránea que hace referencia a la tabla `Etiquetas`.     |

### Relaciones

- `post_id`: Esta columna se relaciona con la tabla `Publicaciones` y representa la publicación a la que se asocia una etiqueta.
- `etiqueta_id`: Esta columna se relaciona con la tabla `Etiquetas` y representa la etiqueta asociada a una publicación.

### Ejemplo de uso

Supongamos que tenemos las siguientes entradas en la tabla `Post_etiquetas`:

| id  | post_id | etiqueta_id |
| --- | ------- | ----------- |
| 1   | 101     | 5           |
| 2   | 102     | 6           |
| 3   | 103     | 5           |

Esto indica que:
- La publicación con `id` 101 está asociada a la etiqueta con `id` 5.
- La publicación con `id` 102 está asociada a la etiqueta con `id` 6.
- La publicación con `id` 103 está asociada a la etiqueta con `id` 5.

Esta relación permite etiquetar múltiples publicaciones con las mismas etiquetas y realizar consultas relacionadas con las etiquetas asociadas a una publicación específica o las publicaciones asociadas a una etiqueta.


### Endpoints de Post_etiquetas

Aquí se describen los endpoints relacionados con esta funcionalidad.

#### Crear un nuevo registro de Post_Etiquetas

- **URL**: `/api/posts_etiquetas`
- **Método**: `POST`
- **Cuerpo de la Petición**:

  ```json
  {
    "Post_ID": 1,
    "Etiqueta_ID": 2
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Post_etiqueta_ID": 1,
      "Post_ID": 1,
      "Etiqueta_ID": 2
    }
    ```

#### Obtener todos los registros de Post_Etiquetas

- **URL**: `/api/posts_etiquetas`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "Post_etiqueta_ID": 1,
        "Post_ID": 1,
        "Etiqueta_ID": 2
      },
      {
        "Post_etiqueta_ID": 2,
        "Post_ID": 2,
        "Etiqueta_ID": 1
      }
    ]
    ```

#### Actualizar un registro de Post_Etiquetas por ID

- **URL**: `/api/post_etiqueta/:id`
- **Método**: `PUT`
- **Cuerpo de la Petición**:

  ```json
  {
    "Post_ID": 3,
    "Etiqueta_ID": 4
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Post_etiqueta_ID": 1,
      "Post_ID": 3,
      "Etiqueta_ID": 4
    }
    ```

#### Eliminar un registro de Post_Etiquetas por ID

- **URL**: `/api/post_etiqueta/:id`
- **Método**: `DELETE`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "message": "Registro de Post_Etiquetas eliminado exitosamente"
    }
    ```

### Usuarios

#### Listar todos los usuarios

- **URL**: `/api/usuarios`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "Usuario_id": 1,
        "Nombre_usuario": "usuario1",
        "Correo_electronico": "usuario1@example.com"
      },
      {
        "Usuario_id": 2,
        "Nombre_usuario": "usuario2",
        "Correo_electronico": "usuario2@example.com"
      }
    ]
    ```

#### Crear un nuevo usuario

- **URL**: `/api/usuarios`
- **Método**: `POST`
- **Cuerpo de la Petición**:

  ```json
  {
    "Nombre_usuario": "usuario3",
    "Correo_electronico": "usuario3@example.com"
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 201 Created
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Usuario_id": 3,
      "Nombre_usuario": "usuario3",
      "Correo_electronico": "usuario3@example.com"
    }
    ```

#### Obtener un usuario por ID

- **URL**: `/api/usuario/:id`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Usuario_id": 1,
      "Nombre_usuario": "usuario1",
      "Correo_electronico": "usuario1@example.com"
    }
    ```

#### Actualizar un usuario por ID

- **URL**: `/api/usuario/:id`
- **Método**: `PUT`
- **Cuerpo de la Petición**:

  ```json
  {
    "Nombre_usuario": "nuevo_nombre_usuario"
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Usuario_id": 1,
      "Nombre_usuario": "nuevo_nombre_usuario",
      "Correo_electronico": "usuario1@example.com"
    }
    ```

#### Eliminar un usuario por ID

- **URL**: `/api/usuario/:id`
- **Método**: `DELETE`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "mensaje": "Usuario eliminado con éxito"
    }
    ```

#### Obtener usuarios con sus comentarios

- **URL**: `/api/usuarios/comentarios`
- **Método**: `GET`
- **Respuesta Exitosa (Código 200)**:

  ```json
  [
    {
      "Usuario_ID": 1,
      "Nombre_usuario": "Usuario1",
      "Correo_electronico": "usuario1@example.com",
      "Comentarios": [
        {
          "Contenido_comentario": "Comentario 1"
        },
        {
          "Contenido_comentario": "Comentario 2"
        }
      ]
    },
    {
      "Usuario_ID": 2,
      "Nombre_usuario": "Usuario2",
      "Correo_electronico": "usuario2@example.com",
      "Comentarios": [
        {
          "Contenido_comentario": "Comentario 3"
        },
        {
          "Contenido_comentario": "Comentario 4"
        }
      ]
    }
  ]
  ```

#### Obtener comentarios de un usuario por su ID

- **URL**: `/api/usuario/comentarios/:id`
- **Método**: `GET`
- **Respuesta Exitosa (Código 200)**:

  ```json
  [
    {
      "Contenido_comentario": "Comentario 1"
    },
    {
      "Contenido_comentario": "Comentario 2"
    }
  ]
  ```

### Posts

#### Listar todos los posts

- **URL**: `/api/posts`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "Post_id": 1,
        "Titulo_post": "Introducción a Node.js",
        "Contenido_post": "Este es un post de introducción a Node.js.",
        "Usuario_ID": 1
      },
      {
        "Post_id": 2,
        "Titulo_post": "Creando una API con Express",
        "Contenido_post": "En este post, aprenderemos a crear una API con Express.",
        "Usuario_ID": 2
      }
    ]
    ```

#### Crear un nuevo post

- **URL**: `/api/posts`
- **Método**: `POST`
- **Cuerpo de la Petición**:

  ```json
  {
    "Titulo_post": "Nuevo Post",
    "Contenido_post": "Este es un nuevo post.",
    "Usuario_ID": 1
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 201 Created
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Post_id": 3,
      "Titulo_post": "Nuevo Post",
      "Contenido_post": "Este es un nuevo post.",
      "Usuario_ID": 1
    }
    ```

#### Obtener un post por ID

- **URL**: `/api/post/:id`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Post_id": 1,
      "Titulo_post": "Introducción a Node.js",
      "Contenido_post": "Este es un post de introducción a Node.js.",
      "Usuario_ID": 1
    }
    ```

#### Actualizar un post por ID

- **URL**: `/api/post/:id`
- **Método**: `PUT`
- **Cuerpo de la Petición**:

  ```json
  {
    "Titulo_post": "Nuevo Título",
    "Contenido_post": "Este es un post actualizado."
  }
  ```

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "Post_id": 1,
      "Titulo_post": "Nuevo Título",
      "Contenido_post": "Este es un post actualizado.",
      "Usuario_ID": 1
    }
    ```

#### Eliminar un post por ID

- **URL**: `/api/post/:id`
- **Método**: `DELETE`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    {
      "mensaje": "Post eliminado con éxito"
    }
    ```

### Relaciones

#### Obtener todos los comentarios de un post

- **URL**: `/api/post/:id/comentarios`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "Comentario_id": 1,
        "Contenido_comentario": "Excelente artículo",
        "Usuario_ID": 1,
        "Post_ID": 1
      },
      {
        "Comentario_id": 2,
        "Contenido_comentario": "Gracias por compartir",
        "Usuario_ID": 2,
        "Post_ID": 1
      }
    ]
    ```

#### Obtener todos los posts de un usuario

- **URL**: `/api/usuario/:id/posts`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
      {
        "Post_id": 1,
        "Titulo_post": "Introducción a Node.js",
        "Contenido_post": "Este es un post de introducción a Node.js.",
        "Usuario_ID": 1
      },
      {
        "Post_id": 3,
        "Titulo_post": "Nuevo Post",
        "Contenido_post": "Este es un nuevo post.",
        "Usuario_ID": 1
      }
    ]
    ```

#### Obtener etiquetas de una publicación

- **URL**: `/api/post/:id/etiquetas`
- **Método**: `GET`
- **Respuesta Exitosa (Código 200)**:

  ```json
  [
    {
      "Nombre_etiqueta": "Tecnología"
    },
    {
      "Nombre_etiqueta": "Programación"
    }
  ]
  ```

### Errores

La API devuelve mensajes de error con los códigos de estado correspondientes en caso de que ocurran problemas. Asegúrate de manejar adecuadamente estos errores en tu aplicación cliente.

## Conclusiones

Esta es una API de ejemplo que utiliza Node.js, Express y Sequelize para gestionar posts, comentarios, usuarios, etiquetas y categorías. Puedes utilizar esta API como base para desarrollar tu propia aplicación web o móvil. Asegúrate de personalizarla según tus necesidades específicas y de implementar la seguridad y la autorización adecuadas para proteger tus recursos.
