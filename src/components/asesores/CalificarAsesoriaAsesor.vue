<template>
    <div class="calificacion-asesoria">
    
  
      <!-- Mensaje de Agradecimiento -->
      <div v-if="mensajeGraciasVisible" class="mensaje-gracias">
        <div class="mensaje-contenido">
          <h2>¡Gracias por tu Calificación!</h2>
          <p>Tu retroalimentación es muy importante para nosotros. Te redirigiremos en breve.</p>
          <button @click="cerrarMensajeGracias">Aceptar</button>
        </div>
      </div>
  
      <!-- Escala de Calificación (Card) -->
      <div :class="{'escala-calificacion-card': true, 'menu-visible': menuVisible, 'desplazado': menuVisible}">
        <h2>Escala de Calificación</h2>
        <ul>
          <li><strong>0-10:</strong> Muy malo</li>
          <li><strong>11-20:</strong> Deficiente</li>
          <li><strong>21-30:</strong> Insuficiente</li>
          <li><strong>31-40:</strong> Regular</li>
          <li><strong>41-50:</strong> Aceptable</li>
          <li><strong>51-60:</strong> Bueno</li>
          <li><strong>61-70:</strong> Muy bueno</li>
          <li><strong>71-80:</strong> Excelente</li>
          <li><strong>81-90:</strong> Sobresaliente</li>
          <li><strong>91-100:</strong> Excepcional</li>
        </ul>
      </div>
  
      <!-- Encabezado -->
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
        <li><button @click="irInicioAsesor"><i class="fa fa-home"></i> Inicio</button></li>
        <li><button @click="verSolicitudes"><i class="fas fa-clipboard-check"></i> Solicitudes</button></li>
        <li><button @click="verAsesorias"><i class="fa fa-book"></i> Mis asesorías</button></li>
        <li><button @click="verUsuarios"><i class="fas fa-users"></i> Estudiantes</button></li>
        <li><button @click="verMensajes"><i class="fas fa-envelope"></i> Mensajes</button></li>
        <li><button @click="verInformes"><i class="fas fa-file-alt"></i> Reportes/Informes</button></li>
        <li><button @click="verNotificaciones"><i class="fas fa-bell"></i> Notificaciones</button></li>
        <li><button @click="verConfiguracion"><i class="fas fa-cog"></i> Configuración</button></li>
        <li><button @click="cerrarSesion"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button></li>
      </ul>

      </nav>
  
      <!-- Contenido de Calificación -->
      <main class="contenido">
        <div class="calificacion-container">
          <h1>Califica la Asesoría</h1>
  
          <!-- Formulario de Calificación -->
          <form @submit.prevent="enviarCalificacion">
            <div class="campo-calificacion" v-for="(label, key) in calificacionLabels" :key="key">
              <label :for="key">{{ label }}</label>
              <div class="input-calificacion">
                <input v-model="calificacion[key]" type="number" :id="key" :name="key" min="0" max="100" required />
                <span>%</span>
              </div>
            </div>
  
            <!-- Comentarios -->
            <div class="campo-calificacion">
              <label for="comentarios">Comentarios</label>
              <textarea v-model="calificacion.comentarios" rows="4" placeholder="Escribe tus comentarios aquí..."></textarea>
            </div>
  
            <div class="botones">
              <button type="submit" class="btn-enviar">Enviar Calificación</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'CalificarAsesoria',
    data() {
      return {
        mostrarAnuncio: false,  // Controla si se muestra el anuncio
        menuVisible: false,
        perfilImagen: localStorage.getItem('perfilImagen') || null,
        nombreUsuario: localStorage.getItem('nombreUsuario') || "Estudiante",
        calificacion: {
          asistencia: null,
          conocimiento: null,
          claridad: null,
          disponibilidad: null,
          actitud: null,
          organizacion: null,
          enfoque: null,
          comunicacion: null,
          compromiso: null,
          tiempo: null,
          satisfaccion: null,
          comentarios: ''
        },
        calificacionLabels: {
          asistencia: "Asistencia",
          conocimiento: "Conocimiento del tema",
          claridad: "Claridad en la explicación",
          disponibilidad: "Disponibilidad",
          actitud: "Actitud y profesionalismo",
          organizacion: "Organización",
          enfoque: "Enfoque práctico",
          comunicacion: "Comunicación",
          compromiso: "Compromiso con tu aprendizaje",
          tiempo: "Tiempo dedicado",
          satisfaccion: "Satisfacción general"
        },
        mensajeGraciasVisible: false // Para mostrar el mensaje de agradecimiento
      };
    },

    mounted() {
      // Verificamos si el anuncio ya fue visto en esta sesión
      if (!sessionStorage.getItem('anuncioVisto')) {
        // Si no se ha visto, lo mostramos después de un pequeño retraso
        setTimeout(() => {
          this.mostrarAnuncio = true;
        }, 500); // Pequeño retraso para asegurar que la página esté lista
      }
    },
    methods: {
       toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    irInicioAsesor() {
      this.$router.push({ name: 'bienvenida-asesor' });
    },
    editarPerfil() {
      this.$router.push({ name: 'perfil-asesor' });
    },
    verSolicitudes() {
      this.$router.push({ name: 'SolicitudesAsesor' });
    },
    verAsesorias() {
      this.$router.push({ name: 'MisAsesoriasAsesor' });
    },
    verUsuarios() {
      this.$router.push({ name: 'UsuariosEstudiantes' });
    },
    verMensajes() {
      this.$router.push({ name: 'MensajeAsesor' });
    },
    verInformes() {
      this.$router.push({ name: 'InformesAsesor' });
    },
    verNotificaciones() {
      this.$router.push({ name: 'NotificacionesAsesor' });
    },
    verConfiguracion() {
      this.$router.push({ name: 'ConfiguracionAsesor' });
    },
    cerrarSesion() {
      this.$router.push({ name: 'cerrar-sesionAsesor' });
    },
      enviarCalificacion() {
        this.$router.push({ name: 'bienvenida-asesor' });
      },
      cerrarMensajeGracias() {
        this.mensajeGraciasVisible = false;
        this.$router.go(-1); // Redirige inmediatamente si el usuario cierra el mensaje
      }
    }
  };
  </script>
    
  <style scoped>
 
 /* Estilos Generales */

 .anuncio-emergente {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.5s ease-in-out;
}

