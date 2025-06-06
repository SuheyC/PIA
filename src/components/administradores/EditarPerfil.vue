<template>
    <div class="editar-perfil">
      <!-- Encabezado -->
      <header>
        <div class="logo">
          <img src="@/assets/tecnm.png" alt="Tecnológico">
          <img src="@/assets/ite.png" alt="ITE">
          <span class="logo-text">TECNOLÓGICO NACIONAL DE MÉXICO</span>

        </div>
        <button class="menu-toggle" @click="toggleMenu">☰</button>
      </header>
  
      <!-- Menú lateral -->
      <nav :class="{'side-menu': true, 'menu-visible': menuVisible}">
        <div class="perfil-container" @click="editarPerfil">
          <div class="perfil-imagen">
            <img v-if="perfilImagen" :src="perfilImagen" alt="Foto de Perfil" />
            <i v-else class="fa fa-user-circle"></i>
          </div>
          <p class="perfil-nombre">{{ nombreUsuario }}</p>
        </div>
  
        <ul>
          <li><button @click="irInicioAdmin"><i class="fa fa-home"></i> Inicio</button></li>
          <li><button @click="cerrarSesion"><i class="fa fa-sign-out-alt"></i> Cerrar sesión</button></li>
          <li><button @click="verUsuarios"><i class="fa fa-users"></i> Usuarios</button></li>
          <li><button @click="verSolicitudes"><i class="fa fa-file-alt"></i> Solicitudes</button></li>
          <li><button @click="verInformes"><i class="fa fa-chart-line"></i> Informes</button></li>
          <li><button @click="verNotificaciones"><i class="fa fa-bell"></i> Notificaciones</button></li>
          <li><button @click="verConfiguracion"><i class="fa fa-cogs"></i> Configuración</button></li>
        </ul>
      </nav>
  
      <!-- Contenido -->
      <main class="contenido">
        <div class="form-container">
          <h2>Editar Perfil</h2>
          <div class="perfil-imagen">
            <img v-if="imagenPreview" :src="imagenPreview" alt="Imagen de perfil" />
            <i v-else class="fa fa-user-circle"></i>
          </div>
  
          <input type="file" @change="cargarImagen" />
          <button @click="eliminarImagen">Eliminar Foto</button>
          <input type="text" v-model="nombreUsuario" placeholder="Nombre de usuario" />
          <input type="email" v-model="correoElectronico" placeholder="Correo electrónico" />
          <input type="text" v-model="numeroEmpleado" placeholder="Número de empleado" />
          <input type="password" v-model="nuevaContrasena" placeholder="Nueva contraseña" />
          <input type="password" v-model="confirmarContrasena" placeholder="Confirmar contraseña" />
  
          <button @click="guardarCambios">Guardar Cambios</button>
          <button @click="$router.push('/admin/bienvenida')">Cancelar</button>
        </div>
      </main>
    </div>
</template>
  
