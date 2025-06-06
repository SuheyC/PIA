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
          <li><button @click="cerrarSesion"><i class="fa fa-sign-out-alt"></i> Cerrar sesión</button></li>
          <li><button @click="verAsesorias"><i class="fa fa-book"></i> Mis asesorías</button></li>
          <li><button @click="solicitarAsesoria"><i class="fa fa-plus-circle"></i> Solicitar asesoría</button></li>
          <li><button @click="mandarMensaje"><i class="fa fa-envelope"></i> Mandar mensaje</button></li>
          <li><button @click="verReportes"><i class="fa fa-chart-bar"></i> Reportes</button></li>
          <li><button @click="verNotificaciones"><i class="fa fa-bell"></i> Notificaciones</button></li>
          <li><button @click="verConfiguracion"><i class="fa fa-cogs"></i> Configuración</button></li>
          
        </ul>

      </nav>
  
      <!-- Sección de bienvenida -->
      <main class="contenido">
        <div class="bienvenida">
          <h1>Bienvenido al Sistema de Asesorías</h1>
          <h3>Gestión de Asesorías Académicas</h3>
          <p>Aquí puedes ver y gestionar tus asesorías, solicitar nuevas y recibir notificaciones importantes.</p>
        </div>
      </main>
    </div>
  </template>
  
  <script>
export default {
  name: 'BienvenidaEstudiante',
  data() {
    return {
      menuVisible: false,
      perfilImagen: null,
      nombreUsuario: 'Estudiante',
    };
  },
  created() {
    // Cargar datos de usuario desde localStorage
    const usuario = localStorage.getItem('usuarioLogueado');
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.nombreUsuario = usuarioObj.nombre || 'Estudiante';
      this.perfilImagen = usuarioObj.fotoPerfil || null;
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
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
    mandarMensaje(){
      this.$router.push({ name: 'MandarMensaje'});
    },
    solicitarAsesoria() {
      this.$router.push({ name: 'SolicitarAsesoria'});
    },
    verReportes() {
      this.$router.push({ name: 'ReporteEstudiante' });
    },
    verNotificaciones() {
      this.$router.push({ name: 'NotificacionesEstudiante' });
    },
    verConfiguracion() {
      this.$router.push({ name: 'ConfiguracionEstudiante' });
    }
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
    top: 70px;
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
  
  .bienvenida h1 {
    color: #003366;
    margin-bottom: 10px;
  }
  
  .bienvenida h3 {
    color: #5b97c9;
    margin-bottom: 10px;
  }
  
  .bienvenida p {
    color: #333;
  }

  @media (max-width: 768px) {
  .logo-text {
    display: none;
  }

  .logo img {
    height: 40px;
    margin-right: 5px;
  }

  .menu-toggle {
    font-size: 20px;
    top: 15px;
    right: 15px;
  }

  .side-menu {
    width: 200px;
    top: 60px;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-imagen i {
    font-size: 40px;
  }

  .bienvenida {
    width: auto;
    padding: 15px;
    margin: 0 15px; /* ← Esto agrega margen a los lados */
  }

  .bienvenida h1 {
    font-size: 1.5rem;
  }

  .bienvenida h3 {
    font-size: 1.2rem;
  }

  .bienvenida p {
    font-size: 1rem;
  }
}

  </style>
  