.anuncio-contenido {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.anuncio-contenido h2 {
  font-size: 1.8rem;
  color: #003366;
}

.anuncio-contenido p {
  font-size: 1rem;
  margin-bottom: 15px;
}

.anuncio-contenido button {
  background-color: #5b97c9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.anuncio-contenido button:hover {
  background-color: #003366;
}

/* Estilos Generales */

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
  z-index: 1100;
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
  margin: 8px;
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
  padding: 5px;
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



.escala-calificacion-card.desplazado {
  transform: translateX(1130px); 
  transition: transform 0.3s ease;
}


  
  

/* Calificación */
.calificacion-asesoria {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #5b97c9, #003366);
  min-height: 100vh;
  overflow: hidden;
  padding-top: 100px;
}

.calificacion-container {
  background-color: white;
  padding: 40px;
  border-radius: 15px;
  width: 90%;
  max-width: 1100px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  margin-top: 100px;
  animation: fadeIn 0.6s ease;
}

h1 {
  text-align: center;
  color: #003366;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

/* Escala de Calificación */
.escala-calificacion-card {
    position: fixed;
  top: 100px;
  left: 20px;
  background: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;
  width: 300px;
  height: 280px;
  z-index: 900;
  animation: fadeIn 0.5s ease;
}



.escala-calificacion h2 {
  color: #003366;
  font-size: 20px;
  margin-bottom: 10px;
}

.escala-calificacion ul {
  list-style-type: none;
  padding: 0;
}

.escala-calificacion li {
  margin: 5px 0;
  font-size: 1rem;
}

/* Estilos para el formulario de calificación */
.input-calificacion {
  display: flex;
  align-items: center;
}

.input-calificacion input {
  width: 60%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.input-calificacion span {
  font-size: 1.5rem;
  padding-left: 5px;
}

.campo-calificacion {
  margin-bottom: 20px;
}

.campo-calificacion label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.campo-calificacion textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: vertical;
}

.botones {
  text-align: center;
}

/* Estilo para el botón de enviar */
.btn-enviar {
  background-color: #5b97c9; /* Color azul */
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-enviar:hover {
  background-color: #0056b3; /* Color azul más oscuro */
}

.mensaje-gracias {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.5s ease-in-out;
}

.mensaje-contenido {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
}

.mensaje-contenido h2 {
  font-size: 1.8rem;
  color: #003366;
  margin-bottom: 15px;
}

.mensaje-contenido p {
  font-size: 1rem;
  margin-bottom: 20px;
}

.mensaje-contenido button {
  background-color: #5b97c9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.mensaje-contenido button:hover {
  background-color: #003366;
}

@media (max-width: 768px) {
  /* Header */
  header {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 15px;
    height: auto;
  }

  .logo {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .logo img {
    height: 40px;
  }

  .logo-text {
    font-size: 0px;
    text-align: left;
  }

  .menu-toggle {
    
    top: 15px;
    right: 15px;
    font-size: 22px;
  }

  /* Menú lateral */
  .side-menu {
    width: 220px;
    top: 110px;
    height: 100vh;
    z-index: 1000;
  }

  .perfil-imagen {
    width: 50px;
    height: 50px;
  }

  .side-menu ul li {
    font-size: 14px;

  }

  /* Escala de calificación */
  .escala-calificacion-card {
    width: 80%;
    padding: 12px;
    font-size: 14px;
    margin: 20px;
    position: relative;
    top: 0;
    right: 0;
    transform: none;
  }

  .escala-calificacion-card.desplazado {
    transform: none;
  }

  /* Contenedor de calificación */
  .calificacion-container {
    width: 80%;
    margin-bottom:20px;
    margin: auto;
    position: relative;
  }

  h1 {
    font-size: 1.6rem;
    text-align: center;
  }

  .campo-calificacion label {
    font-size: 0.95rem;
  }

  .input-calificacion input {
    width: 100%;
    font-size: 1rem;
  }

  textarea {
    width: 100%;
    font-size: 1rem;
  }

  /* Botones */
  .botones {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .btn-enviar {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
  }

  /* Anuncios */
  .anuncio-contenido,
  .mensaje-contenido {
    width: 90%;
    font-size: 0.95rem;
    text-align: center;
    top: 60px !important;
    left: 5% !important;
    transform: none !important;
  }

  .mensaje-contenido {
    top: auto !important;
    bottom: 20px !important;
  }

  /* Responsive para select y opciones */
  select,
  option {
    font-size: 1rem;
  }
}


  </style>