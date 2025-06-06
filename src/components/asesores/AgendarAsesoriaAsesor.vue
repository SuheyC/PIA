<template>
  <div class="agendar-asesoria">
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
        <li><button @click="verUsuarios"><i class="fas fa-users"></i> Estudiantes</button></li>
        <li><button @click="verMensajes"><i class="fas fa-envelope"></i> Mensajes</button></li>
        <li><button @click="verInformes"><i class="fas fa-file-alt"></i> Reportes/Informes</button></li>
        <li><button @click="verNotificaciones"><i class="fas fa-bell"></i> Notificaciones</button></li>
        <li><button @click="verConfiguracion"><i class="fas fa-cog"></i> Configuración</button></li>
        <li><button @click="cerrarSesion"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button></li>
      </ul>
    </nav>

    <!-- Contenido -->
    <main class="contenido">
      <div class="formulario-container">
        <h2>Agendar Nueva Asesoría</h2>
        <form @submit.prevent="agendarAsesoria">
          <label>Tema:</label>
          <input type="text" v-model="tema" required>

          <label>Fecha:</label>
          <input type="date" v-model="fecha" required>

          <label>Hora:</label>
          <input type="time" v-model="hora" required>

          <label>Estudiante:</label>
          <input type="text" v-model="estudiante" required>

          <button type="submit">Agendar</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AgendarAsesoria',
  data() {
    return {
      menuVisible: false,
      perfilImagen: localStorage.getItem('perfilImagen') || null,
      nombreUsuario: localStorage.getItem('nombreUsuario') || 'Asesor',
      tema: '',
      fecha: '',
      hora: '',
      estudiante: ''
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
    agendarAsesoria() {
      // Aquí puedes integrar tu lógica con API o localStorage
      alert(`Asesoría agendada:\nTema: ${this.tema}\nFecha: ${this.fecha}\nHora: ${this.hora}\nEstudiante: ${this.estudiante}`);
      this.tema = '';
      this.fecha = '';
      this.hora = '';
      this.estudiante = '';
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.agendar-asesoria {
  background: linear-gradient(135deg, #5b97c9, #003366);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

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

.contenido {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.formulario-container {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  color: #003366;
  margin-bottom: 20px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button[type="submit"] {
  margin-top: 20px;
  background-color: #5b97c9;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #4076a5;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }

  .logo {
    margin-bottom: 10px;
  }

  .logo-text {
    font-size: 14px;
  }

  .side-menu {
    width: 200px;
    padding-top: 80px;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-imagen i {
    font-size: 40px;
  }

  .perfil-nombre {
    font-size: 0.9rem;
  }

  .contenido {
    padding: 10px;
  }

  .formulario-container {
    padding: 20px;
    width: 90%;
  }

  button[type="submit"] {
    font-size: 14px;
    padding: 10px;
  }

  input {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .logo-text {
    display: none;
  }

  header {
    padding: 10px;
  }

  .menu-toggle {
    top: 10px;
    right: 10px;
    font-size: 20px;
  }

  .formulario-container {
    padding: 15px;
  }

  h2 {
    font-size: 18px;
  }

  label {
    font-size: 14px;
  }
}


</style>
