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

    <!-- Contenido -->
    <main class="contenido">
      <div class="asesorias-container">
        <h1>Mis Asesorías</h1>
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
              <button @click="editarAsesoria(asesoria.id)" class="btn-editar">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button @click="marcarComoLista(asesoria.id)" class="btn-confirmar" :disabled="asesoria.estado !== 'Confirmada'">
                <i class="fa fa-check-circle"></i> Marcar como Lista
              </button>
              <button @click="cancelarAsesoria(asesoria.id)" class="btn-eliminar" :disabled="asesoria.estado === 'Cancelada'">
                <i class="fa fa-times-circle"></i> Cancelar
              </button>
              <button @click="reprogramarAsesoria(asesoria.id)" class="btn-reprogramar">
                <i class="fas fa-calendar-alt"></i> Reprogramar
              </button>
            </div>
          </div>
        </div>
        <div v-else class="sin-asesorias">
          <p>No tienes asesorías registradas aún.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MisAsesoriasAsesor',
  data() {
    return {
      menuVisible: false,
      perfilImagen: localStorage.getItem('perfilImagen') || null,
      nombreUsuario: localStorage.getItem('nombreUsuario') || "Asesor",
      asesorias: [
        { id: 1, materia: "Cálculo Diferencial", estudiante: "José Torres", fecha: "09/05/2025", hora: "1:00 PM", estado: "Confirmada" },
        { id: 2, materia: "Redes de Computadoras", estudiante: "Ana Pérez", fecha: "2025-05-05", hora: "11:00 AM", estado: "Lista" },
        { id: 3, materia: "Inteligencia Artificial", estudiante: "Carlos Soto", fecha: "2025-05-06", hora: "2:00 PM", estado: "Cancelada" }
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
    marcarComoLista() {
      this.$router.push({ name: 'bienvenida-asesor' });
    },
    cancelarAsesoria(id) {
      const asesoria = this.asesorias.find(a => a.id === id);
      if (asesoria && asesoria.estado !== 'Cancelada') {
        if (confirm('¿Deseas cancelar esta asesoría?')) {
          asesoria.estado = 'Cancelada';
        }
      }
    },
    editarAsesoria() {
      this.$router.push({ name: 'EditarAsesoriaAsesor' });
    },
    reprogramarAsesoria() {
      this.$router.push({ name: 'ReprogramarAsesoriaAsesor' });
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.inicio-estudiante {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #5b97c9, #003366);
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
    margin-bottom: 20px;
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
    border-bottom: 40px;
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

.btn-editar,
.btn-eliminar,
.btn-confirmar,
.btn-reprogramar {
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

.btn-editar {
  background-color: #007bff;
  color: white;
}

.btn-editar:hover {
  background-color: #0069d9;
  transform: translateY(-2px);
}

.btn-eliminar {
  background-color: #dc3545;
  color: white;
}

.btn-eliminar:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.btn-confirmar {
  background-color: #28a745;
  color: white;
}

.btn-confirmar:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.btn-reprogramar {
  background-color: #ffc107;
  color: #212529;
}

.btn-reprogramar:hover {
  background-color: #e0a800;
  transform: translateY(-2px);
}

.sin-asesorias {
  text-align: center;
  padding: 30px;
  color: #666;
}

/* Responsive design */
/* Tablets y móviles medianos */
@media (max-width: 768px) {
  .logo-text {
    display: none;
  }

  .menu-toggle {
    font-size: 22px;
    top: 15px;
    right: 15px;
    display: block;
  }

  .contenido {
    margin: auto;
    margin-bottom: 20px;
  }

  .asesorias-container {
    width: 85%;
    padding: 0 15px;
  }

  .asesoria-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .asesoria-actions {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    margin-top: 15px;
  }

  .asesoria-actions button {
    width: 80%;
  }

  .side-menu {
    top: 0;
    left: -250px;
    height: 100%;
    z-index: 999;
    transition: left 0.3s ease;
  }

  .side-menu.menu-visible {
    left: 0;
  }
}

/* Teléfonos pequeños */
@media (max-width: 480px) {
  .logo img {
    height: 35px;
  }

  .perfil-nombre {
    font-size: 0.9rem;
  }

  .asesorias-container h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  .asesoria-info h2 {
    font-size: 1.1rem;
  }

  .asesoria-info p {
    font-size: 0.9rem;
  }

  .btn-editar,
  .btn-eliminar,
  .btn-confirmar {
    font-size: 0.85rem;
    padding: 8px 12px;
    width: 80%;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-imagen i {
    font-size: 40px;
  }

  .side-menu button {
    font-size: 1rem;
  }
}

</style>