<script>
export default {
  name: 'EditarPerfil',
  data() {
    return {
      nombreUsuario: localStorage.getItem('nombreUsuario') || "Usuario",
      correoElectronico: localStorage.getItem('correoElectronico') || "",
      numeroEmpleado: localStorage.getItem('numeroEmpleado') || "",
      imagenPreview: localStorage.getItem('perfilImagen') || null,
      perfilImagen: localStorage.getItem('perfilImagen') || null,
      nuevaContrasena: "",
      confirmarContrasena: "",
      menuVisible: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    cargarImagen(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenPreview = reader.result;
          localStorage.setItem('perfilImagen', reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    eliminarImagen() {
      this.imagenPreview = null;
      localStorage.removeItem('perfilImagen');
    },
    guardarCambios() {
      if (this.nuevaContrasena !== this.confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      // Guardamos los datos en localStorage
      localStorage.setItem('nombreUsuario', this.nombreUsuario);
      localStorage.setItem('correoElectronico', this.correoElectronico);
      localStorage.setItem('numeroEmpleado', this.numeroEmpleado);

      // Si se ingresó una nueva contraseña, la guardamos.
      if (this.nuevaContrasena) {
        localStorage.setItem('contrasena', this.nuevaContrasena);
      }

      // Actualizamos la imagen de perfil
      this.perfilImagen = this.imagenPreview;

      // Cambiar la ruta a /admin/bienvenida sin redirigir a la página principal
      this.$router.push('/admin/bienvenida');
    },
    editarPerfil() {
        this.$router.push({ name: 'perfil-admin' });  // Redirige a la página de editar perfil
      },
      irInicioAdmin() {
        this.$router.push({ name: 'bienvenida-admin' });
      },
      cerrarSesion() {
        this.$router.push({ name: 'cerrar-sesion' });  // Redirige a la página de cerrar sesión
      },
      verUsuarios() {
        this.$router.push({ name: 'seleccionar-usuario' });  // Redirige a la página de seleccionar tipo de usuario
      },
      verSolicitudes() {

        this.$router.push({ name: 'SolicitudesAdmin' });  // Redirige a la página de solicitudes (ajustar si es necesario)
      },
      verInformes() {
        this.$router.push({ name: 'AdminInformes' });  // Redirige a la página de informes (ajustar si es necesario)
      },
      verNotificaciones() {
        this.$router.push({ name: 'NotificacionAdmin' });  // Redirige a la página de notificaciones (ajustar si es necesario)
      },
      verConfiguracion() {
        this.$router.push({ name: 'configuracionAdmin' });  // Redirige a la página de configuración (ajustar si es necesario)

      }
  }
};
</script>

  

  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  .editar-perfil {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    min-height: 100vh;
    background-color: #5b97c9;
  }
  
  /* Encabezado */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #fdfcfc;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  
  .logo img {
    height: 50px;
    margin-right: 10px;
  }
  
  .logo-text {
    font-size: 1.5rem;
    color: #003366;
  }
  
  .menu-toggle {
    display: block;
    padding: 10px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    font-size: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

    border: none;
    cursor: pointer;
  }
  
  .menu-toggle:hover {
    background-color: aliceblue;
  }
  
  /* Menú lateral */
  .side-menu {
    position: fixed;
    top: 70px;
    left: -250px;
    width: 250px;
    height: 100%;
    background-color: #003366;
    color: white;
    display: flex;
    flex-direction: column;
    padding-top: 40px;
    transition: left 0.3s;
  }
  
  .menu-visible {
    left: 0;
  }
  
  ul {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}
  
  .side-menu button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: none;
    color: white;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 10px;
    width: 90%;
    text-align: left;
    transition: background-color 0.3s ease;
  }
  
  .side-menu button i {
  margin-right: 15px; /* Agrega espacio entre el icono y el texto */
}

  .side-menu button:hover {
    background-color: #5b97c9;

  }

  .side-menu li {
    margin: 15px 0;
  }
  
  .perfil-container {
    text-align: center;
    padding: 15px;
    cursor: pointer;
  }
  
  .perfil-imagen {
    width: 70px;
    height: 70px;
    background-color: white;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid white;
    margin: 0 auto 10px;
  }
  
  .perfil-imagen img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .perfil-imagen i {
    font-size: 50px;
    color: #003366;
  }
  
  .perfil-nombre {
    font-size: 1rem;
    font-weight: bold;
  }
  
  /* Contenido */
  .contenido {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 100px;
  }
  
  .form-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  input {
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }
  
  button {
    padding: 10px;
    margin: 5px;
    border: none;
    background-color: #003366;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #5b97c9;
  }

  @media (max-width: 768px) {
  .logo-text {
    display: none;
  }

  .contenido {
    padding-top: 120px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .form-container {
    padding: 15px;
  }

  .menu-toggle {
    font-size: 20px;
    top: 15px;
    right: 15px;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-nombre {
    font-size: 0.9rem;
  }

  .side-menu {
    width: 200px;
  }

  .side-menu button {
    font-size: 1rem;
  }

  input {
    font-size: 1rem;
    padding: 10px;
    width: 85%;
  }

}


  </style>
  