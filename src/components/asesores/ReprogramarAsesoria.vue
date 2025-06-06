<template>
  <div class="contenedor-reprogramar">
    <div class="formulario-reprogramar">
      <h1 class="titulo">Reprogramar Asesoría</h1>

      <div class="campo">
        <label>Nueva fecha:</label>
        <input type="date" v-model="nuevaFecha" />
        <p v-if="errores.nuevaFecha" class="mensaje-error">{{ errores.nuevaFecha }}</p>
      </div>

      <div class="campo">
        <label>Nueva hora:</label>
        <input type="time" v-model="nuevaHora" />
        <p v-if="errores.nuevaHora" class="mensaje-error">{{ errores.nuevaHora }}</p>
      </div>

      <div class="campo">
        <label>Motivo de reprogramación:</label>
        <textarea v-model="motivo" placeholder="Escribe el motivo..."></textarea>
      </div>

      <div class="botones">
        <button @click="guardarReprogramacion" class="btn-guardar">Guardar</button>
        <button @click="cancelar" class="btn-cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReprogramarAsesoria',
  data() {
    return {
      nuevaFecha: '',
      nuevaHora: '',
      motivo: '',
      errores: {}
    };
  },
  methods: {
    guardarReprogramacion() {
      this.errores = {};

      if (!this.nuevaFecha) this.errores.nuevaFecha = 'La fecha es obligatoria.';
      if (!this.nuevaHora) this.errores.nuevaHora = 'La hora es obligatoria.';

      if (Object.keys(this.errores).length > 0) return;

      const nuevaAsesoria = {
        fecha: this.nuevaFecha,
        hora: this.nuevaHora,
        motivo: this.motivo,
      };

      console.log('Asesoría reprogramada:', nuevaAsesoria);
      alert('Asesoría reprogramada con éxito.');
      this.$router.push('/asesor/misAsesorias');
    },
    cancelar() {
      if (confirm('¿Estás seguro de cancelar? Se perderán los cambios.')) {
        this.$router.push('/asesor/AsesoriasPendientesAsesor');
      }
    }
  }
};
</script>

<style scoped>
.contenedor-reprogramar {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a3c5a, #9cc9f7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.formulario-reprogramar {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fadeIn 0.5s ease;
}
.titulo {
  font-size: 1.8rem;
  color: #2c3e50;
  text-align: center;
}
.campo label {
  font-weight: bold;
  margin-bottom: 6px;
  display: block;
}
input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
}
textarea {
  resize: vertical;
  min-height: 80px;
}
.mensaje-error {
  color: #e53e3e;
  font-size: 0.85rem;
}
.botones {
  display: flex;
  gap: 12px;
}
.btn-guardar,
.btn-cancelar {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  cursor: pointer;
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
  .formulario-reprogramar {
    padding: 20px;
    gap: 12px;
  }
  .titulo {
    font-size: 1.5rem;
  }
  input,
  textarea {
    font-size: 0.95rem;
    width: 90%;
  }
  .btn-guardar,
  .btn-cancelar {
    font-size: 0.95rem;
    padding: 10px;
  }
}
</style>
