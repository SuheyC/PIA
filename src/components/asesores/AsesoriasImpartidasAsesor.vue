<template>
  <div class="inicio-estudiante">
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
        <li><button @click="verUsuarios"><i class="fas fa-users"></i> Estudiantes</button></li>
        <li><button @click="verMensajes"><i class="fas fa-envelope"></i> Mensajes</button></li>
        <li><button @click="verInformes"><i class="fas fa-file-alt"></i> Reportes/Informes</button></li>
        <li><button @click="verNotificaciones"><i class="fas fa-bell"></i> Notificaciones</button></li>
        <li><button @click="verConfiguracion"><i class="fas fa-cog"></i> Configuración</button></li>
        <li><button @click="cerrarSesion"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button></li>
      </ul>
    </nav>

    <!-- Contenido principal -->
    <main class="contenido">
      <div class="asesorias-container">
        <h1>Asesorías Impartidas</h1>
        <div v-if="asesoriasOrdenadas.length > 0" class="lista-asesorias">
          <div v-for="asesoria in asesoriasOrdenadas" :key="asesoria.id" class="asesoria-card">
            <div class="asesoria-info">
              <h2>{{ asesoria.materia }}</h2>
              <p><strong>Estudiante:</strong> {{ asesoria.estudiante }}</p>
              <p><strong>Fecha:</strong> {{ formatearFecha(asesoria.fecha) }}</p>
              <p><strong>Hora:</strong> {{ asesoria.hora }}</p>
              <p><strong>Estado:</strong> {{ asesoria.estado }}</p>
            </div>
            <div class="asesoria-actions">
              <button @click="calificarAsesoria(asesoria.id)" class="btn-calificar">
                <i class="fa fa-star"></i> Calificar
              </button>
            </div>
          </div>
        </div>
        <div v-else class="sin-asesorias">
          <p>No has impartido asesorías aún.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AsesoriasImpartidasAsesor',
  data() {
    return {
      menuVisible: false,
      perfilImagen: localStorage.getItem('perfilImagen') || null,
      nombreUsuario: localStorage.getItem('nombreUsuario') || "Asesor",
      asesorias: [
        { id: 1, materia: "Física II", estudiante: "Carlos Gómez", fecha: "2025-05-04", hora: "11:00 AM", estado: "Concluida" },
        { id: 2, materia: "Algoritmos", estudiante: "María López", fecha: "2025-05-07", hora: "9:00 AM", estado: "Pendiente de Calificar" },
        { id: 3, materia: "Cálculo Diferencial", estudiante: "said", fecha: "2025-05-10", hora: "1:00 PM", estado: "Concluida" }
      ]
    };
  },
  computed: {
    asesoriasOrdenadas() {
      return this.asesorias.slice().sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }
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
    formatearFecha(fecha) {
      const d = new Date(fecha);
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const anio = d.getFullYear();
      return `${dia}/${mes}/${anio}`;
    },
    calificarAsesoria(id) {
      this.$router.push({ name: 'CalificarAsesoriaAsesor', params: { id } });
    }
  }
};
</script>

<style scoped>

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  /* Estilos igual que el original */
  .inicio-estudiante {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    min-height: 100vh;
    background: linear-gradient(135deg, #003366, #5b97c9);

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
  
  .contenido {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: start;
    padding-top: 100px;
    width: 100%;
    animation: fadeIn 0.6s ease;
    margin-bottom:20px;
  }
  
  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
       }

  .asesorias-container {
    background: white;
    padding: 30px;
    border-radius: 20px;
    width: 90%;
    max-width: 1000px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  }
  
  .asesorias-container h1 {
    text-align: center;
    color: #003366;
    margin-bottom: 30px;
    font-size: 2.2rem;
  }
  
  .lista-asesorias {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .asesoria-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e3f2fd;
    border-left: 6px solid #003366;
    padding: 20px;
    border-radius: 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .asesoria-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  
  .asesoria-info {
    flex-grow: 1;
  }
  
  .asesoria-info h2 {
    margin: 0 0 10px;
    color: #003366;
    font-size: 1.4rem;
  }
  
  .asesoria-info p {
    margin: 5px 0;
    font-size: 1rem;
  }
  
  .asesoria-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 20px;
  }
  
  .btn-calificar {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .btn-calificar:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }
  
  .sin-asesorias {
    text-align: center;
    color: #003366;
    padding: 50px;
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
  .logo {
    align-items: flex-start;
  }

  .logo img {
    height: 60px;
    margin: 5px 0;
  }

  .logo-text {
    font-size: 0px;
    padding-left: 0;
    text-align: left;
  }

  header {
    padding: 10px;
  }

  .menu-toggle {
    top: 10px;
    right: 10px;
    font-size: 20px;
  }


  .side-menu {
    width: 50%;
    left: -100%;
    top: 25px;
    z-index: 999;
  }

  .menu-visible {
    left: 0;
  }

  .perfil-container {
    padding: 10px;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-nombre {
    font-size: 0.9rem;
  }

  .contenido {
    padding-top: 180px;
    width:90%;
  }

  .asesorias-container {
    padding: 20px;
    width: 95%;
  }

  .asesoria-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .asesoria-actions {
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .asesoria-info h2 {
    font-size: 1.2rem;
  }

  .asesoria-info p {
    font-size: 0.9rem;
  }

  .btn-calificar {
    font-size: 0.85rem;
    padding: 8px 12px;
  }

  .asesorias-container h1 {
    font-size: 1.5rem;
  }

  .sin-asesorias {
    font-size: 1rem;
    padding: 30px;
  }
}

</style>
