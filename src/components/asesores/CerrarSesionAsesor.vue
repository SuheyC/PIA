<template>
  <div class="cerrar-sesion">
    <div class="content">
      <!-- Foto y nombre de usuario -->
      <div class="perfil">
        <div class="perfil-imagen">
          <img v-if="perfilImagen" :src="perfilImagen" alt="Foto de Perfil" />
          <i v-else class="fa fa-user-circle"></i>
        </div>
        <p class="nombre-usuario">{{ nombreUsuario }}</p>
      </div>
      
      <h2>¿Estás seguro de que deseas cerrar sesión?</h2>
      
      <div class="buttons">
        <button @click="cerrarSesion" class="confirmar">Cerrar Sesión</button>
        <button @click="cancelar" class="cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CerrarSesionAsesor',
  data() {
    return {
      nombreUsuario: localStorage.getItem('nombreUsuario') || "Asesor",
      perfilImagen: localStorage.getItem('perfilImagen') || null
    };
  },
  methods: {
    cerrarSesion() {
      // Aquí puedes limpiar el localStorage si es necesario
      // localStorage.clear();
      this.$router.push('/');
    },
    cancelar() {
      this.$router.push('/asesor/bienvenida');
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.cerrar-sesion {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f4f7;
}

.content {
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 90%;
  max-width: 400px;
}

.perfil {
  margin-bottom: 20px;
}

.perfil-imagen {
  width: 80px;
  height: 80px;
  background-color: #e6e6e6;
  border-radius: 50%;
  margin: 0 auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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

.nombre-usuario {
  font-size: 1.2rem;
  font-weight: bold;
  color: #003366;
}

h2 {
  font-size: 1.8rem;
  color: #003366;
  margin-bottom: 20px;
  font-weight: 600;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 48%;
}

button:hover {
  transform: scale(1.05);
}

.confirmar {
  background-color: #003366;
  color: white;
}

.confirmar:hover {
  background-color: #5b97c9;
}

.cancelar {
  background-color: #f4f4f4;
  color: #003366;
  border: 2px solid #003366;
}

.cancelar:hover {
  background-color: #003366;
  color: white;
}

@media (max-width: 480px) {
  .content {
    padding: 10px;
  }

  h2 {
    font-size: 1.4rem;
  }

  .nombre-usuario {
    font-size: 1rem;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-imagen i {
    font-size: 40px;
  }

  .buttons {
    flex-direction: column;
    gap: 10px;
  }

  button {
    width: 100%;
    font-size: 0.95rem;
  }
}
</style>
