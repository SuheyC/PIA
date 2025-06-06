<template>
  <div class="editar-perfil">
    <!-- Encabezado -->
    <header>
      <div class="logo">
        <img src="@/assets/tecnm.png" alt="Tecnológico" />
        <img src="@/assets/ite.png" alt="ITE" />
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

    <!-- Contenido -->
    <main class="contenido">
      <div class="form-container">
        <h2>Editar Perfil Asesor</h2>
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
        <button @click="irInicioAsesor">Cancelar</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'EditarPerfilAsesor',
  data() {
    return {
      nombreUsuario: localStorage.getItem('nombreUsuario') || "Asesor",
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

      localStorage.setItem('nombreUsuario', this.nombreUsuario);
      localStorage.setItem('correoElectronico', this.correoElectronico);
      localStorage.setItem('numeroEmpleado', this.numeroEmpleado);
      if (this.nuevaContrasena) {
        localStorage.setItem('contrasena', this.nuevaContrasena);
      }
      this.perfilImagen = this.imagenPreview;
      this.$router.push('/asesor/bienvenida');
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
        this.$router.push({ name: 'UsuariosEstudiantes' });  // Redirige a la página de seleccionar tipo de usuario
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
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
/* Mismo estilo que en el archivo anterior */
.editar-perfil {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    min-height: 100vh;
    background: linear-gradient(135deg, #012a53, #7fbfff);
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

.side-menu li {
  margin: 10px;
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
  
  /* Contenido */
  .contenido {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 130px;
    padding-bottom: 50px;
  }
  
  .form-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 86%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.6s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
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
    margin-top: 20px;
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
