<template>
    <div class="notificaciones-estudiante">
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
  
      <!-- Sección de Notificaciones -->
      <main class="contenido">
        <div class="notificaciones-container">
          <h1>Notificaciones</h1>
          <ul class="notificaciones-lista">
            <li v-for="(notificacion, index) in notificaciones" :key="index">
              <div class="notificacion">
                <p class="notificacion-mensaje">{{ notificacion.mensaje }}</p>
                <span class="notificacion-fecha">{{ notificacion.fecha }}</span>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotificacionesEstudiante',
    data() {
      return {
        menuVisible: false,
        perfilImagen: localStorage.getItem('perfilImagen') || null,
        nombreUsuario: localStorage.getItem('nombreUsuario') || "Estudiante",
        notificaciones: [
          { mensaje: "Tu solicitud de asesoría ha sido aprobada.", fecha: "2025-04-28" },
          { mensaje: "Nueva asesoría disponible sobre tu área de interés.", fecha: "2025-04-25" },
          { mensaje: "Recuerda completar tu perfil antes de la fecha límite.", fecha: "2025-04-20" }
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
    }
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  .notificaciones-estudiante {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    min-height: 100vh;
    background: linear-gradient(135deg, #012a53, #7fbfff);
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
    align-items: center;
    width: 100%;
  }
  
  .notificaciones-container {
    margin-top: 50px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.6s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .notificaciones-container h1 {
    color: #003366;
    margin-bottom: 20px;
  }
  
  .notificaciones-lista {
    list-style: none;
    padding: 0;
  }
  
  .notificacion {
    background-color: #f4f4f4;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .notificacion-mensaje {
    font-size: 16px;
    color: #333;
  }
  
  .notificacion-fecha {
    font-size: 14px;
    color: #777;
    margin-top: 5px;
  }

  @media (max-width: 768px) {
  /* Ocultar texto largo del logo */
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

  /* Menú lateral a pantalla completa */
  .side-menu {
    top: 0;
    left: -100%;
    width: 60%;
    height: 100vh;
    padding-top: 100px;
    z-index: 999;
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

  .notificaciones-container {
    margin-top: 10px;
    width: 80%;
    padding: 15px;
    border-radius: 6px;
  }

  .notificacion {
    font-size: 14px;
  }

  .notificacion-mensaje {
    font-size: 14px;
  }

  .notificacion-fecha {
    font-size: 12px;
  }

  /* Evitar scroll horizontal */
  body {
    overflow-x: hidden;
  }
}


  </style>
  