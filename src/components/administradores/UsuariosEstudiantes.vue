<template>
    <div class="contenedor-principal">
      <!-- Header -->
      <header class="encabezado">
        <div class="logo">
          <img src="@/assets/tecnm.png" alt="Tecnológico" />
          <img src="@/assets/ite.png" alt="ITE" />
          <span class="texto-logo">TECNOLÓGICO NACIONAL DE MÉXICO</span>
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
          <li><button @click="irInicioAdmin"><i class="fa fa-home"></i> Inicio</button></li>
          <li><button @click="cerrarSesion"><i class="fa fa-sign-out-alt"></i> Cerrar sesión</button></li>
          <li><button @click="verUsuarios"><i class="fa fa-users"></i> Usuarios</button></li>
          <li><button @click="verInformes"><i class="fa fa-chart-line"></i> Informes</button></li>
          <li><button @click="verNotificaciones"><i class="fa fa-bell"></i> Notificaciones</button></li>
          <li><button @click="verConfiguracion"><i class="fa fa-cogs"></i> Configuración</button></li>
        </ul>
      </nav>
  
      <!-- Contenido principal -->
      <main class="contenedor">
        <div class="cabecera-usuarios">
          <h1 class="titulo-usuarios">Usuarios Estudiantes</h1>
          <!-- <button @click="agregarEstudiante" class="boton-agregar">
            + Agregar Estudiante
          </button> -->
        </div>
  
        <div class="contenedor-usuarios">
          <div v-for="estudiante in paginatedEstudiantes" :key="estudiante.id" class="tarjeta-usuario">
            <div class="contenido-tarjeta">
              <div class="imagen-usuario">
                <img v-if="estudiante.foto" :src="estudiante.foto" class="imagen-tarjeta" />
                <i v-else class="fa fa-user-circle fa-4x text-blue-500"></i>
              </div>
              <h2 class="nombre-usuario">{{ estudiante.nombre }}</h2>
              <p class="correo-usuario">{{ estudiante.correo }}</p>
              <p class="numero-empleado">Matrícula: {{ estudiante.matricula }}</p>
            </div>
            <div class="acciones-usuario">
              <button @click="editarEstudiante(estudiante.id)" class="boton-editar">Editar</button>
              <button @click="eliminarEstudiante(estudiante.id)" class="boton-eliminar">Eliminar</button>
            </div>
          </div>
        </div>
  
        <p v-if="paginatedEstudiantes.length === 0" class="mensaje-vacio">No hay estudiantes registrados.</p>
  
        <div class="paginacion">
          <button @click="paginaActual--" :disabled="paginaActual <= 1" class="boton-paginacion">Anterior</button>
          <span class="numero-pagina">{{ paginaActual }} / {{ totalPaginas }}</span>
          <button @click="paginaActual++" :disabled="paginaActual >= totalPaginas" class="boton-paginacion">Siguiente</button>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EstudiantesView',
    data() {
      return {
        estudiantes: [
          { id: 1, nombre: 'Carlos Pérez', correo: 'carlos.perez@ite.edu.mx', matricula: '21001', foto: '' },
          { id: 2, nombre: 'Ana López', correo: 'ana.lopez@ite.edu.mx', matricula: '21002', foto: '' },
          { id: 3, nombre: 'Luis Torres', correo: 'luis.torres@ite.edu.mx', matricula: '21003', foto: '' },
          { id: 4, nombre: 'Dana', correo: 'dana@ite.edu.mx', matricula: '1234', foto: '' },
          { id: 5, nombre: 'said', correo: 'said@ite.edu.mx', matricula: '12345', foto: '' }
        ],
        menuVisible: false,
        perfilImagen: localStorage.getItem('perfilImagen'),
        nombreUsuario: localStorage.getItem('nombreUsuario') || "Usuario",
        paginaActual: 1,
        estudiantesPorPagina: 3,
      };
    },
    computed: {
      totalPaginas() {
        return Math.ceil(this.estudiantes.length / this.estudiantesPorPagina);
      },
      paginatedEstudiantes() {
        const inicio = (this.paginaActual - 1) * this.estudiantesPorPagina;
        const fin = inicio + this.estudiantesPorPagina;
        return this.estudiantes.slice(inicio, fin);
      }
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      editarEstudiante(id) {
      const estudiante = this.estudiantes.find(e => e.id === id); // Cambiar de "administradores" a "estudiantes"
      localStorage.setItem('estudianteEditar', JSON.stringify(estudiante));
      this.$router.push('/admin/EditarEstudiantes');
      },

      
      eliminarEstudiante(id) {
        const estudiante = this.estudiantes.find(e => e.id === id);
        if (confirm(`¿Seguro que deseas eliminar a ${estudiante.nombre}?`)) {
          this.estudiantes = this.estudiantes.filter(e => e.id !== id);
        }
      },
      agregarEstudiante() {
        this.$router.push('/admin/AgregarEstudiante');
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
    }
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.contenedor-principal {
  background-color:#5b97c9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo img {
  height: 50px;
}

.texto-logo {
  font-size: 1.3rem;
  font-weight: bold;
  color: #1e3a5f;
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
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  text-align: left;
  transition: background-color 0.3s ease;
}

.side-menu button i {
  margin-right: 15px;
}

.side-menu button:hover {
  background-color: #5b97c9;
}

.side-menu li {
  margin: 10px;
}

.perfil-container {
  text-align: center;
  padding: 25px;
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

.menu-lateral ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-lateral li {
  margin: 10px 0;
}

.menu-lateral button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 12px 24px;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.3s;
  border-radius: 8px;
}

.menu-lateral button:hover {
  background-color: #365b8d;
}

/* Contenido principal */
.contenedor {
  margin-top: 100px;
  padding: 32px;
}

.cabecera-usuarios {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.titulo-usuarios {
  font-size: 1.8rem;
  color: #ffffff;
}

.boton-agregar {
  background-color: #003366;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  border-style: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.boton-agregar:hover {
  background-color: #00254a;
}

.contenedor-usuarios {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.tarjeta-usuario {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  width: 280px;
  padding: 20px;
  text-align: center;
  transition: transform 0.2s;
}

.tarjeta-usuario:hover {
  transform: translateY(-4px);
}

.imagen-usuario {
  width: 80px;
  height: 80px;
  background-color: #e2e8f0;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imagen-usuario img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nombre-usuario {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1e3a5f;
}

.correo-usuario,
.numero-empleado {
  color: #4a5568;
  font-size: 0.9rem;
}

.acciones-usuario {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}

.boton-editar,
.boton-eliminar {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  border: none;
}

.boton-editar {
  background-color: #3182ce;
}

.boton-editar:hover {
  background-color: #2b6cb0;
}

.boton-eliminar {
  background-color: #e53e3e;
}

.boton-eliminar:hover {
  background-color: #c53030;
}

.mensaje-vacio {
  text-align: center;
  color: #718096;
  margin-top: 20px;
}

.paginacion {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.boton-paginacion {
  padding: 8px 16px;
  background-color: #e2e8f0;
  border-radius: 6px;
  color: #2d3748;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  border: none;
}

.boton-paginacion:hover {
  background-color: #cbd5e0;
}

.numero-pagina {
  font-size: 1rem;
  color: #2d3748;
  font-weight: bold;
}

@media (max-width: 768px) {
  .texto-logo {
    display: none;
  }

  .logo img {
    height: 40px;
    margin-right: 5px;
  }

  .menu-toggle {
    font-size: 20px;
    top: 15px;
    right: 15px;
  }

  .side-menu {
    width: 200px;
    top: 60px;
  }

  .perfil-imagen {
    width: 60px;
    height: 60px;
  }

  .perfil-imagen i {
    font-size: 40px;
  }

  .bienvenida {
    width: auto;
    padding: 15px;
    margin: 0 15px; /* ← Esto agrega margen a los lados */
  }

  .bienvenida h1 {
    font-size: 1.5rem;
  }

  .bienvenida h3 {
    font-size: 1.2rem;
  }

  .bienvenida p {
    font-size: 1rem;
  }
}
  </style>
  