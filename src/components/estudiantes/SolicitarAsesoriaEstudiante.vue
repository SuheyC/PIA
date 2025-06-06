<template>
  <div class="solicitar-asesoria">
    <header>
      <div class="logo">
        <img src="@/assets/tecnm.png" alt="Tecnológico" />
        <img src="@/assets/ite.png" alt="ITE" />
        <span class="logo-text">TECNOLÓGICO NACIONAL DE MÉXICO</span>
      </div>
      <button class="menu-toggle" @click="toggleMenu">☰</button>
    </header>

    <!-- Menú lateral -->
    <nav :class="{ 'side-menu': true, 'menu-visible': menuVisible }">
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

    <!-- Formulario principal -->
    <main class="contenido">
      <div class="solicitud-container animate-fade-in">
        <h1>Generar Solicitud de Asesoría</h1>

        <div class="dropdown">
          <label>Selecciona una materia:</label>
          <select v-model="selectedMateria" @change="updateTemas">
            <option disabled value="">Selecciona una opción</option>
            <option v-for="materia in materias" :key="materia">{{ materia }}</option>
          </select>
        </div>

        <div class="dropdown" v-if="temas.length">
          <label>Selecciona un tema:</label>
          <select v-model="selectedTema" @change="updateMaestros">
            <option disabled value="">Selecciona una opción</option>
            <option v-for="tema in temas" :key="tema">{{ tema }}</option>
          </select>
        </div>

        <div class="dropdown" v-if="maestros.length">
          <label>Selecciona un maestro:</label>
          <select v-model="selectedMaestro">
            <option disabled value="">Selecciona una opción</option>
            <option v-for="maestro in maestros" :key="maestro">{{ maestro }}</option>
          </select>
        </div>

        <!-- Errores -->
        <div v-if="errores.length" class="errores">
          <ul>
            <li v-for="(error, i) in errores" :key="i">{{ error }}</li>
          </ul>
        </div>

        <!-- Campos adicionales -->
        <div class="formulario">
          <div class="form-group">
            <label for="descripcion">Descripción:</label>
            <input id="descripcion" v-model="form.descripcion" type="text" />
          </div>
          <div class="form-group">
            <label for="fechaPreferida">Fecha preferida:</label>
            <input id="fechaPreferida" v-model="form.fechaPreferida" type="date" />
          </div>
          <div class="form-group">
            <label for="horaPreferida">Hora preferida:</label>
            <input id="horaPreferida" v-model="form.horaPreferida" type="time" />
          </div>

          <button @click="generarSolicitud" :disabled="!isFormValid">
            Generar Solicitud
          </button>
        </div>
      </div>
    </main>

    <!-- Confirmación -->
    <div v-if="showConfirmation" class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <h2>¡Muchas gracias!</h2>
          <p>Tu solicitud se ha creado exitosamente.</p>
          <button @click="closeConfirmation">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SolicitarAsesoria',
  data() {
    return {
      menuVisible: false,
      perfilImagen: null,
      nombreUsuario: 'Nombre del Usuario',

      materias: ['Matemáticas', 'Física', 'Química', 'Programación', 'Historia'],
      temasPorMateria: {
        'Matemáticas': ['Álgebra', 'Cálculo', 'Geometría'],
        'Física': ['Mecánica', 'Termodinámica', 'Óptica'],
        'Química': ['Química orgánica', 'Química inorgánica'],
        'Programación': ['JavaScript', 'Python', 'Bases de datos'],
        'Historia': ['Historia mundial', 'Historia de México'],
      },
      maestrosPorTema: {
        'Álgebra': ['Mtro. Ramírez', 'Mtra. Sánchez'],
        'Cálculo': ['Mtro. López'],
        'Geometría': ['Mtra. Castillo'],
        'Mecánica': ['Mtra. Paredes'],
        'Termodinámica': ['Mtro. Vega'],
        'Óptica': ['Mtra. Díaz'],
        'Química orgánica': ['Mtro. Franco'],
        'Química inorgánica': ['Mtra. Moreno'],
        'JavaScript': ['Mtra. Ruiz'],
        'Python': ['Mtro. Navarro'],
        'Bases de datos': ['Mtro. Zamora'],
        'Historia mundial': ['Mtra. Ortega'],
        'Historia de México': ['Mtro. Beltrán'],
      },

      selectedMateria: '',
      selectedTema: '',
      selectedMaestro: '',
      temas: [],
      maestros: [],

      form: {
        descripcion: '',
        fechaPreferida: '',
        horaPreferida: '',
      },
      errores: [],
      showConfirmation: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.selectedMateria &&
        this.selectedTema &&
        this.selectedMaestro &&
        this.form.descripcion.trim() &&
        this.form.fechaPreferida &&
        this.form.horaPreferida
      );
    },
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    irInicioEstudiante() {
      this.$router.push({ name: "bienvenida-estudiante" });
    },
    editarPerfil() {
      this.$router.push({ name: "EditarPerfilEstudiante" });
    },
    cerrarSesion() {
      this.$router.push({ name: "CerrarSesionEstudiante" });
    },
    verAsesorias() {
      this.$router.push({ name: "MisAsesoriasEstudiante" });
    },
    solicitarAsesoria() {
      this.$router.push({ name: "SolicitarAsesoria" });
    },
    mandarMensaje() {
      this.$router.push({ name: "MandarMensaje" });
    },
    verReportes() {
      this.$router.push({ name: "ReporteEstudiante" });
    },
    verNotificaciones() {
      this.$router.push({ name: "NotificacionesEstudiante" });
    },
    verConfiguracion() {
      this.$router.push({ name: "ConfiguracionEstudiante" });
    },

    updateTemas() {
      this.temas = this.temasPorMateria[this.selectedMateria] || [];
      this.selectedTema = '';
      this.updateMaestros();
    },
    updateMaestros() {
      this.maestros = this.selectedTema ? this.maestrosPorTema[this.selectedTema] || [] : [];
      this.selectedMaestro = '';
    },
    async generarSolicitud() {
      this.errores = [];

      if (!this.isFormValid) {
        if (!this.selectedMateria) this.errores.push('Materia es obligatoria.');
        if (!this.selectedTema) this.errores.push('Tema es obligatorio.');
        if (!this.selectedMaestro) this.errores.push('Maestro es obligatorio.');
        if (!this.form.descripcion.trim()) this.errores.push('Descripción es obligatoria.');
        if (!this.form.fechaPreferida) this.errores.push('Fecha es obligatoria.');
        if (!this.form.horaPreferida) this.errores.push('Hora es obligatoria.');
        return;
      }

      const solicitud = {
        id: Date.now(),
        materia: this.selectedMateria,
        tema: this.selectedTema,
        asesor: this.selectedMaestro,
        descripcion: this.form.descripcion.trim(),
        fecha: this.form.fechaPreferida,
        hora: this.form.horaPreferida,
        estado: 'Pendiente',
      };

      const res1 = await axios.post('http://localhost:3000/asesorias', solicitud);
      const res2 = await axios.post('http://localhost:3000/solicitudes', solicitud);
      if(res1 || res2){
        console.log("Hola")
      }

      this.showConfirmation = true;

      this.selectedMateria = '';
      this.selectedTema = '';
      this.selectedMaestro = '';
      this.temas = [];
      this.maestros = [];
      this.form = { descripcion: '', fechaPreferida: '', horaPreferida: '' };
    },
    closeConfirmation() {
      this.showConfirmation = false;
    },
  },
  mounted() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    if (usuarioActual && usuarioActual.nombre) {
      this.nombreUsuario = usuarioActual.nombre;
    }
  }
};
</script>


  
  <style scoped>
  .solicitar-asesoria {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #5b97c9, #003366);
  min-height: 100vh;
  overflow: hidden;
  padding-top: 100px;
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
    border: none;
    cursor: pointer;
    background: none;
    width: 50px;
    height: 60px;
    background-color: #eaeaea;
    color: #003366;
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

  .solicitar-asesoria {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px; /* Para evitar que el contenido se superponga al header */
  }
  
  .solicitud-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 90%;
    max-width: 600px;
  }
  
  h1 {
    color: #003366;
    text-align: center;
  }
  
  .dropdown {
    position: relative;
    margin-bottom: 20px;
  }

  .dropdown select {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #5b97c9;
    background-color: #ffffff;
    color: #003366;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .dropdown select:focus {
    border-color: #003366;
    box-shadow: 0 0 5px rgba(0, 51, 102, 0.5);
  }

  .dropdown select option {
    padding: 10px;
    background-color: #ffffff;
    color: #003366;
    font-size: 16px;
  }

  .dropdown select option:hover {
    background-color: #f0f8ff;
  }

  /* Agregando icono de flecha */
  .dropdown::after {
    
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #003366;
    font-size: 18px;
    pointer-events: none;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #003366;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #5b97c9;
  }
  
  button:disabled {
    background-color: #b0c4de;
  }

  .form-group label {
  display: block;
  font-weight: 600;
  color: #003366;
  margin-bottom: 6px;
  font-size: 1rem;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #5b97c9;
  border-radius: 8px;
  font-size: 16px;
  color: #003366;
  background-color: #f9faff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
  box-sizing: border-box;
}

