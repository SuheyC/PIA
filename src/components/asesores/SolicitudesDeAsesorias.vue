<template>
  <div class="solicitudes-asesor">
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
    <nav :class="{ 'side-menu': true, 'menu-visible': menuVisible }">
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
      <div class="contenedor-solicitudes">
        <h2>Solicitudes de Asesoría</h2>
        <div v-if="solicitudes.length">
          <div v-for="(solicitud, index) in solicitudes" :key="index" class="tarjeta-solicitud">
            <p><strong>Tema:</strong> {{ solicitud.tema }}</p>
            <p><strong>Fecha:</strong> {{ solicitud.fecha }}</p>
            <p><strong>Hora:</strong> {{ solicitud.hora }}</p>
            <div class="acciones">
              <button class="aceptar" @click="aceptarSolicitud(index)">Aceptar</button>
              <button class="rechazar" @click="rechazarSolicitud(index)">Rechazar</button>
            </div>
          </div>
        </div>
        <p v-else class="sin-solicitudes">No hay solicitudes pendientes.</p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SolicitudesAsesor',
  data() {
    return {
      menuVisible: false,
      perfilImagen: localStorage.getItem('perfilImagen') || null,
      nombreUsuario: localStorage.getItem('nombreUsuario') || 'Asesor',
      solicitudes: [ ]
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
    aceptarSolicitud(index) {
      alert(`Solicitud de ${this.solicitudes[index].estudiante} aceptada.`);
      this.solicitudes.splice(index, 1);
    },
    rechazarSolicitud(index) {
      alert(`Solicitud de ${this.solicitudes[index].estudiante} rechazada.`);
      this.solicitudes.splice(index, 1);
    },
    async cargarSolicitudes(){
      try {
        const response = await axios.get('http://localhost:3000/solicitudes');
        this.solicitudes = response.data;
      } catch (error) {
        console.error('Error al cargar las asesorías:', error);
      }
    }
  },
  created() {
    this.cargarSolicitudes();
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.solicitudes-asesor {
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
  padding: 20px;
  display: flex;
  justify-content: center;
}

.contenedor-solicitudes {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

h2 {
  text-align: center;
  color: #003366;
}

.tarjeta-solicitud {
  background: #f2f2f2;
  margin: 15px 0;
  padding: 20px;
  border-radius: 8px;
}

.acciones {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.aceptar {
  background-color: #4CAF50;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.rechazar {
  background-color: #f44336;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sin-solicitudes {
  text-align: center;
  font-style: italic;
  color: #666;
}

@media screen and (max-width: 768px) {
  .logo-text {
    font-size: 0px;
  }
  .contenedor-solicitudes {
    padding: 20px;
    margin: 0 10px;
  }
  .acciones {
    flex-direction: column;
  }
  .aceptar, .rechazar {
    width: 90%;
    margin: 5px;
  }
}

</style>
