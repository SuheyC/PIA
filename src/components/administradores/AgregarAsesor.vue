<template>
    <div class="contenedor-agregar-admin">
      <div class="formulario-admin">
        <h1 class="titulo">Agregar Asesor</h1>
  
        <div class="perfil-imagen">
          <img v-if="imagenPreview" :src="imagenPreview" alt="Imagen de perfil" />
          <i v-else class="fa fa-user-circle fa-5x text-blue-500"></i>
        </div>
  
        <label class="custom-file">
          <input type="file" @change="cargarImagen" />
          <span>Seleccionar Imagen</span>
        </label>
  
        <button @click="eliminarImagen" class="btn-eliminar">Eliminar Foto</button>
  
        <input type="text" v-model="nombreAsesor" placeholder="Nombre del asesor" />
        <p v-if="errores.nombreAsesor" class="mensaje-error">{{ errores.nombreAsesor }}</p>
  
        <input type="email" v-model="correoAsesor" placeholder="Correo electrónico" />
        <p v-if="errores.correoAsesor" class="mensaje-error">{{ errores.correoAsesor }}</p>
  
        <input type="text" v-model="numeroEmpleado" placeholder="Número de empleado" />
        <p v-if="errores.numeroEmpleado" class="mensaje-error">{{ errores.numeroEmpleado }}</p>
  
        <div class="password-field">
          <input
            :type="verContrasena ? 'text' : 'password'"
            v-model="contrasena"
            placeholder="Contraseña"
          />
          <button @click="verContrasena = !verContrasena" type="button" class="toggle-pass">
            <i :class="verContrasena ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
          </button>
        </div>
        <p v-if="errores.contrasena" class="mensaje-error">{{ errores.contrasena }}</p>
  
        <div class="password-field">
          <input
            :type="verContrasena ? 'text' : 'password'"
            v-model="confirmarContrasena"
            placeholder="Confirmar contraseña"
          />
        </div>
        <p v-if="errores.confirmarContrasena" class="mensaje-error">{{ errores.confirmarContrasena }}</p>
  
        <div class="botones">
          <button @click="guardarAsesor" class="btn-guardar">Guardar</button>
          <button @click="cancelar" class="btn-cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AgregarAsesor',
    data() {
      return {
        imagenPreview: null,
        nombreAsesor: '',
        correoAsesor: '',
        numeroEmpleado: '',
        contrasena: '',
        confirmarContrasena: '',
        verContrasena: false,
        errores: {},
      };
    },
    methods: {
      cargarImagen(event) {
        const file = event.target.files[0];
        if (file) {
          this.imagenPreview = URL.createObjectURL(file);
        }
      },
      eliminarImagen() {
        this.imagenPreview = null;
      },
      validarCorreo(correo) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
      },
      contieneNumero(texto) {
        return /\d/.test(texto);
      },
      guardarAsesor() {
        this.errores = {};
  
        if (!this.nombreAsesor) this.errores.nombreAsesor = 'El nombre es obligatorio.';
        if (!this.correoAsesor) {
          this.errores.correoAsesor = 'El correo es obligatorio.';
        } else if (!this.validarCorreo(this.correoAsesor)) {
          this.errores.correoAsesor = 'Correo inválido. Ejemplo: ejemplo@correo.com';
        }
  
        if (!this.numeroEmpleado) {
          this.errores.numeroEmpleado = 'El número de empleado es obligatorio.';
        } else if (!this.contieneNumero(this.numeroEmpleado)) {
          this.errores.numeroEmpleado = 'Debe contener al menos un número.';
        }
  
        if (!this.contrasena) this.errores.contrasena = 'La contraseña es obligatoria.';
        if (!this.confirmarContrasena) {
          this.errores.confirmarContrasena = 'Debe confirmar la contraseña.';
        } else if (this.contrasena !== this.confirmarContrasena) {
          this.errores.confirmarContrasena = 'Las contraseñas no coinciden.';
        }
  
        if (Object.keys(this.errores).length > 0) return;
  
        alert(`Asesor ${this.nombreAsesor} guardado.`);
        this.$router.push('/admin/usuariosAsesores');
      },
      cancelar() {
        if (
          this.nombreAsesor || this.correoAsesor ||
          this.numeroEmpleado || this.contrasena || this.imagenPreview
        ) {
          const confirmacion = confirm("¿Estás seguro de que quieres cancelar? Se perderán los datos ingresados.");
          if (!confirmacion) return;
        }
        this.$router.push('/admin/usuariosAsesores');
      }
    }
  };
  </script>
  
  <style scoped>
  .contenedor-agregar-admin {
    min-height: 100vh;
    background: linear-gradient(135deg, #012a53, #7fbfff);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .formulario-admin {
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    animation: fadeIn 0.6s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .titulo {
    font-size: 1.8rem;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 10px;
  }
  .perfil-imagen {
    width: 120px;
    height: 120px;
    margin: 0 auto 10px;
    background: #cfe8f9;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .perfil-imagen img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  input {
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    transition: 0.3s;
  }
  input:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3);
  }
  .mensaje-error {
    color: #e53e3e;
    font-size: 0.85rem;
    margin-top: -8px;
    margin-bottom: -4px;
  }
  .custom-file {
    display: inline-block;
    background-color: #edf2f7;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px dashed #a0aec0;
    cursor: pointer;
    text-align: center;
    color: #4a5568;
  }
  .custom-file input[type="file"] {
    display: none;
  }
  .password-field {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .password-field input {
    flex: 1;
  }
  .toggle-pass {
    padding: 10px;
    background: #e2e8f0;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: #2d3748;
  }
  .toggle-pass:hover {
    background: #cbd5e0;
  }
  .botones {
    display: flex;
    gap: 12px;
  }
  .btn-guardar, .btn-cancelar, .btn-eliminar {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }
  .btn-guardar {
    background-color: #2b6cb0;
  }
  .btn-guardar:hover {
    background-color: #2c5282;
  }
  .btn-cancelar {
    background-color: #a0aec0;
  }
  .btn-cancelar:hover {
    background-color: #718096;
  }
  .btn-eliminar {
    background-color: #e53e3e;
    margin-top: -8px;
  }
  .btn-eliminar:hover {
    background-color: #c53030;
  }

  @media (max-width: 640px) {
  .formulario-admin {
    padding: 24px 16px;
    gap: 12px;
  }

  .titulo {
    font-size: 1.4rem;
  }

  input {
    font-size: 0.95rem;
  }

  .perfil-imagen {
    width: 100px;
    height: 100px;
  }

  .btn-guardar, .btn-cancelar, .btn-eliminar {
    font-size: 0.95rem;
    padding: 10px;
  }

  .custom-file {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
}

  </style>
  