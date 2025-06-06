<template>
  <div class="inicio-estudiante">
    <!-- Header -->
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
    <div class="editar-asesoria">
      <h1>Editar Asesoría</h1>
      <form @submit.prevent="guardarEdicion">
        <div class="form-group">
          <label for="materia">Materia:</label>
          <input type="text" id="materia" v-model="asesoriaData.materia" placeholder="Ingrese la materia" required />
        </div>
        <div class="form-group">
          <label for="asesor">Asesor:</label>
          <input type="text" id="asesor" v-model="asesoriaData.asesor" placeholder="Ingrese el nombre del asesor" required />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="fecha">Fecha:</label>
            <input type="date" id="fecha" v-model="asesoriaData.fecha" required />
          </div>
          <div class="form-group">
            <label for="hora">Hora:</label>
            <input type="time" id="hora" v-model="asesoriaData.hora" required />
          </div>
        </div>
        <div class="button-container">
          <button type="submit" class="btn-guardar">Guardar Cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditarAsesoriaEstudiante',
  data() {
    return {
      menuVisible: false,
      nombreUsuario: 'usuario',
      perfilImagen: '',
      asesoriaData: {
        id: null,
        materia: "",
        asesor: "",
        fecha: "",
        hora: "",
        estado: "Confirmada"
      }
    };
  },
  mounted() {
    this.cargarAsesoria();
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    irInicioEstudiante() {
      this.$router.push({ name: 'bienvenida-estudiante' });
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
      this.$router.push({ name: 'SolicitarAsesoria' });
    },
    mandarMensaje() {
      this.$router.push({ name: 'MandarMensaje' });
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
    cargarAsesoria() {
      const id = this.$route.params.id;
      axios.get(`http://localhost:3000/asesorias/${id}`)
        .then(response => {
          const asesoria = response.data;
          if (asesoria.estado.toLowerCase() === 'pendiente') {
            this.asesoriaData = asesoria;
          } else {
            alert('Solo puedes editar asesorías con estado pendiente.');
            this.$router.push({ name: 'MisAsesoriasEstudiante' });
          }
        })
        .catch(error => {
          console.error('Error al cargar asesoría:', error);
          alert('No se pudo cargar la asesoría.');
          this.$router.push({ name: 'MisAsesoriasEstudiante' });
        });
    },
    guardarEdicion() {
      axios.put(`http://localhost:3000/asesorias/${this.asesoriaData.id}`, this.asesoriaData)
        .then(() => {
          alert('Asesoría editada con éxito');
          this.$router.push({ name: 'MisAsesoriasEstudiante' });
        })
        .catch(error => {
          console.error('Error al guardar los cambios:', error);
        });
    }
  }
};
</script>

  <style scoped>
  /* Estilos generales */
  .inicio-estudiante {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(135deg, #5b97c9, #003366);
    padding-top: 70px;
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
    border: none;
    cursor: pointer;
    background: none;
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
    margin: 10px;
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
  
  /* Formulario */
  .editar-asesoria {
    background: white;
    margin: 30px auto 30px;
    padding: 40px 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    animation: fadeIn 0.6s ease;
  }
  
  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
       }
  
  h1 {
    font-size: 26px;
    color: #003366;
    text-align: center;
    margin-bottom: 30px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .form-row {
    display: flex;
    gap: 20px;
  }
  
  .form-row .form-group {
    flex: 1;
  }
  
  label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #003366;
  }
  
  input, select {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s;
  }
  
  input:focus, select:focus {
    border-color: #5b97c9;
    outline: none;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
  }
  
  .btn-guardar {
    background-color: #003366;
    color: white;
    font-weight: bold;
    padding: 12px 30px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s;
  }
  
  .btn-guardar:hover {
    background-color: #5b97c9;
  }

  @media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .editar-asesoria {
    padding: 20px 15px;
    margin-top: 90px;
    width: 80%;
  }

  .btn-guardar {
    width: 100%;
    font-size: 16px;
  }

  .menu-toggle {
    font-size: 22px;
    top: 15px;
    right: 15px;
  }

  header {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }

  .logo {
    flex-direction: column;
    align-items: flex-start;
  }

  .logo-text {
    font-size: 0px;
    padding-left: 0;
    margin-top: 8px;
  }

  .logo img {
    height: 40px;
    margin-right: 0;
    margin-bottom: 5px;
  }

  .side-menu {
    width: 50%;
    left: -100%;
  }

  .menu-visible {
    left: 0;
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

  .side-menu button {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 22px;
  }

  label {
    font-size: 14px;
  }

  input, select {
    font-size: 14px;
    padding: 10px;
  }

  .btn-guardar {
    padding: 10px 20px;
  }
}


  </style>
  