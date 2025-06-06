<template>
    <div class="seleccionar-usuario">
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
          <li><button @click="irInicioAdmin"><i class="fa fa-home"></i> Inicio</button></li>
          <li><button @click="cerrarSesion"><i class="fa fa-sign-out-alt"></i> Cerrar sesión</button></li>
          <li><button @click="verUsuarios"><i class="fa fa-users"></i> Usuarios</button></li>
          <li><button @click="verInformes"><i class="fa fa-chart-line"></i> Informes</button></li>
          <li><button @click="verNotificaciones"><i class="fa fa-bell"></i> Notificaciones</button></li>
          <li><button @click="verConfiguracion"><i class="fa fa-cogs"></i> Configuración</button></li>
        </ul>
      </nav>
  
      <!-- Contenido principal -->
      <div class="content">
        <!-- Icono de usuarios -->
        <div class="icono-usuarios">
          <i class="fa fa-users fa-4x"></i>
        </div>
  
        <!-- Card de opciones -->
        <div class="card opciones-card">
          <h2>Selecciona el tipo de usuario que deseas ver</h2>
          <div class="opciones">
            <div class="opcion" @click="seleccionarTipo('administrador')">
              <i class="fas fa-user-shield fa-3x"></i>
              <p>Administrador</p>
            </div>
            <div class="opcion" @click="seleccionarTipo('estudiante')">
              <i class="fas fa-user-graduate fa-3x"></i>
              <p>Estudiante</p>
            </div>
            <div class="opcion" @click="seleccionarTipo('asesor')">
              <i class="fas fa-chalkboard-teacher fa-3x"></i>
              <p>Asesor</p>
            </div>
          </div>
        </div>
  
        <!-- Confirmación del tipo seleccionado -->
        <div v-if="tipoSeleccionado" class="confirmacion">
          <h3>¿Deseas ver los detalles del tipo de usuario: <strong>{{ tipoSeleccionado }}</strong>?</h3>
          <div class="acciones">
            <button @click="confirmarSeleccion">Sí, mostrar usuarios</button>
            <button @click="cancelarSeleccion">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SeleccionarTipoUsuario',
    data() {
      return {
        tipoSeleccionado: null,
        menuVisible: false,
        perfilImagen: localStorage.getItem('perfilImagen') || null,
        nombreUsuario: localStorage.getItem('nombreUsuario') || "Usuario",
      };
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      editarPerfil() {
        this.$router.push({ name: 'perfil-admin' });
      },
      irInicioAdmin() {
        this.$router.push({ name: 'bienvenida-admin' });
      },
      cerrarSesion() {
        this.$router.push({ name: 'cerrar-sesion' });
      },
      verUsuarios() {
        this.$router.push({ name: 'seleccionar-usuario' });
      },
      verSolicitudes() {
        this.$router.push({ name: 'SolicitudesAdmin' });
      },
      verInformes() {
        this.$router.push({ name: 'AdminInformes' });  // Redirige a la página de informes (ajustar si es necesario)
      },
      verNotificaciones() {
        this.$router.push({ name: 'NotificacionAdmin' });  // Redirige a la página de notificaciones (ajustar si es necesario)
      },
      verConfiguracion() {
        this.$router.push({ name: 'configuracionAdmin' });  // Redirige a la página de configuración (ajustar si es necesario)

      },
      seleccionarTipo(tipo) {
        this.tipoSeleccionado = tipo;
      },
      confirmarSeleccion() {
        if (this.tipoSeleccionado === 'administrador') {
          this.$router.push('/admin/usuariosAdmin');
        } else if (this.tipoSeleccionado === 'estudiante') {
          this.$router.push('/admin/usuariosEstudiantes');
        } else if (this.tipoSeleccionado === 'asesor') {
          this.$router.push('/admin/usuariosAsesores');
        }
      },
      cancelarSeleccion() {
        this.tipoSeleccionado = null;
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  .seleccionar-usuario {
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
    font-size: 1.5rem;
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
  }
  
  .menu-toggle:hover {
    background-color: aliceblue;
  }
  
  /* Menú lateral */
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
    padding-top: 40px;
    transition: left 0.3s;
  }
  
  .menu-visible {
    left: 0;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
    margin-left: 0;
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
  
  .side-menu button i {
    margin-right: 15px;
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
  
  .content {
    text-align: center;
    margin-top: 120px;
    padding: 40px;
    color: #003366;
  }
  
  /* NUEVO ICONO */
  .icono-usuarios {
    margin-bottom: 20px;
    color: #fcfcfc;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
  }
  
  .card {
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 600px;
    margin: 20px auto;
  }
  
  .opciones {
    display: flex;
    justify-content: center;
    gap: 50px;
  }
  
  .opcion {
    cursor: pointer;
    transition: transform 0.2s ease;
    text-align: center;
  }
  
  .opcion:hover {
    transform: scale(1.1);
  }
  
  .opcion i {
    color: #003366;
  }
  
  .confirmacion {
    margin-top: 30px;
  }
  
  .confirmacion h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .acciones {
    display: flex;
    justify-content: space-around;
  }
  
  .acciones button {
    padding: 10px 20px;
    background-color: #003366;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .acciones button:hover {
    background-color: #5b97c9;
  }
  
  @media (max-width: 768px) {
    .opciones {
      flex-direction: column;
      gap: 20px;
    }
  
    .card {
      width: 90%;
      padding: 15px;
    }

    .logo-text{
        font-size: 0%;
    }

  }
  </style>
  