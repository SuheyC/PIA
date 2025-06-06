<template>
  <div class="generar-solicitud">
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

    <!-- Formulario de Solicitud -->
    <main class="contenido">
      <div class="solicitud-container animate-fade-in">
        <h1>Generar Solicitud de Asesoría</h1>

        <div v-if="errores.length > 0" class="errores">
          <ul>
            <li v-for="(error, index) in errores" :key="index">{{ error }}</li>
          </ul>
        </div>

        <div class="formulario">
          <div class="form-group" v-for="field in fields" :key="field.id">
            <label :for="field.id">{{ field.label }}:</label>
            <input
              :type="field.type"
              :id="field.id"
              v-model="form[field.id]"
              :placeholder="field.placeholder"
              :class="{ 'input-error': fieldError(field.id) }"
              @input="clearError(field.id)"
            />
            <span v-if="fieldError(field.id)" class="error-message">Este campo es obligatorio.</span>
          </div>

          <button class="submit-btn" @click="generarSolicitud" :disabled="!isFormValid">Generar Solicitud</button>
        </div>
      </div>
    </main>

    <!-- Modal de confirmación -->
    <div v-if="showConfirmation" class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <h2>¡Muchas gracias!</h2>
          <p>Su solicitud se ha creado exitosamente.</p>
          <button @click="closeConfirmation" class="modal-btn">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenerarSolicitud",
  data() {
    return {
      menuVisible: false,
      perfilImagen: localStorage.getItem("perfilImagen") || null,
      nombreUsuario: localStorage.getItem("nombreUsuario") || "Estudiante",
      form: {
        nombre: "",
        apellido: "",
        matricula: "",
        correo: "",
        carrera: "",
        semestre: "",
        fecha: "",
        hora: "",
      },
      showConfirmation: false,
      errores: [],
      fields: [
        { id: "nombre", label: "Nombre", type: "text", placeholder: "Ingresa tu nombre" },
        { id: "apellido", label: "Apellido", type: "text", placeholder: "Ingresa tu apellido" },
        { id: "matricula", label: "Matrícula", type: "text", placeholder: "Ingresa tu matrícula" },
        { id: "correo", label: "Correo", type: "email", placeholder: "Ingresa tu correo" },
        { id: "carrera", label: "Carrera", type: "text", placeholder: "Ingresa tu carrera" },
        { id: "semestre", label: "Semestre", type: "number", placeholder: "Ingresa tu semestre" },
        { id: "fecha", label: "Fecha de la asesoría", type: "date", placeholder: "" },
        { id: "hora", label: "Hora de la asesoría", type: "time", placeholder: "" },
      ],
    };
  },
  computed: {
    isFormValid() {
      const f = this.form;
      return (
        f.nombre.trim() !== "" &&
        f.apellido.trim() !== "" &&
        f.matricula.trim() !== "" &&
        /\d/.test(f.matricula) &&
        f.correo.trim() !== "" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.correo) &&
        f.carrera.trim() !== "" &&
        f.semestre !== "" &&
        !isNaN(f.semestre) &&
        f.fecha !== "" &&
        f.hora !== ""
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
    fieldError(fieldId) {
      return this.errores.some((error) => error.toLowerCase().includes(fieldId));
    },
    clearError(fieldId) {
      this.errores = this.errores.filter((error) => !error.toLowerCase().includes(fieldId));
    },
    validarFormulario() {
      this.errores = [];

      if (!this.form.nombre.trim()) this.errores.push("El campo nombre es obligatorio");
      if (!this.form.apellido.trim()) this.errores.push("El campo apellido es obligatorio");
      if (!this.form.matricula.trim()) this.errores.push("El campo matrícula es obligatorio");
      else if (!/\d/.test(this.form.matricula)) this.errores.push("La matrícula debe contener números");
      if (!this.form.correo.trim()) this.errores.push("El campo correo es obligatorio");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.correo)) this.errores.push("El correo no es válido");
      if (!this.form.carrera.trim()) this.errores.push("El campo carrera es obligatorio");
      if (this.form.semestre === "" || isNaN(this.form.semestre)) this.errores.push("El campo semestre es obligatorio y debe ser numérico");
      if (!this.form.fecha) this.errores.push("El campo fecha es obligatorio");
      if (!this.form.hora) this.errores.push("El campo hora es obligatorio");

      return this.errores.length === 0;
    },
   async generarSolicitud() {
  if (!this.validarFormulario()) return;

  const solicitud = {
    id: Date.now(),
    nombre: this.form.nombre,
    apellido: this.form.apellido,
    matricula: this.form.matricula,
    correo: this.form.correo,
    carrera: this.form.carrera,
    semestre: this.form.semestre,
    fecha: this.form.fecha,
    hora: this.form.hora,
    estado: "pendiente",
    fechaSolicitud: new Date().toLocaleDateString(),
  };

  try {
    const response = await fetch("http://localhost:3000/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solicitud),
    });

    if (!response.ok) throw new Error("Error al guardar la solicitud");

    this.showConfirmation = true;
  } catch (error) {
    console.error(error);
    this.errores.push("Hubo un error al generar la solicitud. Intenta más tarde.");
  }
},

    closeConfirmation() {
      this.showConfirmation = false;
      this.$router.push({ name: "MisAsesoriasEstudiante" });
    },
  },
};
</script>

  
  <style scoped>
  .generar-solicitud {
    background: linear-gradient(135deg, #5b97c9, #003366);
    min-height: 100vh;
    overflow: hidden;
    padding-top: 100px;
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
    font-weight: bold;
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
    border-radius: 5px;
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
    z-index: 999;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
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
  
  .side-menu button i {
    margin-right: 10px;
    width: 20px;
    text-align: center;
  }
  
  .perfil-container {
    text-align: center;
    padding: 15px;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 15px;
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
    margin: 0;
  }
  
  /* Formulario */
  .solicitud-container {
    background: white;
    border-radius: 20px;
    padding: 30px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    animation: fadeIn 1s;
    margin-bottom: 40px;
  }
  
  h1 {
    text-align: center;
    color: #003366;
    margin-bottom: 20px;
    font-size: 1.8rem;
  }
  
  .datos-seleccionados {
    background-color: #f1f1f1;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .datos-seleccionados p {
    margin: 5px 0;
    color: #333;
  }
  
  .formulario {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  label {
    color: #003366;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
    transition: 0.3s;
    font-size: 1rem;
  }
  
  input:focus {
    border-color: #5b97c9;
    box-shadow: 0 0 8px rgba(91,151,201,0.6);
  }
  
  .submit-btn {
    margin-top: 20px;
    background-color: #003366;
    padding: 12px;
    font-size: 16px;
    border-radius: 10px;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: bold;
  }
  
  .submit-btn:hover {
    background-color: #5b97c9;
  }
  
  /* Animaciones */
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.7s ease-in-out;
  }
  
  /* Estilos para el modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }
  
  .modal {
    background-color: white;
    border-radius: 15px;
    padding: 30px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-out;
  }
  
  .modal-content {
    text-align: center;
  }
  
  .modal h2 {
    color: #003366;
    margin-bottom: 15px;
  }
  
  .modal p {
    margin-bottom: 25px;
    font-size: 16px;
    color: #333;
  }
  
  .modal-btn {
    background-color: #003366;
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .modal-btn:hover {
    background-color: #5b97c9;
  }
  
  .errores {
    background-color: #ffe0e0;
    border: 1px solid #ff4d4d;
    color: #b30000;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .errores ul {
    list-style: inside disc;
    padding-left: 20px;
    margin: 0;
  }
  
  .errores li {
    margin-bottom: 5px;
    font-size: 0.9rem;
  }
  
  .input-error {
    border-color: #ff4d4d !important;
    box-shadow: 0 0 5px rgba(255, 77, 77, 0.5) !important;
  }
  
  .contenido {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .solicitud-container {
      width: 85%;
      padding: 20px;
    }
    
    .logo-text {
      display: none;
    }
    
    h1 {
      font-size: 1.5rem;
    }
    
    .menu-toggle {
      width: 40px;
      height: 50px;
      font-size: 20px;
      top: 15px;
      right: 15px;
    }
    
    .side-menu {
      top: 60px;
    }
  }
  
  @media (max-width: 480px) {
    .formulario {
      gap: 10px;
    }
    
    input, .submit-btn {
      padding: 8px;
    }
  }
  </style>