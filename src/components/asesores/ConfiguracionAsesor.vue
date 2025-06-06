<template>
    <div class="configuracion">
      <div class="background-overlay"></div>
  
      <div class="card-container">
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
        <li><button @click="irInicioAsesor"><i class="fa fa-home"></i> Inicio</button></li>
        <li><button @click="verSolicitudes"><i class="fas fa-clipboard-check"></i> Solicitudes</button></li>
        <li><button @click="verAsesorias"><i class="fa fa-book"></i> Mis asesorías</button></li>
        <li><button @click="verUsuarios"><i class="fas fa-users"></i> estudiantes</button></li>
        <li><button @click="verMensajes"><i class="fas fa-envelope"></i> Mensajes</button></li>
        <li><button @click="verInformes"><i class="fas fa-file-alt"></i> Reportes/Informes</button></li>
        <li><button @click="verNotificaciones"><i class="fas fa-bell"></i> Notificaciones</button></li>
        <li><button @click="verConfiguracion"><i class="fas fa-cog"></i> Configuración</button></li>
        <li><button @click="cerrarSesion"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button></li>
      </ul>
     
        </nav>
  
        <!-- Sección de configuración -->
        <main class="contenido">
          <div class="configuracion-container">
            <h1>Configuración de Cuenta</h1>
            <form @submit.prevent="guardarConfiguracion" class="form-configuracion">
              <div class="form-group">
                <label for="nombreUsuario">Nombre de Usuario:</label>
                <input type="text" id="nombreUsuario" v-model="nombreUsuario" required />
              </div>
              <div class="form-group">
                <label for="correoElectronico">Correo Electrónico:</label>
                <input type="email" id="correoElectronico" v-model="correoElectronico" />
              </div>
              <div class="form-group">
                <label for="perfilImagen">Imagen de Perfil:</label>
                <input type="file" id="perfilImagen" @change="cambiarImagenPerfil" />
              </div>
              <div class="form-group">
                <label for="nuevaContrasena">Nueva Contraseña:</label>
                <input type="password" id="nuevaContrasena" v-model="nuevaContrasena" />
              </div>
              <div class="form-group">
                <label for="confirmarContrasena">Confirmar Contraseña:</label>
                <input type="password" id="confirmarContrasena" v-model="confirmarContrasena" />
              </div>
              <div class="form-actions">
                <button type="submit" class="guardar-btn">Guardar Cambios</button>
                <button type="button" @click="resetearFormulario" class="cancelar-btn">Cancelar</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConfiguracionEstudiante',
    data() {
      return {
        menuVisible: false,
        perfilImagen: localStorage.getItem('perfilImagen') || null,
        nombreUsuario: localStorage.getItem('nombreUsuario') || "Estudiante",
        correoElectronico: localStorage.getItem('correoElectronico') || "estudiante@correo.com",
        nuevaContrasena: '',
        confirmarContrasena: ''
      };
    },
    methods: {
      toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    irInicioAsesor() {
      this.$router.push({ name: 'bienvenida-asesor' });
    },
    editarPerfil() {
      this.$router.push({ name: 'perfil-asesor' });
    },
    verSolicitudes() {
      this.$router.push({ name: 'SolicitudesAsesor' });
    },
    verAsesorias() {
      this.$router.push({ name: 'MisAsesoriasAsesor' });
    },
    verUsuarios() {
      this.$router.push({ name: 'UsuariosEstudiantes' });
    },
    verMensajes() {
      this.$router.push({ name: 'MensajeAsesor' });
    },
    verInformes() {
      this.$router.push({ name: 'InformesAsesor' });
    },
    verNotificaciones() {
      this.$router.push({ name: 'NotificacionesAsesor' });
    },
    verConfiguracion() {
      this.$router.push({ name: 'ConfiguracionAsesor' });
    },
    cerrarSesion() {
      this.$router.push({ name: 'cerrar-sesionAsesor' });
    },
      cambiarImagenPerfil(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            this.perfilImagen = reader.result;
            localStorage.setItem('perfilImagen', this.perfilImagen);
          };
          reader.readAsDataURL(file);
        }
      },
      guardarConfiguracion() {
        if (this.nuevaContrasena && this.nuevaContrasena !== this.confirmarContrasena) {
          alert('Las contraseñas no coinciden.');
          return;
        }
        localStorage.setItem('nombreUsuario', this.nombreUsuario);
        localStorage.setItem('correoElectronico', this.correoElectronico);
        if (this.nuevaContrasena) {
          localStorage.setItem('nuevaContrasena', this.nuevaContrasena);
        }
        alert('Configuración guardada correctamente');
      },

  resetearFormulario() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || "Estudiante";
    this.correoElectronico = localStorage.getItem('correoElectronico') || "estudiante@correo.com";
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
    this.$router.push({ name: 'bienvenida-asesor' }); // Redirige a la página de bienvenida
}

    }
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  /* Fondo */
  .configuracion {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(135deg, #5b97c9, #003366);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 100px;
  }
  
  /* Card de configuración */
  @keyframes aparecerDesdeAbajo {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.contenido {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 16px;
  width: 80%;
  max-width: 700px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  transition: background-color 0.3s ease;
  animation: aparecerDesdeAbajo 0.6s ease-out;
}

  
  
  
  
  /* Header */
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
  padding-left: 10px;
  font-size: 18px;
  color: #003366;
}

.menu-toggle {
  display: block;
  padding: 10px;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1100;
  font-size: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
  width: 40px;
}

.menu-toggle:hover {
  background-color: aliceblue;
}

.side-menu {
  position: fixed;
  top: 40px;
  left: -250px;
  width: 250px;
  height: 100%;
  background-color: #003366;
  color: white;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  transition: left 0.3s;
}

.menu-visible {
  left: 0;
}

.side-menu li {
  margin: 8px;
}

.side-menu button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: none;
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 5px;
  width: 100%;
  text-align: left;
  transition: background-color 0.3s ease;
}

