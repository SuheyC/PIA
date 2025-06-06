<template>
    <div class="informacion">
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
          <h1>¡MEJORA TU RENDIMIENTO ACADÉMICO CON EL PIA!</h1>
          <p><strong>¿QUÉ ES EL PIA?</strong></p>
          <p>
            El Programa Institucional de Asesorías está diseñado para brindar apoyo académico a estudiantes, ofreciendo asesorías especializadas en materias clave para ayudarte a superar dificultades y mejorar tu comprensión.
          </p>
          <p><strong>¿POR QUÉ ES IMPORTANTE?</strong></p>
          <div class="hero-content">
            <ul>
              <li>Ayuda a consolidar conocimientos en temas complejos.</li>
              <li>Refuerza habilidades esenciales para tu desarrollo académico.</li>
              <li>Te permite alcanzar tus metas y objetivos académicos.</li>
            </ul>
            <img src="@/assets/informacion.jpg" alt="Personas estudiando" class="hero-image" />
          </div>
          <p><strong>¿CÓMO REGISTRARTE?</strong></p>
          <p>
            Presiona el Botón de Iniciar asesorías, regístrate y selecciona la materia o tema en la cual necesitas una asesoría.
          </p>
          <p><strong>¡NO DEJES PASAR ESTA OPORTUNIDAD!</strong></p>
          <div class="cta-footer">
            <span>I.T.E.</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PaginaInformacion',
    methods: {
      irAVisitaBienvenida() {
        this.$router.push({ name: 'bienvenida' });
      },
      irAPaginaInformacion() {
        this.$router.push({ name: 'pagina-informacion' });
      },
      irAIniciarAsesorias() {
        this.$router.push({ name: 'iniciar-asesorias' });
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  
  .informacion {
    font-family: 'Poppins', sans-serif;
    color: #000; /* Texto en negro */
    background-color: #5b97c9; /* Color más claro derivado de #003366 */
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
    color: #003366; /* Texto azul oscuro */
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .nav-btn:hover {
    background-color: #d9e1e8;
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
  
  .hero-text p {
    font-size: 20px;
    line-height: 1.6;
  }
  
  .hero-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-top: 1cm;
    margin-bottom: 2cm;
  }
  
  .hero-content ul {
    list-style-type: disc;
    padding-left: 2cm;
    text-align: left;
    flex: 1;
    font-size: 20px;
  }
  
  .hero-image {
    max-width: 45%;
    height: auto;
    border-radius: 8px;
    padding-right: 20px;
  }
  
  .hero-text strong {
    font-size: 30px;
    color: #003366; /* Azul oscuro */
  }
  
  .cta-footer {
    margin-top: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #003366;
  }
  
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
      text-align: center;
    }
  
    .subject-list {
      text-align: center;
    }
  
    .hero-image {
      max-width: 80%;
      margin-top: 20px;
    }
  }
  </style>
  
  