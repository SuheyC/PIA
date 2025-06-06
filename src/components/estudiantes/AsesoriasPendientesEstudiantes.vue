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
        <li><button @click="irInicioEstudiante"><i class="fa fa-home"></i> Inicio</button></li>
        <li><button @click="cerrarSesion"><i class="fa fa-sign-out-alt"></i> Cerrar sesión</button></li>
        <li><button @click="verAsesorias"><i class="fa fa-book"></i> Mis asesorías</button></li>
        <li><button @click="solicitarAsesoria"><i class="fa fa-plus-circle"></i> Solicitar asesoría</button></li>
        <li><button @click="mandarMensaje"><i class="fa fa-envelope"></i> Mandar mensaje</button></li>
        <li><button @click="verReportes"><i class="fa fa-chart-bar"></i> Reportes</button></li>
        <li><button @click="verNotificaciones"><i class="fa fa-bell"></i> Notificaciones</button></li>
        <li><button @click="verConfiguracion"><i class="fa fa-cogs"></i> Configuración</button></li>
      </ul>
    </nav>

    <!-- Contenido de Mis Asesorías -->
    <main class="contenido">
      <div class="asesorias-container">
        <h1>Mis Asesorías</h1>
        <div v-if="asesoriasOrdenadas.length > 0" class="lista-asesorias">
          <div v-for="asesoria in asesoriasOrdenadas" :key="asesoria.id" class="asesoria-card">
            <div class="asesoria-info">
              <h2>{{ asesoria.materia }}</h2>
              <p><strong>Asesor:</strong> {{ asesoria.asesor }}</p>
              <p><strong>Fecha:</strong> {{ formatearFecha(asesoria.fecha) }}</p>
              <p><strong>Hora:</strong> {{ asesoria.hora }}</p>
              <p><strong>Estado:</strong> {{ asesoria.estado }}</p>
            </div>
            <div class="asesoria-actions">
          
              <button @click="eliminarAsesoria(asesoria.id)" class="btn-eliminar"><i class="fa fa-trash"></i> Eliminar</button>
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
import axios from 'axios';

export default {
  name: 'MisAsesoriasEstudiante',
  data() {
    return {
      menuVisible: false,
      perfilImagen: localStorage.getItem('perfilImagen') || null,
      nombreUsuario: localStorage.getItem('nombreUsuario') || "Estudiante",
      asesorias: []
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
    irInicioEstudiante() {
      this.$router.push({ name: 'bienvenida-estudiante' });
    },
    editarPerfil() {
      this.$router.push({ name: 'EditarPerfilEstudiante' });
    },
    cerrarSesion() {
      this.$router.push({ name: 'CerrarSesionEstudiante' });
    },
    verAsesorias() {
      this.$router.push({ name: 'MisAsesoriasEstudiante' });
    },
    solicitarAsesoria() {
      this.$router.push({ name: 'SolicitarAsesoria' });
    },
    mandarMensaje() {
      this.$router.push({ name: 'MandarMensaje' });
    },
    verReportes() {
      this.$router.push({ name: 'ReporteEstudiante' });
    },
    verNotificaciones() {
      this.$router.push({ name: 'NotificacionesEstudiante' });
    },
    verConfiguracion() {
      this.$router.push({ name: 'ConfiguracionEstudiante' });
    },
    formatearFecha(fecha) {
      const d = new Date(fecha);
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const anio = d.getFullYear();
      return `${dia}/${mes}/${anio}`;
    },
    editarAsesoria(id) {
      this.$router.push({ name: 'EditarAsesoriaEstudiante', params: { id } });
    },
    eliminarAsesoria(id) {
      if (confirm('¿Estás seguro de que deseas eliminar esta asesoría de la vista?')) {
        this.asesorias = this.asesorias.filter(asesoria => asesoria.id !== id);
      }
    },
    cargarAsesorias() {
      axios.get('http://localhost:3000/asesorias')
        .then(response => {
          this.asesorias = response.data;
        })
        .catch(error => {
          console.error('Error al cargar las asesorías:', error);
        });
    }
  },
  created() {
    this.cargarAsesorias();
  }
};
</script>




  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  .inicio-estudiante {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    min-height: 100vh;
    background: linear-gradient(135deg, #5b97c9, #003366);
  }
  
  /* HEADER Y NAV IGUALES (no modificados) */
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
    z-index: 1000;
    font-size: 24px;
    border: none;
    cursor: pointer;
    background: none;
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
    margin: 10px;
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
    padding: 10px;
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
  
  .btn-editar, .btn-eliminar {
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
  background-color: #5b97c9; 
  color: white;
}

.btn-editar:hover {
  background-color: #4178aa; 
  transform: translateY(-2px);
}

.btn-eliminar {
  background-color: #d9534f; 
  color: white;
}

.btn-eliminar:hover {
  background-color: #c9302c; 
  transform: translateY(-2px);
}

  
  .sin-asesorias {
    text-align: center;
    color: #003366;
    padding: 50px;
    font-size: 1.3rem;
  }

  /* Tablet: hasta 768px */
@media (max-width: 768px) {

    .logo-text{
        display: none;
    }

  .menu-toggle {
    font-size: 22px;
    top: 15px;
    right: 15px;
  }

  .asesorias-container {
    padding: 20px;
  }

  .asesoria-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .asesorias-container {
    width: 85%;
    padding: 15px;
  }

  .asesoria-actions {
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    margin-left: 0;
    margin-top: 15px;
  }
}

/* Móviles: hasta 480px */
@media (max-width: 480px) {
  .logo-text {
    font-size: 0px;
    text-align: center;
  }

  .perfil-nombre {
    font-size: 0.9rem;
  }

  .asesorias-container {
    width: 75%;
    padding: 15px;
  }

  .asesorias-container h1 {
    font-size: 1.6rem;
  }

  .asesoria-info h2 {
    font-size: 1.2rem;
  }

  .asesoria-info p {
    font-size: 0.95rem;
  }

  .btn-editar, .btn-eliminar {
    font-size: 0.85rem;
    padding: 8px 12px;
  }

  .side-menu {
    width: 220px;
    padding-top: 40px;
  }

  .side-menu button {
    font-size: 1rem;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-imagen i {
    font-size: 40px;
  }
}


  </style>
  
  
 
  
  
  
  