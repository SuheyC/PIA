<template>
    <div class="inicio-admin">
      <header>
        <div class="logo">
          <img src="@/assets/tecnm.png" alt="Tecnológico" />
          <img src="@/assets/ite.png" alt="ITE" />
          <span class="logo-text">TECNOLÓGICO NACIONAL DE MÉXICO</span>
        </div>
        <button class="menu-toggle" @click="toggleMenu">☰</button>
      </header>
  
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
  
      <div class="container">
        <h2 class="title">Solicitudes de Asesoría</h2>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Nombre del Solicitante</th>
                <th @click="ordenarPorFecha" class="sortable">
                  Fecha
                  <span v-if="ordenAscendente">▲</span>
                  <span v-else>▼</span>
                </th>
                <th>Materia</th>
                <th>Tema</th>
                <th>Motivo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(solicitud, index) in solicitudesOrdenadas" :key="index">
                <td>{{ solicitud.folio }}</td>
                <td>{{ solicitud.nombre }}</td>
                <td>{{ formatearFecha(solicitud.fecha) }}</td>
                <td>{{ solicitud.materia }}</td>
                <td>{{ solicitud.tema }}</td>
                <td>{{ solicitud.motivo }}</td>
                <td :class="estadoClase(solicitud.estado)">{{ solicitud.estado }}</td>
                <td>
                  <div class="acciones">
                    <button class="btn-ver" @click="verDetalles(solicitud)">Ver</button>
                    <button class="btn-aceptar" @click="aceptarSolicitud(solicitud)">Aceptar</button>
                    <button class="btn-rechazar" @click="rechazarSolicitud(solicitud)">Rechazar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- MODAL DE DETALLES -->
      <div v-if="mostrarModal" class="modal-overlay" @click.self="cerrarModal">
        <div class="modal-contenido">
          <h3>Detalles de la Solicitud</h3>
          <p><strong>Folio:</strong> {{ solicitudSeleccionada.folio }}</p>
          <p><strong>Nombre:</strong> {{ solicitudSeleccionada.nombre }}</p>
          <p><strong>Matrícula:</strong> {{ solicitudSeleccionada.matricula }}</p>
          <p><strong>Fecha:</strong> {{ formatearFecha(solicitudSeleccionada.fecha) }}</p>
          <p><strong>Materia:</strong> {{ solicitudSeleccionada.materia }}</p>
          <p><strong>Tema:</strong> {{ solicitudSeleccionada.tema }}</p>
          <p><strong>Motivo:</strong> {{ solicitudSeleccionada.motivo }}</p>
          <button class="btn-cerrar" @click="cerrarModal">Cerrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SolicitudesAdmin',
    data() {
      return {
        menuVisible: false,
        perfilImagen: localStorage.getItem('perfilImagen') || null,
        nombreUsuario: localStorage.getItem('nombreUsuario') || 'Usuario',
        ordenAscendente: true,
        mostrarModal: false,
        solicitudSeleccionada: {},
        solicitudes: [
          {
            folio: 'SA001',
            nombre: 'Luis Pérez',
            matricula: '12345678',
            fecha: '2025-04-20',
            materia: 'Cálculo Diferencial',
            tema: 'Diferenciales',
            motivo: 'Dudas sobre cálculo',
            estado: 'Pendiente'
          },
          {
            folio: 'SA002',
            nombre: 'María López',
            matricula: '87654321',
            fecha: '2025-04-22',
            materia: 'Programación',
            tema: 'Vue.js',
            motivo: 'Apoyo con programación',
            estado: 'Pendiente'
          }
        ]
      };
    },
    computed: {
      solicitudesOrdenadas() {
        return [...this.solicitudes].sort((a, b) => {
          const fechaA = new Date(a.fecha);
          const fechaB = new Date(b.fecha);
          return this.ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
        });
      }
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      ordenarPorFecha() {
        this.ordenAscendente = !this.ordenAscendente;
      },
      formatearFecha(fecha) {
        const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-MX', opciones);
      },
      estadoClase(estado) {
        return {
          'estado-pendiente': estado === 'Pendiente',
          'estado-aceptada': estado === 'Aceptada',
          'estado-rechazada': estado === 'Rechazada'
        };
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
      verDetalles(solicitud) {
        this.solicitudSeleccionada = solicitud;
        this.mostrarModal = true;
      },
      cerrarModal() {
        this.mostrarModal = false;
      },
      aceptarSolicitud(solicitud) {
        solicitud.estado = 'Aceptada';
      },
      rechazarSolicitud(solicitud) {
        solicitud.estado = 'Rechazada';
      }
    }
  };
  </script>
  
  <style scoped>
  .inicio-admin {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #5b97c9;
    min-height: 100vh;
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    border: none;
    cursor: pointer;
  }
  
  .menu-toggle:hover {
    background-color: aliceblue;
  }
  
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
    padding-top: 60px;
    transition: left 0.3s;
  }
  
  .menu-visible {
    left: 0;
  }
  
  .side-menu li {
    margin: 15px;
  }
  
  .side-menu button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: none;
    color: white;
    border-radius: 6px;
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
    margin-bottom: 15px;
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
  
  nav ul button i {
    margin-right: 10px;
  }

  .container {
  box-sizing: border-box;
  padding: 120px 20px 40px; /* ← No pongas padding lateral excesivo */
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: hidden;
}
  
  .title {
    text-align: center;
    color: #fdfdfe;
    margin-bottom: 20px;
  }
  
  .table-responsive {
    overflow-x: auto;
    width: 100%;
  }
  
  .table {
    width: 100%;
    background-color: white;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .table th,
  .table td {
    padding: 14px 10px;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    white-space: nowrap;
    vertical-align: middle;
  }
  
  .table th {
    background-color: #003366;
    color: white;
    cursor: pointer;
  }
  
  
  .table tr:hover {
    background-color: #f1f7ff;
  }
  
  .sortable {
    user-select: none;
  }
  
  .estado-pendiente {
    color: #ff9800;
    font-weight: bold;
  }
  
  .estado-aceptada {
    color: #4caf50;
    font-weight: bold;
  }
  
  .estado-rechazada {
    color: #f44336;
    font-weight: bold;
  }
  
  .acciones {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .btn-ver,
  .btn-aceptar,
  .btn-rechazar {
    padding: 8px 14px;
    font-size: 0.9rem;
    border: none;
    border-radius: 6px;
    margin: 2px;
    color: white;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }
  

  .btn-ver {
    background-color: #17a2b8;
  }

  .btn-ver:hover {
  background-color: #138496;
}
  
  .btn-aceptar {
    background-color: #28a745;
  }

  .btn-aceptar:hover {
  background-color: #218838;
}
  
  .btn-rechazar {
    background-color: #dc3545;
  }

  .btn-rechazar:hover {
  background-color: #c82333;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }

  .modal-contenido {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  text-align: left;
  box-sizing: border-box;
  word-break: break-word;
}
  
  .modal-contenido h3 {
    margin-top: 0;
    color: #003366;
    margin-bottom: 15px;
  }
  
  .modal-contenido p {
    margin: 8px 0;
  }
  
  .btn-cerrar {
    margin-top: 20px;
    background-color: #003366;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-cerrar:hover {
    background-color: #5b97c9;
  }

  
  /* Responsive para móviles */
  @media (max-width: 768px) {

    .container {
    padding: 100px 20px 40px;
    max-width: 100%;
  }

    .logo-text {
      font-size: 0%;
    }
  
    .menu-toggle {
      font-size: 20px;
      padding: 8px;
    }

    .table-responsive {
    padding: 10px; /* ← Añadimos margen interno lateral en móviles */
  }
  
    .table th,
    .table td {
      font-size: 0.85rem;
      padding: 10px;
    }
  
    .btn-ver,
    .btn-aceptar,
    .btn-rechazar {
      font-size: 0.75rem;
      padding: 5px 8px;
    }
  
    .perfil-nombre {
      font-size: 0.9rem;
    }
    .modal-contenido {
    width: 95%;
    padding: 20px;
    font-size: 0.9rem;
  }

  .modal-contenido h3 {
    font-size: 1.1rem;
  }

  .modal-contenido p {
    font-size: 0.85rem;
  }

  .btn-cerrar {
    width: 100%;
    font-size: 0.9rem;
  }

  .modal-contenido {
    width: 95%;
    padding: 20px;
    font-size: 0.9rem;
  }

  .modal-contenido h3 {
    font-size: 1.1rem;
  }

  .modal-contenido p {
    font-size: 0.85rem;
  }

  .btn-cerrar {
    width: 100%;
    font-size: 0.9rem;
  }

  }
  </style>
  