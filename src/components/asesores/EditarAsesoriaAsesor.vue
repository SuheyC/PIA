<template>
  <div class="contenedor-editar-asesoria">
    <div class="formulario-asesoria">
      <h1 class="titulo">Editar Asesoría</h1>

      <input type="text" v-model="tema" placeholder="Tema de la asesoría" />
      <p v-if="errores.tema" class="mensaje-error">{{ errores.tema }}</p>

      <textarea v-model="descripcion" placeholder="Descripción de la asesoría" rows="4"></textarea>
      <p v-if="errores.descripcion" class="mensaje-error">{{ errores.descripcion }}</p>

      <input type="date" v-model="fecha" />
      <p v-if="errores.fecha" class="mensaje-error">{{ errores.fecha }}</p>

      <input type="time" v-model="hora" />
      <p v-if="errores.hora" class="mensaje-error">{{ errores.hora }}</p>

      <input type="text" v-model="ubicacion" placeholder="Ubicación" />
      <p v-if="errores.ubicacion" class="mensaje-error">{{ errores.ubicacion }}</p>

      <div class="botones">
        <button @click="guardarCambios" class="btn-guardar">Guardar</button>
        <button @click="cancelar" class="btn-cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditarAsesoriaAsesor',
  data() {
    return {
      tema: '',
      descripcion: '',
      fecha: '',
      hora: '',
      ubicacion: '',
      errores: {},
    };
  },
  created() {
    const asesoria = JSON.parse(localStorage.getItem('asesoriaEditar'));
    if (asesoria) {
      this.tema = asesoria.tema || '';
      this.descripcion = asesoria.descripcion || '';
      this.fecha = asesoria.fecha || '';
      this.hora = asesoria.hora || '';
      this.ubicacion = asesoria.ubicacion || '';
    }
  },
  methods: {
    guardarCambios() {
      this.errores = {};

      if (!this.tema) this.errores.tema = 'El tema es obligatorio.';
      if (!this.descripcion) this.errores.descripcion = 'La descripción es obligatoria.';
      if (!this.fecha) this.errores.fecha = 'La fecha es obligatoria.';
      if (!this.hora) this.errores.hora = 'La hora es obligatoria.';
      if (!this.ubicacion) this.errores.ubicacion = 'La ubicación es obligatoria.';

      if (Object.keys(this.errores).length > 0) return;

      const asesoriaEditada = {
        tema: this.tema,
        descripcion: this.descripcion,
        fecha: this.fecha,
        hora: this.hora,
        ubicacion: this.ubicacion,
      };

      console.log('Asesoría editada:', asesoriaEditada);
      alert('Cambios guardados correctamente.');
      this.$router.push('/asesor/mis-asesorias');
    },
    cancelar() {
      const hayDatos = this.tema || this.descripcion || this.fecha || this.hora || this.ubicacion;
      if (hayDatos && !confirm('¿Estás seguro de cancelar? Se perderán los cambios.')) return;
      this.$router.push('/asesor/AsesoriasPendientesAsesor');
    },
  },
};
</script>

<style scoped>
.contenedor-editar-asesoria {
  min-height: 100vh;
  background: linear-gradient(135deg, #012a53, #7fbfff);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.formulario-asesoria {
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
input, textarea {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: 0.3s;
}
input:focus, textarea:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3);
}
textarea {
  resize: vertical;
}
.mensaje-error {
  color: #e53e3e;
  font-size: 0.85rem;
  margin-top: -8px;
  margin-bottom: -4px;
}
.botones {
  display: flex;
  gap: 12px;
}
.btn-guardar, .btn-cancelar {
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

@media (max-width: 640px) {
  .formulario-asesoria {
    padding: 24px 16px;
    gap: 12px;
  }
  .titulo {
    font-size: 1.4rem;
  }
  input, textarea {
    font-size: 0.95rem;
  }
  .btn-guardar, .btn-cancelar {
    font-size: 0.95rem;
    padding: 10px;
  }
  .contenedor-editar-asesoria{
    margin-top: 20px;
  }
}
</style>