.side-menu button:hover {
  background-color: #5b97c9;
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

.perfil-imagen i {
  font-size: 50px;
  color: #003366;
}

.perfil-nombre {
  font-size: 1rem;
  font-weight: bold;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  margin: 10px 0;
}

nav ul button {
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  color: white;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
}

nav ul button i {
  margin-right: 10px;
}

nav ul button:hover {
  background: rgba(255, 255, 255, 0.2);
}
  
  /* Estilos para el formulario */
  .form-configuracion {
    width: 100%;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  form input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }
  
  form input:focus {
    border-color: #003366;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .guardar-btn,
  .cancelar-btn {
    padding: 10px 20px;
    background-color: #003366;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .guardar-btn:hover,
  .cancelar-btn:hover {
    background-color: #5b97c9;
  }

  @media (max-width: 768px) {
  .logo-text {
    display: none;
  }

  .logo img {
    height: 40px;
  }

  .menu-toggle {
    top: 15px;
    right: 15px;
    font-size: 22px;
    padding: 8px;
  }

  .side-menu {
    top: 0;
    left: -100%;
    width: 70%;
    height: 100vh;
    padding-top: 100px;
    z-index: 1000;
    transition: left 0.3s ease;
  }

  .menu-visible {
    left: 0;
  }

  .side-menu button {
    font-size: 1rem;
    padding: 12px 20px;
  }

  .perfil-container {
    padding: 10px;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-imagen i {
    font-size: 40px;
  }

  .perfil-nombre {
    font-size: 0.95rem;
  }

  .contenido {
    width: 90%;
    padding: 20px;
    margin-top: 20px;
    margin: auto;
    border-radius: 12px;
  }

  .form-actions {
    flex-direction: column;
    gap: 10px;
  }

  .guardar-btn,
  .cancelar-btn {
    width: 100%;
  }

  form input {
    font-size: 1rem;
    width: 90%;
  }

  h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  body {
    overflow-x: hidden;
  }


  .card-container {
    width: 85%;
    padding: 0;
  }
}


  </style>
  