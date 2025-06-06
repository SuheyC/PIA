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
    
      <!-- Sección de reportes -->
      <main class="contenido">
        <div class="bienvenida">
          <h1>Reportes de Asesorías</h1>
          <div v-if="asesorias.length === 0">
            <p>No hay asesorías registradas aún.</p>
          </div>
          <ul v-else>
            <li v-for="asesoria in asesorias" :key="asesoria.id" class="asesoria-item">
              <p><strong>{{ asesoria.nombreEstudiante }}</strong> - {{ asesoria.tema }}</p>
              <button @click="verCalificacion(asesoria.id)">Ver calificación</button>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReportesEstudiante',
    data() {
      return {
        menuVisible: false,
        perfilImagen: localStorage.getItem('perfilImagen') || null,
        nombreUsuario: localStorage.getItem('nombreUsuario') || "Estudiante",
        asesorias: [
          { id: 1, nombreEstudiante: 'Ana Martínez', tema: 'Matemáticas Avanzadas' },
          { id: 2, nombreEstudiante: 'Luis Ramírez', tema: 'Física Cuántica' },
          { id: 3, nombreEstudiante: 'Carlos martinez', tema: 'Cálculo Diferencial' }
        ],
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
      verCalificacion(id) {
        this.$router.push({ name: 'CalificacionAsesoria', params: { id } });
      },
     
    }
  };
  </script>
  
  <style scoped>
  .inicio-estudiante {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    min-height: 100vh;
    background-color: #5b97c9;
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
    margin: 10px ;
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
    align-items: center;
    width: 100%;
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
  
  .asesoria-item {
    margin: 10px 0;
    padding: 10px;
    background-color: #f3f3f3;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  button {
    padding: 8px 16px;
    background-color: #5b97c9;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #003366;
  }

  @media (max-width: 768px) {
  .asesoria-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .asesoria-item button {
    align-self: stretch;
    margin-top: 10px;
  }

  .menu-toggle {
    top: 10px;
    right: 10px;
    padding: 10px;
    font-size: 22px;
    z-index: 1100;
  }

  .bienvenida {
    width: 85%;
    margin: auto;
    font-size: 14px;
  }
  .logo-text {
    display: none;
  }
}


  </style>
  