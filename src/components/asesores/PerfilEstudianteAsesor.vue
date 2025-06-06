<template>
    <div class="inicio-admin">
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
  
      
  
      <main class="contenido">
        <div class="bienvenida">
          <h2>Desempeño Académico</h2>
          <div class="grafica">
            <canvas id="graficaDesempeno" width="400" height="200"></canvas>
          </div>
  
          <h2>Categorías a calificar</h2>
          <ul>
            <li>Asistencia: <span>{{ calificaciones.asistencia }}%</span></li>
            <li>Participación: <span>{{ calificaciones.participacion }}%</span></li>
            <li>Entrega de Tareas: <span>{{ calificaciones.entregaTareas }}%</span></li>
            <li>Compromiso: <span>{{ calificaciones.compromiso }}%</span></li>
            <li>Desempeño en Exámenes: <span>{{ calificaciones.desempenoExamenes }}%</span></li>
            <li>Habilidades de Comunicación: <span>{{ calificaciones.habilidadesComunicacion }}%</span></li>
            <li>Cumplimiento de Normas: <span>{{ calificaciones.cumplimientoNormas }}%</span></li>
            <li>Actitud y Profesionalismo: <span>{{ calificaciones.actitudProfesionalismo }}%</span></li>
            <li>Gestión del Tiempo: <span>{{ calificaciones.gestionTiempo }}%</span></li>
            <li>Satisfacción General: <span>{{ calificaciones.satisfaccionGeneral }}%</span></li>
          </ul>
  
          <div v-if="totalCalificacion >= 70" class="aprobado">
            <p>¡El estudiante está aprobado con un total de {{ totalCalificacion }}!</p>
          </div>
          <div v-else class="reprobado">
            <p>El estudiante está reprobado con un total de {{ totalCalificacion }}.</p>
          </div>
        </div>
        <button class="btn-volver" @click="volverAListaEstudiantes">
          ← Volver
        </button>
      </main>
    </div>
  </template>
  
  <script>
  import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);
  
  export default {
    name: 'PerfilEstudiante',
    data() {
      return {
        menuVisible: false,
        estudiante: {},
        calificaciones: {
          asistencia: 85,
          participacion: 75,
          entregaTareas: 90,
          compromiso: 80,
          desempenoExamenes: 85,
          habilidadesComunicacion: 90,
          cumplimientoNormas: 95,
          actitudProfesionalismo: 88,
          gestionTiempo: 82,
          satisfaccionGeneral: 80
        },
      };
    },
    created() {
      const id = this.$route.params.id;
      const estudiantes = [
        { id: 1, nombre: 'Ana Martínez', carrera: 'Ingeniería en Sistemas', semestre: '6°' },
        { id: 2, nombre: 'Luis Ramírez', carrera: 'Ingeniería Industrial', semestre: '4°' },
        { id: 3, nombre: 'Sofía Herrera', carrera: 'Ingeniería Mecánica', semestre: '7°' }
      ];
      this.estudiante = estudiantes.find(e => e.id == id) || {};
    },
    mounted() {
      this.crearGrafica();
    },
    computed: {
      totalCalificacion() {
        return (
          this.calificaciones.asistencia +
          this.calificaciones.participacion +
          this.calificaciones.entregaTareas +
          this.calificaciones.compromiso +
          this.calificaciones.desempenoExamenes +
          this.calificaciones.habilidadesComunicacion +
          this.calificaciones.cumplimientoNormas +
          this.calificaciones.actitudProfesionalismo +
          this.calificaciones.gestionTiempo +
          this.calificaciones.satisfaccionGeneral
        ) / 10;
      }
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      crearGrafica() {
        const ctx = document.getElementById('graficaDesempeno').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [
              'Asistencia', 
              'Participación', 
              'Entrega de Tareas', 
              'Compromiso', 
              'Desempeño en Exámenes', 
              'Habilidades de Comunicación', 
              'Cumplimiento de Normas', 
              'Actitud y Profesionalismo', 
              'Gestión del Tiempo', 
              'Satisfacción General'
            ],
            datasets: [{
              label: 'Desempeño Académico',
              data: [
                this.calificaciones.asistencia,
                this.calificaciones.participacion,
                this.calificaciones.entregaTareas,
                this.calificaciones.compromiso,
                this.calificaciones.desempenoExamenes,
                this.calificaciones.habilidadesComunicacion,
                this.calificaciones.cumplimientoNormas,
                this.calificaciones.actitudProfesionalismo,
                this.calificaciones.gestionTiempo,
                this.calificaciones.satisfaccionGeneral
              ],
              backgroundColor: '#5b97c9',
              borderColor: '#003366',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100
              }
            }
          }
        });
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
      volverAListaEstudiantes() {
        this.$router.push({ name: 'UsuariosEstudiantes' }); // Cambia el nombre si tu ruta es diferente
      }
    }
  };
  </script>
    
    
    <style scoped>
  .inicio-admin {
    background-color: #e9f1f7;
    min-height: 100vh;
    overflow-x: hidden;
    padding-top: 80px;
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
  
  .menu-visible ~ .perfil-estudiante {
    transform: translateX(1100px);
    transition: transform 0.3s ease;
  }
  
  
  .contenido {
    flex-grow: 1;
    width: 100%;
    padding: 100px 20px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .bienvenida {
    margin-top: 50px;
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.5s ease;
  }
  
  /* Títulos */
  .bienvenida h2 {
    color: #003366;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: left;
  }
  
  /* Lista de categorías */
  .bienvenida ul {
    list-style: none;
    padding: 0;
    margin-top: 15px;
  }
  
  .bienvenida ul li {
    background-color: #e6eff7;
    margin: 10px 0;
    padding: 12px 16px;
    border-radius: 8px;
    color: #003366;
    font-weight: 500;
    display: flex;
    align-items: center;
  }
  
  .bienvenida ul li::before {
    content: "✔️";
    margin-right: 10px;
  }
  
  .perfil-estudiante {
    position: fixed;
    top: 100px;
    left: 20px;
    background: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: left;
    width: 350px;
    height: 250px;
    z-index: 900;
  }
  
  .perfil-estudiante h2 {
    color: #003366;
    font-size: 25px;
    margin-bottom: 10px;
  }
  
  .perfil-estudiante p {
    margin: 5px 0;
    font-size: 0.95rem;
  }
  
  .grafica {
    background: #eef5fb;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
    border: 1px solid #cbd5e0;
    text-align: center;
  }
  
  .grafica p {
    color: #5b97c9;
    font-size: 1rem;
  }
  
  .btn-volver {
    position: fixed;
    bottom: 20px; /* ahora usa bottom */
    right: 20px;  /* ahora usa right */
    background-color: #003366;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    z-index: 950;
    transition: background-color 0.3s ease;
  }
  
  .btn-volver:hover {
    background-color: #5b97c9;
  }
  
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* ----------------- NUEVOS ESTILOS RESPONSIVOS ----------------- */
  
  
  @media (max-width: 768px) {
    .side-menu {
      width: 250px;
      left: -250px;
    }
  
    .menu-visible {
      left: 0;
    }
  
    .menu-visible ~ .perfil-estudiante {
      transform: translateX(250px);
      transition: transform 0.3s ease;
    }
  
    .perfil-estudiante {
      position: static;
      width: 85%;
      margin: 80px 20px 20px 20px;
      height: auto;
      z-index: 800;
      margin-right: 30px;
    }
  
    .contenido {
      padding: 20px;
      margin-right: 30px;
    }
  
    .bienvenida {
      width: 90%;
      margin: 20px auto;
      padding: 20px;
      box-sizing: border-box;
      margin-right: 30px;
    }
  
    body, .inicio-admin {
      background-color: #e9f1f7;
    }
  
    .grafica {
      margin-top: 15px;
      margin-right: 30px;
    }
  
    .btn-volver {
      right: 20%;
      transform: translateX(50%); /* Moverlo a la izquierda la mitad de su ancho */
      bottom: 20px;
    }
  
    .menu-abierto .btn-volver {
      right: 20px;
      transform: none;
    }
    .logo-text{
        display: none;
        
    }
  
  }
  
  @media (max-width: 480px) {
    header {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .logo {
      margin-bottom: 10px;
    }
  
    .logo-text{
        display: none;
        
    }
  
    .menu-toggle {
      top: 15px;
      right: 15px;
      font-size: 22px;
    }
  
    .side-menu {
      width: 200px;
      left: -200px;
    }
  
    .menu-visible {
      left: 0;
    }
  
    .menu-visible ~ .perfil-estudiante {
      transform: translateX(200px);
      transition: transform 0.3s ease;
    }
  
    .perfil-estudiante {
      position: static;
      width: 80%;
      margin: 80px 20px 20px 20px;
      height: auto;
      z-index: 800;
      margin-right: 30px;
    }
  
    .perfil-nombre {
      font-size: 0.9rem;
    }
  
    .bienvenida h2 {
      font-size: 20px;
    }
  
    .bienvenida ul li {
      font-size: 0.95rem;
    }
  
    .contenido {
      margin-right: 30px;
      padding: 20px;
    }
  }
  </style>
  
    