<template>
    <div class="mensaje-admin">
      <!-- Overlay para cerrar menú en móvil -->
      <div v-if="menuVisible" class="overlay" @click="toggleMenu"></div>
  
      <!-- Header fijo -->
      <header>
        <div class="logo">
          <img src="@/assets/tecnm.png" alt="Tecnológico" />
          <img src="@/assets/ite.png" alt="ITE" />
          <span class="logo-text">TECNOLÓGICO NACIONAL DE MÉXICO</span>
        </div>
        <button class="menu-toggle" @click="toggleMenu">☰</button>
      </header>
  
      <!-- Menú lateral -->
      <nav :class="['side-menu', { 'menu-visible': menuVisible }]">
        <div class="perfil-container" @click="editarPerfil">
          <div class="perfil-imagen"><i class="fas fa-user"></i></div>
          <div class="perfil-nombre">Administrador</div>
        </div>
        <ul>
            <li><button @click="irInicioAdmin"><i class="fa fa-home"></i> Inicio</button></li>
          <li><button @click="verUsuarios"><i class="fas fa-users"></i> Usuarios</button></li>
          <li><button @click="mandarMensaje"><i class="fas fa-envelope"></i> Mensajes</button></li>
          <li><button @click="verInformes"><i class="fas fa-file-alt"></i> Informes</button></li>
          <li><button @click="verNotificaciones"><i class="fas fa-bell"></i> Notificaciones</button></li>
          <li><button @click="verConfiguracion"><i class="fas fa-cog"></i> Configuración</button></li>
          <li><button @click="cerrarSesion"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button></li>
        </ul>
      </nav>
  
      <!-- Contenido principal -->
      <main class="formulario-container">
        <h1>Enviar Mensaje</h1>
        <div class="formulario-mensaje">
          <label for="tipo">Tipo de destinatario:</label>
          <select id="tipo" v-model="tipoSeleccionado" @change="actualizarDestinatarios">
            <option value="">Seleccione tipo</option>
            <option value="estudiante">Estudiante</option>
            <option value="asesor">Asesor</option>
            <option value="administrador">Administrador</option>
          </select>
  
          <label for="destinatario">Destinatario:</label>
          <select id="destinatario" v-model="destinatarioSeleccionado">
            <option value="">Seleccione destinatario</option>
            <option v-for="usuario in listaDestinatarios" :key="usuario.id" :value="usuario.id">
              {{ usuario.nombre }}
            </option>
          </select>
  
          <label for="mensaje">Mensaje:</label>
          <textarea id="mensaje" v-model="mensajeTexto" placeholder="Escribe tu mensaje aquí..."></textarea>
  
          <button @click="enviarMensaje" :disabled="!mensajeValido">Enviar Mensaje</button>
  
          <p v-if="mensajeEnviado" class="exito">Mensaje enviado correctamente.</p>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "EnviarMensajesAdmin",
    data() {
      return {
        tipoSeleccionado: "",
        destinatarioSeleccionado: "",
        mensajeTexto: "",
        mensajeEnviado: false,
        menuVisible: false,
        estudiantes: [
          { id: "e1", nombre: "Ana López" },
          { id: "e2", nombre: "Carlos Pérez" },
        ],
        asesores: [
          { id: "a1", nombre: "Dra. Sandra Torres" },
          { id: "a2", nombre: "Ing. Luis Martínez" },
        ],
        administradores: [
          { id: "ad1", nombre: "Mtro. Juan Ruiz" },
          { id: "ad2", nombre: "Lic. Carmen Gutiérrez" },
        ]
      };
    },
    computed: {
      listaDestinatarios() {
        if (this.tipoSeleccionado === "estudiante") return this.estudiantes;
        if (this.tipoSeleccionado === "asesor") return this.asesores;
        if (this.tipoSeleccionado === "administrador") return this.administradores;
        return [];
      },
      mensajeValido() {
        return this.tipoSeleccionado && this.destinatarioSeleccionado && this.mensajeTexto.trim() !== "";
      },
    },
    methods: {
      actualizarDestinatarios() {
        this.destinatarioSeleccionado = "";
      },
      enviarMensaje() {
        console.log("Mensaje enviado a", this.destinatarioSeleccionado, ":", this.mensajeTexto);
        this.mensajeTexto = "";
        this.mensajeEnviado = true;
  
        setTimeout(() => {
          this.mensajeEnviado = false;
        }, 3000);
      },
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      irInicioAdmin() {
        this.$router.push({ name: 'bienvenida-admin' });
      },
      editarPerfil() {
        this.$router.push({ name: 'perfil-admin' });
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
      mandarMensaje() {
        this.$router.push({ name: 'MensajeAdmin' });
      },
      verInformes() {
        this.$router.push({ name: 'AdminInformes' });
      },
      verNotificaciones() {
        this.$router.push({ name: 'NotificacionAdmin' });
      },
      verConfiguracion() {
        this.$router.push({ name: 'configuracionAdmin' });
      }
    }
  };
  </script>
  
  <style scoped>
  .mensaje-admin {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, #5b97c9, #003366);
    min-height: 100vh;
    padding: 2rem;
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
    width: 40px;
    height: 50px;
  }
  
  .menu-toggle:hover{
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
    margin: 8px ;
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
  
  /* Formulario */
  .formulario-container {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    max-width: 500px;
    width: 100%;
    margin-top: 100px;
  }
  
  .formulario-mensaje label {
    display: block;
    margin: 10px 0 5px;
    color: #3d78d8;
    font-weight: bold;
  }
  
  .formulario-mensaje select,
  .formulario-mensaje textarea {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  button {
    background-color: #003366;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  button:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background-color: #0055a5;
  }
  
  .exito {
    margin-top: 10px;
    color: green;
    font-weight: bold;
    text-align: center;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    header {
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      height: 60px;
    }
  
    .logo-text {
      display: none;
    }
  
    .formulario-container {
      margin-top: 120px;
      padding: 1rem;
      width: 95%;
    }
  
    .formulario-mensaje {
      width: 90%;
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
  }
  </style>
  