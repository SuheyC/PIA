<template>
  <div class="editar-perfil-estudiante">
    <!-- Encabezado -->
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
          <i class="fa fa-user-circle"></i>
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

    <!-- Contenido -->
    <main class="contenido">
      <div class="form-container">
        <h2>Editar Perfil</h2>

        <input type="text" v-model="nombreUsuario" placeholder="Nombre de usuario" />
        <input type="email" v-model="correoElectronico" placeholder="Correo electrónico" />
        <input type="text" v-model="numeroControl" placeholder="Número de control" />
        <input type="password" v-model="nuevaContrasena" placeholder="Nueva contraseña" />
        <input type="password" v-model="confirmarContrasena" placeholder="Confirmar contraseña" />

        <button @click="guardarCambios">Guardar Cambios</button>
        <button @click="cancelarEdicion">Cancelar</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "EditarPerfilEstudiante",
  data() {
    return {
      nombreUsuario: "",
      correoElectronico: "",
      numeroControl: "",
      nuevaContrasena: "",
      confirmarContrasena: "",
      menuVisible: false,
      usuarioId: null,
    };
  },
  created() {
    this.verificarSesion();
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },

    verificarSesion() {
      const idUsuario = localStorage.getItem("usuarioId");
      const rol = localStorage.getItem("rol");

      if (!idUsuario || rol !== "estudiante") {
        alert("Acceso no autorizado. Inicia sesión como estudiante.");
        this.$router.push({ name: "login" });
        return;
      }

      this.usuarioId = idUsuario;
      this.cargarDatosUsuario();
    },

    async cargarDatosUsuario() {
      try {
        const res = await fetch("http://localhost:3000/usuarios");
        if (!res.ok) throw new Error("Error al cargar usuarios");

        const usuarios = await res.json();

        const usuario = usuarios.find(
          (u) => u.matricula === this.usuarioId || u.empleado === this.usuarioId
        );

        if (!usuario) {
          alert("Usuario no encontrado.");
          this.$router.push({ name: "login" });
          return;
        }

        this.nombreUsuario = usuario.nombre || "";
        this.correoElectronico = usuario.correoElectronico || "";
        this.numeroControl = usuario.matricula || usuario.empleado || "";
      } catch (error) {
        console.error(error);
        alert("Error al cargar datos del usuario.");
      }
    },

    async guardarCambios() {
      if (this.nuevaContrasena !== this.confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      try {
        const resGet = await fetch("http://localhost:3000/usuarios");
        if (!resGet.ok) throw new Error("Error al cargar usuarios");

        const usuarios = await resGet.json();
        const usuario = usuarios.find(
          (u) => u.matricula === this.usuarioId || u.empleado === this.usuarioId
        );

        if (!usuario) {
          alert("Usuario no encontrado.");
          return;
        }

        const id = usuario.id;

        const datosActualizados = {
          ...usuario,
          nombre: this.nombreUsuario,
          correoElectronico: this.correoElectronico,
          matricula: usuario.matricula ? this.numeroControl : undefined,
          empleado: usuario.empleado ? this.numeroControl : undefined,
          password: this.nuevaContrasena || usuario.password,
        };

        if (datosActualizados.matricula === undefined) delete datosActualizados.matricula;
        if (datosActualizados.empleado === undefined) delete datosActualizados.empleado;

        const resPut = await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosActualizados),
        });

        if (!resPut.ok) throw new Error("Error al guardar cambios");

        alert("Perfil actualizado correctamente.");
        this.$router.push({ name: "bienvenida-estudiante" });
      } catch (error) {
        console.error(error);
        alert("Error al guardar cambios.");
      }
    },

    cancelarEdicion() {
      this.$router.push({ name: "bienvenida-estudiante" });
    },

    irInicioEstudiante() {
      this.$router.push({ name: "bienvenida-estudiante" });
    },

    editarPerfil() {
      this.$router.push({ name: "EditarPerfilEstudiante" });
    },

    cerrarSesion() {
      localStorage.clear();
      this.$router.push({ name: "login" });
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
  },
};
</script>



  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  .editar-perfil-estudiante {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    min-height: 100vh;
    background-color: #5b97c9;
  }
  
  /* Encabezado */
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
    font-size: 1.5rem;
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
    width: 40px;
    height: 50px;
    background-color:#eaeaea;
    color: #000;
    border-radius: 5px;
  }
  
  .menu-toggle:hover {
    background-color: aliceblue;
  }
  
  /* Menú lateral */
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
    padding-top: 40px;
    transition: left 0.3s;
  }
  
  .menu-visible {
    left: 0;
  }
  
  ul {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}
  
  .side-menu button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: none;
    color: white;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    width: 90%;
    text-align: left;
    transition: background-color 0.3s ease;
  }
  
  .side-menu button i {
  margin-right: 15px; /* Agrega espacio entre el icono y el texto */
}

  .side-menu button:hover {
    background-color: #5b97c9;

  }

  .side-menu li {
    margin: 15px ;
  }
  
  .perfil-container {
    text-align: center;
    
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
    margin: 0 auto ;
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
  
  /* Contenido */
  .contenido {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 100px;
    animation: fadeIn 0.6s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
     }
  
  .form-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  input {
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }
  
  button {
    padding: 10px;
    margin: 5px;
    border: none;
    background-color: #003366;
    color: white;
    cursor: pointer;
    border-radius: 12px;
    width: 100%;
    height: 40px;
  }
  
  button:hover {
    background-color: #5b97c9;
  }

  @media (max-width: 768px) {
  .logo-text {
    display: none;
  }

  .contenido {
    width: 90%;
    padding-top: 120px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 20px;
  }

  .form-container {
    padding: 15px;
  }

  .menu-toggle {
    font-size: 20px;
    top: 15px;
    right: 15px;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-nombre {
    font-size: 0.9rem;
  }

  .side-menu {
    width: 200px;
  }

  .side-menu button {
    font-size: 1rem;
  }

  input {
    font-size: 1rem;
    padding: 10px;
    width: 85%;
  }

}
  
  
  </style>
  