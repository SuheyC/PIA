<template>
  <div class="bienvenida">
    <header>
      <div class="logo">
        <img src="@/assets/tecnm.png" alt="Tecnologico">
        <img src="@/assets/ite.png" alt="ite"> 
        <span>TECNOLÓGICO NACIONAL DE MÉXICO</span>
      </div>
      <nav>
        <div class="nav-buttons">
          <button class="nav-btn" @click="irAVisitaBienvenida">Inicio</button>
          <button class="nav-btn" @click="irAPaginaInformacion">Información</button>
        </div>
        <button class="cta" @click="irAIniciarAsesorias">Iniciar Asesorías</button>
      </nav>
    </header>

    <div class="hero">
      <div class="hero-text">
        <h1>Programa Institucional de Asesorías</h1>
        <h2>PIA</h2>
        <p>¿Necesitas apoyo académico? Te invitamos a aprovechar la asesoría gratuita del Programa Interno de Asesorías (PIA) 
          del Instituto Tecnológico de Ensenada. Nuestro objetivo es ayudarte a mejorar tu desempeño académico a través de 
          la orientación de docentes y estudiantes en las siguientes asignaturas:</p>
      </div>
      <div class="hero-content">
        <div class="subject-list">
          <ul>
            <li v-for="subject in subjects" :key="subject">{{ subject }}</li>
          </ul>
        </div>
        <div class="image-container">
          <img src="@/assets/asesoria.jpg" alt="Personas estudiando">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VisitaBienvenida',
  data() {
    return {
      subjects: [
        'Administración de Bases de Datos', 'Álgebra', 'Álgebra lineal', 'Álgebra/Precálculo',
        'Cálculo Diferencial', 'Cálculo Integral', 'Cálculo Vectorial', 'Contabilidad',
        'Dibujo Asistido', 'Dibujo en SolidWorks', 'Dinámica', 'Electromagnetismo',
        'Electrónica Básica', 'Estadística', 'Estática', 'Física', 
        'Fundamentos de Bases de Datos', 'Fundamentos de Investigación',
        'Programación Básica', 'Química', 'Taller de Bases de Datos',
        'Taller de Investigación 1', 'Taller de Investigación 2', 'Vibraciones mecánicas'
      ]
    };
  },
  methods: {
    irAIniciarAsesorias() {
      this.$router.push({ name: 'iniciar-asesorias' });
    },
    irAVisitaBienvenida() {
      this.$router.push({ name: 'bienvenida' });
    },
    irAPaginaInformacion() {
      this.$router.push({ name: 'pagina-informacion' });
    }
  }
};
</script>

<style scoped>
.bienvenida {
  font-family: 'Poppins', sans-serif;
  color: #fff;
  background-color: #003366;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fdfcfc;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

nav {
  display: flex;
}

nav button {
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ffffff;
  color: #333;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.nav-btn:hover {
  background-color: #f0f0f0;
}

nav .cta {
  background-color: #ffc107;
  color: #000;
}

.hero {
  text-align: center;
  padding: 30px;
}

.hero-text {
  margin-bottom: 20px;
}

.hero-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  text-align: left;
}

.subject-list {
  flex: 1;
  max-width: 50%;
}

.subject-list ul {
  list-style-type: disc;
  padding-left: 20px;
}

.image-container {
  flex: 1;
  max-width: 40%;
  text-align: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    text-align: center;
  }

  nav {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
  }

  nav button {
    width: 100%;
    margin-bottom: 10px;
  }

  .hero-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .subject-list {
    max-width: 80%;
  }

  .image-container {
    max-width: 80%;
    margin-top: 20px;
  }
}
</style>
