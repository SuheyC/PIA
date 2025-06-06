<template>
    <div class="inicio-admin">
        <header>
        <div class="logo">
          <img src="@/assets/tecnm.png" alt="Tecnológico" />
          <img src="@/assets/ite.png" alt="ITE" />
          <span class="logo-text">TECNOLÓGICO NACIONAL DE MÉXICO</span>
        </div>
        <button class="menu-toggle" @click="toggleMenu">☰</button>
      </header>

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
          <li><button @click="verSolicitudes"><i class="fa fa-file-alt"></i> Solicitudes</button></li>
          <li><button @click="verInformes"><i class="fa fa-chart-line"></i> Informes</button></li>
          <li><button @click="verNotificaciones"><i class="fa fa-bell"></i> Notificaciones</button></li>
          <li><button @click="verConfiguracion"><i class="fa fa-cogs"></i> Configuración</button></li>
        </ul>
      </nav>
  
      <main class="contenido">
        <div class="bienvenida">
          <h1>Lista de Asesores</h1>
          <div class="lista">
            <div v-for="asesor in asesores" :key="asesor.id" class="item-lista" @click="verPerfil(asesor)">
              {{ asesor.nombre }}
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  
  
  export default {
    name: 'ListaAsesores',
    data() {
      return {
        menuVisible: false,
        asesores: [
          { id: 1, nombre: 'Juan Pérez' },
          { id: 2, nombre: 'María González' },
          { id: 3, nombre: 'Carlos martinez' }
        ]
      }
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
      verPerfil(asesor) {
        this.$router.push({ name: 'PerfilAsesor', params: { id: asesor.id } });
      }
    }
  }
  </script>
  
  <style scoped>
  .inicio-admin {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(135deg, #5b97c9, #003366);
    overflow-x: hidden;
  }
  
  /* Header */
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
  
  /* Contenido */
  .contenido {
    margin-top: 90px;
    padding: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .bienvenida {
    background: #ffffff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 800px;
    text-align: center;
  }
  
  .bienvenida h1 {
    color: #003366;
    margin-bottom: 20px;
  }
  
  /* Lista de Estudiantes */
  .lista {
    margin-top: 20px;
  }
  
  .item-lista {
    background: #5b97c9;
    color: white;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    transition: background 0.3s;
    cursor: pointer;
  }
  
  .item-lista:hover {
    background: #003366;
  }

  /* Responsividad */
@media (max-width: 768px) {
  .contenido {
    padding: 20px 15px;
  }

  .bienvenida {
    padding: 20px;
    margin: 0 auto;
    width: 90%;
    box-sizing: border-box;
    border: 10px ; /* Bordes visibles */
  }

  .side-menu {
    width: 200px;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .item-lista {
    font-size: 14px;
    padding: 12px;
  }
  .logo-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .logo-text {
    display: none;
  }

  .menu-toggle {
    font-size: 20px;
    top: 15px;
    right: 15px;
  }

  .contenido {
    padding: 15px 10px;
  }

  .bienvenida {
    padding: 15px;
    border: 2px ; /* Bordes visibles */
  }
}


  </style>
  