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
          <li><button @click="irInicioAdmin"><i class="fa fa-home"></i> Inicio</button></li>
          <li><button @click="cerrarSesion"><i class="fa fa-sign-out-alt"></i> Cerrar sesión</button></li>
          <li><button @click="verUsuarios"><i class="fa fa-users"></i> Usuarios</button></li>
          <li><button @click="verInformes"><i class="fa fa-chart-line"></i> Informes</button></li>
          <li><button @click="verNotificaciones"><i class="fa fa-bell"></i> Notificaciones</button></li>
          <li><button @click="verConfiguracion"><i class="fa fa-cogs"></i> Configuración</button></li>
        </ul>
      </nav>
  
      
  
      <main class="contenido">
        <div class="bienvenida">
          <h2>Desempeño del Asesor</h2>
          <div class="grafica">
            <canvas id="graficaDesempeno" width="400" height="200"></canvas>
          </div>
  
          <h2>Categorías de evaluación</h2>
          <ul>
            <li>Asistencia: <span>{{ evaluaciones.asistencia }}%</span></li>
            <li>Conocimiento del tema: <span>{{ evaluaciones.conocimientoTema }}%</span></li>
            <li>Claridad en la explicación: <span>{{ evaluaciones.claridadExplicacion }}%</span></li>
            <li>Disponibilidad: <span>{{ evaluaciones.disponibilidad }}%</span></li>
            <li>Actitud y profesionalismo: <span>{{ evaluaciones.actitudProfesionalismo }}%</span></li>
            <li>Organización: <span>{{ evaluaciones.organizacion }}%</span></li>
            <li>Enfoque práctico: <span>{{ evaluaciones.enfoquePractico }}%</span></li>
            <li>Comunicación: <span>{{ evaluaciones.comunicacion }}%</span></li>
            <li>Compromiso con tu aprendizaje: <span>{{ evaluaciones.compromisoAprendizaje }}%</span></li>
            <li>Tiempo dedicado: <span>{{ evaluaciones.tiempoDedicado }}%</span></li>
            <li>Satisfacción general: <span>{{ evaluaciones.satisfaccionGeneral }}%</span></li>
            <li>Comentarios: <span>{{ evaluaciones.comentarios }}</span></li>
          </ul>
  
          <div v-if="totalEvaluacion >= 70" class="aprobado">
            <p>¡El asesor está aprobado con un total de {{ totalEvaluacion }}!</p>
          </div>
          <div v-else class="reprobado">
            <p>El asesor no ha alcanzado el mínimo con un total de {{ totalEvaluacion }}.</p>
          </div>
        </div>
        <button class="btn-volver" @click="volverAListaAsesores">
          ← Volver
        </button>
      </main>
    </div>
  </template>
  
  <script>
  import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
  
  Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);
  
  export default {
    name: 'PerfilAsesor',
    data() {
      return {
        menuVisible: false,
        asesor: {},
        evaluaciones: {
          asistencia: 90,
          conocimientoTema: 85,
          claridadExplicacion: 88,
          disponibilidad: 92,
          actitudProfesionalismo: 80,
          organizacion: 75,
          enfoquePractico: 89,
          comunicacion: 91,
          compromisoAprendizaje: 95,
          tiempoDedicado: 93,
          satisfaccionGeneral: 85,
          comentarios: 'Muy buen desempeño general.'
        },
      };
    },
    created() {
      const id = this.$route.params.id;
      const asesores = [
        { id: 1, nombre: 'Juan Pérez', especialidad: 'Matemáticas', gradoAcademico: 'Maestría', correo: 'carlos@example.com', telefono: '555-1234' },
        { id: 2, nombre: 'María González', especialidad: 'Física', gradoAcademico: 'Doctorado', correo: 'marta@example.com', telefono: '555-5678' },
        { id: 3, nombre: 'Carlos López', especialidad: 'Programación', gradoAcademico: 'Licenciatura', correo: 'jose@example.com', telefono: '555-8765' },
      ];
      this.asesor = asesores.find(e => e.id == id) || {};
    },
    mounted() {
      this.crearGrafica();
    },
    computed: {
      totalEvaluacion() {
        return (
          this.evaluaciones.asistencia +
          this.evaluaciones.conocimientoTema +
          this.evaluaciones.claridadExplicacion +
          this.evaluaciones.disponibilidad +
          this.evaluaciones.actitudProfesionalismo +
          this.evaluaciones.organizacion +
          this.evaluaciones.enfoquePractico +
          this.evaluaciones.comunicacion +
          this.evaluaciones.compromisoAprendizaje +
          this.evaluaciones.tiempoDedicado +
          this.evaluaciones.satisfaccionGeneral
        ) / 11;
      },
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
            labels: ['Asistencia', 'Conocimiento del tema', 'Claridad en la explicación', 'Disponibilidad', 'Actitud y profesionalismo', 'Organización', 'Enfoque práctico', 'Comunicación', 'Compromiso con tu aprendizaje', 'Tiempo dedicado', 'Satisfacción general'],
            datasets: [{
              label: 'Desempeño del Asesor',
              data: [
                this.evaluaciones.asistencia,
                this.evaluaciones.conocimientoTema,
                this.evaluaciones.claridadExplicacion,
                this.evaluaciones.disponibilidad,
                this.evaluaciones.actitudProfesionalismo,
                this.evaluaciones.organizacion,
                this.evaluaciones.enfoquePractico,
                this.evaluaciones.comunicacion,
                this.evaluaciones.compromisoAprendizaje,
                this.evaluaciones.tiempoDedicado,
                this.evaluaciones.satisfaccionGeneral
              ],
              backgroundColor: '#5b97c9',
              borderColor: '#003366',
              borderWidth: 1,
            }],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          },
        });
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
      volverAListaAsesores() {
        this.$router.push({ name: 'ListaAsesores' });
      },
    },
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
  
  .menu-visible ~ .perfil-asesor {
    transform: translateX(1100px);
    transition: transform 0.3s ease;
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
    margin-right: 15px;
  }
  
  nav ul button:hover {
    background: rgba(255, 255, 255, 0.2);
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
  
  .perfil-asesor {
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
  
  .perfil-asesor h2 {
    color: #003366;
    font-size: 25px;
    margin-bottom: 10px;
  }
  
  .perfil-asesor p {
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
    .logo-text{
        display: none;

    }
    .side-menu {
      width: 250px;
      left: -250px;
    }
  
    .menu-visible {
      left: 0;
    }
  
    .menu-visible ~ .perfil-asesor {
      transform: translateX(250px);
      transition: transform 0.3s ease;
    }
  
    .perfil-asesor {
      position: static;
      width: 85%;
      margin: 80px 20px 20px 20px;
      height: auto;
      z-index: 800;
      margin-right: 30px;
    }
  
    .contenido {
      padding: 20px;
      margin-right: 0px;
    }
  
    .bienvenida {
      width: 90%;
      margin: 20px 20px 0px 0px;
      padding: 20px;
      box-sizing: border-box;
      
    }
  
    body, .inicio-admin {
      background-color: #e9f1f7;
    }
  
    .grafica {
      margin-top: 15px;
      margin-right: 0px;
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

  
  }
  
  @media (max-width: 480px) {
    .logo-text{
        display: none;
        
    }
    header {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .logo {
      margin-bottom: 10px;
    }
  
    .logo-text {
      font-size: 16px;
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
  
    .menu-visible ~ .perfil-asesor {
      transform: translateX(200px);
      transition: transform 0.3s ease;
    }
  
    .perfil-asesor {
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
    