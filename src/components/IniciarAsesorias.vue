<template>
  <div class="bienvenida">
    <header>
      <div class="logo">
        <img src="@/assets/tecnm.png" alt="Tecnológico">
        <img src="@/assets/ite.png" alt="ITE">
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

    <main class="contenido">
      <div class="card shadow-lg">
        <div class="card-header text-center">
          <h3>Selecciona tu Rol</h3>
        </div>
        <div class="card-body text-center">
          <p>Por favor, selecciona el rol para iniciar:</p>
          <div class="botones-roles">
            <button class="btn btn-primary" @click="redirigir('admin')">Administrador</button>
            <button class="btn btn-success" @click="redirigir('asesor')">Asesor</button>
            <button class="btn btn-info" @click="redirigir('estudiante')">Estudiante</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'IniciarAsesorias',
  methods: {
    redirigir(role) {
      console.log(`Redirigiendo al rol: ${role}`);
      this.$router.push(`/${role}/inicio`);
    },
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
/* Estilos generales */
.bienvenida {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #fff;
  background-color: #5b97c9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fdfcfc;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav-buttons {
  display: flex;
}

nav button {
  margin: 0 10px;
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

.cta {
  background-color: #ffc107;
  color: #000;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
}

.cta:hover {
  background-color: #e0a800;
}

/* Contenido Principal */
.contenido {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;
  flex-grow: 1;
  padding: 20px;
  box-sizing: border-box;
}

.card {
  max-width: 500px;
  width: 90%;
  border: none;
  border-radius: 15px; /* Bordes redondeados más pronunciados */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombras sutiles */
  overflow: hidden;
  transition: transform 0.3s ease; /* Transición suave al pasar el cursor */
}

.card:hover {
  transform: scale(1.02); /* Efecto de agrandar la card al pasar el cursor */
}

.card-header {
  background: #ffffff;
  color: #000;
  font-weight: bold;
  padding: 15px;
  font-size: 1.3rem;
  border-bottom: 2px solid #eee; /* Borde sutil en la parte inferior */
}

.card-body {
  padding: 25px;
  background: #fff;
  border-radius: 0 0 15px 15px; /* Bordes redondeados en la parte inferior */
}

/* Botones de roles */
.botones-roles {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
}

.botones-roles button {
  width: 80%;
  font-size: 1rem;
  padding: 12px;
  border-radius: 20px; /* Bordes redondeados en los botones */
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease; /* Efecto de transición */
  background-color: #9ca0a3;
  color: #fff;
  border: none;
}

.botones-roles button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada al pasar el cursor */
}

.botones-roles .btn-success {
  background-color: #9ca0a3;
}

.botones-roles .btn-info {
  background-color: #003366;
}

/* Responsividad */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }

  .logo {
    margin-bottom: 10px;
    flex-wrap: wrap;
    text-align: center;
  }

  nav {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
  }

  .nav-buttons {
    flex-direction: column;
    width: 100%;
  }

  .nav-buttons .nav-btn,
  .cta {
    width: 100%;
    margin-bottom: 10px;
  }
}


@media (max-width: 480px) {
  .logo img {
    height: 40px;
  }

  .card {
    max-width: 100%;
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

  .botones-roles button {
    width: 100%;
  }
}
</style>
