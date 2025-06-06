<template>
  <div class="inicio-estudiante">
    <header>
      <div class="logo">
        <img src="@/assets/tecnm.png" alt="Tecnológico">
        <img src="@/assets/ite.png" alt="ite">
        <span class="logo-text">TECNOLÓGICO NACIONAL DE MÉXICO</span>
      </div>
      <nav>
        <div class="nav-buttons">
          <button class="nav-btn" @click="irAVisitaBienvenida">Inicio</button>
          <button class="nav-btn" @click="irAPaginaInformacion">Información</button>
        </div>
        <button class="cta" @click="irAIniciarAsesorias">Volver atrás</button>
      </nav>
    </header>

    <div class="card-container">
      <div class="card shadow-lg">
        <div class="card-header text-center">
          <h3>Iniciar Sesión</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="iniciarSesion">
            <div class="form-group">
              <label for="matricula">Número de matrícula</label>
              <input
                type="text"
                id="matricula"
                v-model="matricula"
                class="form-control"
                placeholder="Introduce tu número de matrícula"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input
                type="password"
                id="password"
                v-model="password"
                class="form-control"
                placeholder="Introduce tu contraseña"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary btn-block">
              Iniciar Sesión
            </button>
          </form>

          <div class="registro">
            <p>¿No tienes cuenta? <a @click="irARegistroEstudiante">Regístrate</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InicioEstudiante',
  data() {
    return {
      matricula: '',
      password: ''
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
    },
    irARegistroEstudiante() {
      this.$router.push({ name: 'registro-estudiante' });
    },
    async iniciarSesion() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios', {
          params: {
            rol: 'estudiante',
            matricula: this.matricula,
            password: this.password
          }
        });

        if (response.data.length > 0) {
          const usuario = response.data[0];

          localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
          localStorage.setItem('nombreUsuario', usuario.nombre);
          localStorage.setItem('perfilImagen', usuario.fotoPerfil || '');

          // ✅ Líneas clave añadidas
          localStorage.setItem('usuarioId', usuario.matricula || usuario.empleado);
          localStorage.setItem('rol', usuario.rol || 'estudiante');

          console.log('Autenticación exitosa');
          this.$router.push({ name: 'bienvenida-estudiante' });
        } else {
          alert('Credenciales incorrectas. Por favor, intenta de nuevo.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
      }
    }
  }
};
</script>

  <style scoped>
  .inicio-estudiante {
    background-color: #5b97c9;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
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
  
  .card-container {
    max-width: 400px;
    width: 100%;
    margin: 3cm;
  }
  
  .card {
    border-radius: 10px;
    overflow: hidden;
    border: none;
  
  }
  
  .card-header {
    background-color: #003366;
    color: #fff;
    font-weight: bold;
    padding: 15px;
  }
  
  .card-body {
    padding: 25px;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  
  }
  
  label {
    font-weight: bold;
  
  }
  
  input[type='text'],
  input[type='password'] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
  
  button[type='submit'] {
  
    width: 100%;
    padding: 12px;
    background-color: #003366;
    color: white;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button[type='submit']:hover {
    background-color: #00214d;
  }
  
  .registro {
    margin-top: 15px;
    text-align: center;
  }
  
  .registro a {
    color: #003366;
    text-decoration: none;
    font-weight: bold;
  }
  
  .registro a:hover {
    color: #00214d;
  }
  
  @media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: flex-start; /* Mantiene alineación a la izquierda */
    padding: 15px;
  }

  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
  }

  .logo img {
    height: 40px;
    margin-right: 10px;
  }

  .logo-text {
    display: none;
  }

  nav {
    flex-direction: column;
    margin-top: 10px;
    width: 100%;
    align-items: center;
  }

  .nav-buttons,
  .cta {
    width: 100%;
  }

  .nav-btn,
  .cta {
    width: 100%;
    margin-bottom: 10px;
  }

  .card-container {
    width: 90%; /* Cambié el ancho a 90% para añadir espacio a los lados */
    margin: 20px auto; /* Centramos el contenido y añadimos un margen de 20px arriba y abajo */
    padding: 10px;
  }

  .card {
    border-radius: 10px;
    overflow: hidden;
    border: none;
  }
}



  </style>
  