input:focus {
  border-color: #003366;
  box-shadow: 0 0 6px rgba(0, 51, 102, 0.6);
  background-color: #ffffff;
}

.input-error {
  border-color: #e74c3c;
  background-color: #fdecea;
}

.input-error:focus {
  border-color: #c0392b;
  box-shadow: 0 0 6px rgba(192, 57, 43, 0.7);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-content h2 {
  color: #003366;
  font-size: 24px;
  margin-bottom: 10px;
}

.modal-content p {
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
}

.modal-content button {
  background-color: #003366;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.modal-content button:hover {
  background-color: #5b97c9;
}


  @media (max-width: 768px) {
  .solicitar-asesoria {
    padding-top: 120px;
    flex-direction: column;
  }

  header {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;
  }

  .logo {
 
    align-items: flex-start;
  }

  .logo img {
    height: 40px;
    margin-bottom: 5px;
  }

  .logo-text {
    font-size: 0px;
    text-align: left;
  }

  .menu-toggle {
    position: fixed;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 45px;
    font-size: 22px;
  }

  .side-menu {
    width: 100%;
    left: -100%;
    top: 60px;
    z-index: 999;
  }

  .menu-visible {
    left: 0;
  }

  .solicitud-container {
    width: 85%;
    padding: 15px;
    margin: auto;
  }

  h1 {
    font-size: 20px;
  }

  .dropdown select {
    font-size: 14px;
    padding: 10px;
  }

  button {
    font-size: 14px;
    padding: 10px;
  }

  nav ul button {
    font-size: 14px;
    padding: 10px;
  }

  .perfil-nombre {
    font-size: 0.9rem;
  }
}

  </style>
  