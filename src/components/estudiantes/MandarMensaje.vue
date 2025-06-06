<template>
    <div class="enviar-mensaje">
      <div class="background-overlay"></div>
      <div class="contenido-general">
  
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
  
        <!-- Contenido principal -->
        <main class="main-contenido">
          <h1>Enviar mensaje a asesor</h1>
          <form @submit.prevent="enviarMensaje" class="form-mensaje">
            <div class="form-group">
              <label for="asesor">Selecciona un asesor:</label>
              <select id="asesor" v-model="asesorSeleccionado" required>
                <option disabled value="">-- Selecciona un asesor --</option>
                <option v-for="asesor in asesores" :key="asesor.id" :value="asesor.nombre">
                  {{ asesor.nombre }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="mensaje">Mensaje:</label>
              <textarea id="mensaje" v-model="mensaje" rows="5" required></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="enviar-btn">Enviar</button>
              <button type="button" class="cancelar-btn" @click="cancelar">Cancelar</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EnviarMensaje',
    data() {
      return {
        menuVisible: false,
        asesorSeleccionado: '',
        mensaje: '',
        asesores: [
          { id: 1, nombre: 'Ing. Juan Pérez' },
          { id: 2, nombre: 'Mtra. Laura García' },
          { id: 3, nombre: 'Dr. Carlos Martínez' }
        ],
        perfilImagen: null,
        nombreUsuario: 'Estudiante'
      };
    },
    methods: {
      enviarMensaje() {
        if (!this.asesorSeleccionado || !this.mensaje) {
          alert('Por favor completa todos los campos.');
          return;
        }
        alert(`Mensaje enviado a ${this.asesorSeleccionado}: ${this.mensaje}`);
        this.asesorSeleccionado = '';
        this.mensaje = '';
      },
      cancelar() {
        this.$router.push({ name: 'bienvenida-estudiante' });
      },
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
  .enviar-mensaje {
    min-height: 100vh;
    background: linear-gradient(135deg, #5b97c9, #003366);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 100px;
  }
  
  .contenido-general {
    width: 100%;
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
  }
  
  .logo img {
    height: 50px;
    margin-right: 10px;
  }
  
  .logo-text {
    font-size: 18px;
    color: #003366;
    padding-left: 10px;
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
    transform: scale(1.1);
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
    transition: left 0.4s ease;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
  
  .menu-visible {
    left: 0;
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
  
  .side-menu ul {
    list-style: none;
    padding: 0;
  }
  
  .side-menu li {
    margin: 10px;
  }
  
  .side-menu button {
    width: 100%;
    padding: 10px;
    background: none;
    border: none;
    color: white;
    text-align: left;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .side-menu button i {
    margin-right: 10px;
  }
  
  .side-menu button:hover {
    background-color: #5b97c9;
    transform: translateX(5px);
  }
  
  .main-contenido {
    background: white;
    padding: 30px;
    border-radius: 16px;
    width: 90%;
    max-width: 600px;
    margin: 120px auto 40px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.6s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  h1 {
    text-align: center;
    color: #003366;
    margin-bottom: 20px;
  }
  
  .form-mensaje {
    width: 100%;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  select,
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  select:focus,
  textarea:focus {
    outline: none;
    border-color: #003366;
    box-shadow: 0 0 5px rgba(0, 51, 102, 0.3);
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  .enviar-btn,
  .cancelar-btn {
    flex: 1;
    padding: 10px;
    background-color: #003366;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .enviar-btn:hover,
  .cancelar-btn:hover {
    background-color: #5b97c9;
  }
  
  /* Responsivo */
  @media (max-width: 768px) {
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
  
    .side-menu {
      top: 0;
      left: -100%;
      width: 70%;
      height: 100vh;
      padding-top: 100px;
      z-index: 1000;
    }
  
    .menu-visible {
      left: 0;
    }
  
    .main-contenido {
      width: 85%;
      padding: 20px;
    }
  
    .form-actions {
      flex-direction: column;
    }
  
    .enviar-btn,
    .cancelar-btn {
      width: 100%;
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

    .form-mensaje{
        width: 90%;
    }
  }
  </style>
  