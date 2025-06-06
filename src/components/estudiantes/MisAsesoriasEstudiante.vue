<template>
    <div class="inicio-estudiante">
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
  
      <!-- Contenido principal -->
      <main class="contenido">
        <div class="bienvenida">
          <h1>Mis Asesorías</h1>
          <div class="botones-asesorias">
            <button class="boton-opcion" @click="verPendientes">
              <i class="fa fa-hourglass-half"></i> Asesorías Pendientes
            </button>
            <button class="boton-opcion" @click="verImpartidas">
              <i class="fa fa-check-circle"></i> Asesorías Impartidas
            </button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MisAsesoriasEstudiante',
    data() {
      return {
        menuVisible: false,
        perfilImagen: localStorage.getItem('perfilImagen') || null,
        nombreUsuario: localStorage.getItem('nombreUsuario') || "Estudiante",
      };
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      irInicioEstudiante() {
        this.$router.push({name: 'bienvenida-estudiante' });
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
        this.$router.push({ name: 'SolicitarAsesoria'});
      },
      mandarMensaje(){
        this.$router.push({ name: 'MandarMensaje'});
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
      verPendientes() {
        this.$router.push({ name: 'AsesoriasPendientesEST' });
      },
      verImpartidas() {
        this.$router.push({ name: 'AsesoriasImpartidasEST'  });
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  /* Se aprovecha todo tu diseño actual */
  
  .inicio-estudiante {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
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
    top: 70px;
    left: -250px;
    width: 250px;
    height: 100%;
    background-color: #003366;
    color: white;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
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
    width: 90%;
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
    width: 90%;
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
    align-items: center;
    width: 100%;
    animation: fadeIn 0.6s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
     }

  .bienvenida {
    margin-top: 50px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .bienvenida h1 {
    color: #003366;
    margin-bottom: 20px;
  }
  
  /* ESTILOS DE LOS BOTONES DE OPCIONES */
  .botones-asesorias {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .boton-opcion {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5b97c9;
    color: white;
    padding: 15px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
  }
  
  .boton-opcion i {
    margin-right: 10px;
    font-size: 22px;
  }
  
  .boton-opcion:hover {
    background-color: #4076a5;
  }

  /* Tablet: hasta 768px */
@media (max-width: 768px) {
  .bienvenida {
    margin: 30px;
    width: 90%;
  }

  .logo-text {
    display: none;
  }
  
}

/* Móvil: hasta 480px */
@media (max-width: 480px) {
  .bienvenida {
    
    width: 85%;
  }
  .logo-text {
    display: none;
  }

  .botones-asesorias {
    flex-direction: column;
    gap: 15px;
  }

  .boton-opcion {
    font-size: 16px;
    padding: 12px;
  }

  .boton-opcion i {
    font-size: 18px;
  }

  .perfil-nombre {
    font-size: 0.9rem;
  }
}


  </style>
  