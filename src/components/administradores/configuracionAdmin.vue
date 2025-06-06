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
  
      <!-- Sección de configuración -->
      <main class="contenido">
        <div class="configuracion">
          <h1>Configuración del Administrador</h1>
          <p>Aquí puedes modificar las configuraciones de tu cuenta y del sistema de gestión de asesorías.</p>
  
          <!-- Formulario de configuración -->
          <div class="form-configuracion">
            <h2>Configuración de la Cuenta</h2>
            <label for="nombreSistema">Nombre del Sistema:</label>
            <input type="text" id="nombreSistema" v-model="nombreSistema" placeholder="Nombre del sistema">
  
            <label for="emailSoporte">Correo de soporte:</label>
            <input type="email" id="emailSoporte" v-model="emailSoporte" placeholder="Correo de soporte">
  
            <h2>Seguridad</h2>
            <label for="nuevaContrasena">Nueva Contraseña:</label>
            <input type="password" id="nuevaContrasena" v-model="nuevaContrasena" placeholder="Ingresa nueva contraseña">
  
            <label for="confirmarContrasena">Confirmar Contraseña:</label>
            <input type="password" id="confirmarContrasena" v-model="confirmarContrasena" placeholder="Confirma la nueva contraseña">
  
            <h2>Imagen de Perfil</h2>
            <label for="imagenPerfil">Cambiar imagen de perfil:</label>
            <input type="file" id="imagenPerfil" @change="cambiarImagenPerfil" />
  
            <button @click="guardarConfiguracion">Guardar configuración</button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConfiguracionAdmin',
    data() {
      return {
        menuVisible: false,
        perfilImagen: localStorage.getItem('perfilImagen') || null,
        nombreUsuario: localStorage.getItem('nombreUsuario') || "Usuario",
        nombreSistema: localStorage.getItem('nombreSistema') || '',
        emailSoporte: localStorage.getItem('emailSoporte') || '',
        nuevaContrasena: '',
        confirmarContrasena: '',
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
        this.$router.push('/admin/bienvenida');
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
        this.$router.push({ name: 'AdminInformes' });
      },
      verNotificaciones() {
        this.$router.push({ name: 'NotificacionAdmin' });
      },
      verConfiguracion() {
        this.$router.push({ name: 'configuracionAdmin' });
      },
      cambiarImagenPerfil(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.perfilImagen = e.target.result;
            localStorage.setItem('perfilImagen', this.perfilImagen);
          };
          reader.readAsDataURL(file);
        }
      },
      guardarConfiguracion() {
        if (this.nuevaContrasena !== this.confirmarContrasena) {
          alert('Las contraseñas no coinciden.');
          return;
        }
  
        localStorage.setItem('nombreSistema', this.nombreSistema);
        localStorage.setItem('emailSoporte', this.emailSoporte);
        if (this.nuevaContrasena) {
          localStorage.setItem('contrasena', this.nuevaContrasena);
        }
        alert('Configuración guardada correctamente!');
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
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
    margin: 15px;
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
  
  .configuracion {
    margin-top: 100px;
    margin-bottom: 20px;
    background: white;
    padding: 30px;
    border-radius: 8px;
    text-align: center;
    width: 90%;
    max-width: 650px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.5s ease;
  }

  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .configuracion h1 {
    color: #003366;
    margin-bottom: 15px;
  }
  
  .configuracion p {
    color: #555;
  }
  
  .form-configuracion {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
  }
  
  .form-configuracion label {
    font-size: 14px;
    color: #333;
  }
  
  .form-configuracion input,
  .form-configuracion select {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
  }
  
  .form-configuracion input[type="checkbox"] {
    margin-top: 10px;
  }
  
  .form-configuracion button {
    padding: 12px;
    background-color: #003366;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  
  .form-configuracion button:hover {
    background-color: #5b97c9;
  }
  
  input[type="file"] {
    padding: 5px;
    margin-bottom: 10px;
  }

  /* Estilos responsivos */
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
    right: 35px;
  }

  .side-menu {
    width: 200px;
    padding-top: 20px;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-imagen i {
    font-size: 40px;
  }

  .perfil-nombre {
    font-size: 0.9rem;
  }

  .form-configuracion input,
  .form-configuracion select {
    font-size: 14px;
    padding: 10px;
  }

  .form-configuracion button {
    font-size: 14px;
    padding: 10px;
  }

  .configuracion {
    padding: 20px;
    width: 85%;
  }

  .contenido {
    padding-top: 30px;
    padding-bottom: 20px;
  }
}

@media (max-width: 480px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .menu-toggle {
    position: absolute;
    top: 15px;
    right: 50px;
  }

  .side-menu {
    width: 180px;
  }

  .configuracion h1 {
    font-size: 20px;
  }

  .form-configuracion label {
    font-size: 13px;
  }

  .logo img {
    height: 35px;
  }
}


  </style>
  