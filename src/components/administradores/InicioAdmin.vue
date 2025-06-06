<template>
  <div class="inicio-admin">
    <header>
      <div class="logo">
        <img src="@/assets/tecnm.png" alt="Tecnológico">
        <img src="@/assets/ite.png" alt="ite">
        <span>TECNOLÓGICO NACIONAL DE MÉXICO</span>
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
              <label for="empleado">Número de Empleado</label>
              <input
                type="text"
                id="empleado"
                v-model="empleado"
                class="form-control"
                placeholder="Introduce tu número de empleado"
                required
              />
            </div>
            <div class="form-group">
              <label for="username">Usuario</label>
              <input
                type="text"
                id="username"
                v-model="username"
                class="form-control"
                placeholder="Introduce tu usuario"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InicioAdmin',
  data() {
    return {
      empleado: '',
      username: '',
      password: ''
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios', {
          params: {
            rol: 'admin',
            empleado: this.empleado,
            nombre: this.username,
            password: this.password
          }
        });

        if (response.data.length > 0) {
          const usuario = response.data[0];

          // Guardar información en localStorage
          localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
          localStorage.setItem('nombreUsuario', usuario.nombre);
          localStorage.setItem('perfilImagen', usuario.fotoPerfil || '');
          localStorage.setItem('usuarioId', usuario.empleado);
          localStorage.setItem('rol', usuario.rol || 'admin');

          console.log('Autenticación exitosa - Admin');
          this.$router.push({ name: 'bienvenida-admin' });
        } else {
          alert('Credenciales incorrectas. Intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error al autenticar administrador:', error);
        alert('No se pudo conectar con el servidor.');
      }
    },
    irAVisitaBienvenida() {
      this.$router.push({ name: 'bienvenida-admin' });
    },
    irAPaginaInformacion() {
      this.$router.push({ name: 'informacion' });
    },
    irAIniciarAsesorias() {
      this.$router.push({ name: 'iniciar-asesorias' });
    }
  }
};
</script>



<style scoped>
.inicio-admin {
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

@media (max-width: 768px) {

  .inicio-admin {
    padding: 0 16px; /* Añade espacio lateral general */
  }

  .card-container {
    margin: 40px 0;
    width: 100%;
  }

  .card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }


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
    align-items: center;
    width: 100%;
    margin-top: 10px;
  }

  .nav-buttons {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  .nav-buttons .nav-btn,
  .cta {
    width: 100%;
    margin: 5px 0;
  }

  .card-container {
    margin: 40px 20px; /* márgenes laterales en móvil */
    width: 100%;
    padding: 0 16px;
  }
}

</style>
