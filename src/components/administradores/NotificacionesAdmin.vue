<template>
    <div class="inicio-admin">
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
  
      <!-- Sección de Notificaciones -->
      <main class="contenido">
        <div class="notificaciones">
          <h1>Notificaciones</h1>
          <p>Aquí puedes ver las notificaciones recientes relacionadas con el sistema.</p>
  
          <!-- Lista de Notificaciones -->
          <ul class="notificaciones-lista">
            <li v-for="(notificacion, index) in notificaciones" :key="index">
              <div class="notificacion-item">
                <p><strong>{{ notificacion.titulo }}</strong></p>
                <p>{{ notificacion.mensaje }}</p>
                <p><small>{{ notificacion.fecha }}</small></p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotificacionesAdmin',
    data() {
      return {
        menuVisible: false,
        perfilImagen: localStorage.getItem('perfilImagen') || null,
        nombreUsuario: localStorage.getItem('nombreUsuario') || "Usuario",
        notificaciones: [
          {
            titulo: "Nueva solicitud de asesoría",
            mensaje: "Se ha recibido una nueva solicitud de asesoría de un estudiante.",
            fecha: "2025-04-26 10:15 AM"
          },
          {
            titulo: "Nuevo informe disponible",
            mensaje: "Un nuevo informe de desempeño de los asesores está disponible.",
            fecha: "2025-04-25 03:00 PM"
          },
          {
            titulo: "Cambio en la configuración",
            mensaje: "La configuración de la plataforma ha sido actualizada.",
            fecha: "2025-04-24 11:30 AM"
          }
        ]
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
    }
  };
  </script>
  
  <style scoped>
 .inicio-admin {
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
  
  .menu-toggle:hover{
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
    margin: 15px ;
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
    margin-right: 15px;
  }
  
  nav ul button:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .notificaciones {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 900px;
    margin-top: 100px;
    animation: fadeIn 0.5s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .notificaciones h1 {
    color: #003366;
    margin-bottom: 10px;
  }
  
  .notificaciones p {
    color: #333;
    font-size: 1.1rem;
  }
  
  .notificaciones-lista {
    list-style: none;
    padding: 0;
    margin-top: 20px;
  }
  
  .notificacion-item {
    background: #f4f4f4;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .notificacion-item p {
    margin: 5px 0;
  }
  
  .notificacion-item strong {
    color: #003366;
  }
  
  .notificacion-item small {
    color: #888;
  }
  @media (max-width: 768px) {
  .logo-text {
    display: none;
  }

  .logo img {
    height: 40px;
  }

  .menu-toggle {
    font-size: 20px;
    top: 15px;
    right: 15px;
  }

  .side-menu {
    width: 200px;
    padding-top: 40px;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .notificaciones {
    width: 85%;
    padding: 15px;
    margin-top: 110px;
    margin-left: 20px;
  }

  .notificaciones p {
    font-size: 1rem;
  }

  .side-menu button {
    font-size: 1rem;
    padding: 8px;
  }
}

  </style>
  