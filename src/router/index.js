import { createRouter, createWebHistory } from 'vue-router'; 

// Rutas generales
import VisitaBienvenida from '@/components/VisitaBienvenida.vue';
import PaginaInformacion from '@/components/PaginaInformacion.vue'; 
import IniciarAsesorias from '@/components/IniciarAsesorias.vue';

/* Administradores */
import InicioAdmin from '@/components/administradores/InicioAdmin.vue';
import BienvenidaAdmin from '@/components/administradores/BienvenidaAdmin.vue';
import EditarPerfil from '@/components/administradores/EditarPerfil.vue';
import CerrarSesion from '@/components/administradores/CerrarSesion.vue';
import SeleccionarTipoUsuario from '@/components/administradores/SeleccionarTipoUsuario.vue';
import UsuariosAdmin from '@/components/administradores/UsuariosAdmin.vue';
import AgregarAdmin from '@/components/administradores/AgregarAdmin.vue';
import EditarAdmin from '@/components/administradores/EditarAdmin.vue';
import UsuariosAsesores from '@/components/administradores/UsuariosAsesores.vue';
import AgregarAsesor from '@/components/administradores/AgregarAsesor.vue';
import EditarAsesores from '@/components/administradores/EditarAsesores.vue';
import UsuariosEstudiantes from '@/components/administradores/UsuariosEstudiantes.vue';
import AgregarEstudiante from '@/components/administradores/AgregarEstudiante.vue';
import EditarEstudiantes from '@/components/administradores/EditarEstudiantes.vue';
import solicitudesAdmin from '@/components/administradores/solicitudesAdmin.vue';
import AdminInformes from '@/components/administradores/AdminInformes.vue';
import ListaAsesores from '@/components/administradores/ListaAsesores.vue';
import perfilAsesor from '@/components/administradores/perfilAsesor.vue';
import ListaEstudiantes from '@/components/administradores/ListaEstudiantes.vue';
import perfilEstudiante from '@/components/administradores/perfilEstudiante.vue';
import NotificacionesAdmin from '@/components/administradores/NotificacionesAdmin.vue';
import configuracionAdmin from '@/components/administradores/configuracionAdmin.vue';
import MandarMensajeAdmin from '@/components/administradores/MandarMensajeAdmin.vue';


/* Estudiantes */
import InicioEstudiante from '@/components/estudiantes/InicioEstudiante.vue';
import BienvenidaEstudiante from '@/components/estudiantes/BienvenidaEstudiante.vue';
import RegistroEstudiante from '@/components/estudiantes/RegistroEstudiante.vue';
import CerrarSesionEstudiante from '@/components/estudiantes/CerrarSesionEstudiante.vue';
import EditarPerfilEstudiante from '@/components/estudiantes/EditarPerfilEstudiante.vue';
import MisAsesoriasEstudiante from '@/components/estudiantes/MisAsesoriasEstudiante.vue';
import AsesoriasPendientesEstudiantes from '@/components/estudiantes/AsesoriasPendientesEstudiantes.vue';
import EditarAsesoriaEstudiante from '@/components/estudiantes/EditarAsesoriaEstudiante.vue';
import AsesoriasImpartidasEstudiantes from '@/components/estudiantes/AsesoriasImpartidasEstudiantes.vue';
import CalificarAsesoria from '@/components/estudiantes/CalificarAsesoria.vue';
import SolicitarAsesoriaEstudiante from '@/components/estudiantes/SolicitarAsesoriaEstudiante.vue';
import GenerarSolicitud from '@/components/estudiantes/GenerarSolicitud.vue';
import ReporteEstudiantes from '@/components/estudiantes/ReporteEstudiantes.vue';
import CalificacionAsesoria from '@/components/estudiantes/CalificacionAsesoria.vue';
import NotificacionesEstudiante from '@/components/estudiantes/NotificacionesEstudiante.vue';
import ConfiguracionEstudiante from '@/components/estudiantes/ConfiguracionEstudiante.vue';
import MandarMensaje from '@/components/estudiantes/MandarMensaje.vue';

/* Asesores */
import InicioAsesor from '@/components/asesores/InicioAsesor.vue';
import BienvenidaAsesor from '@/components/asesores/BienvenidaAsesor.vue';
import EditarPerfilAsesor from '@/components/asesores/EditarPerfilAsesor.vue';
import CerrarSesionAsesor from '@/components/asesores/CerrarSesionAsesor.vue';
import MisAsesoriasAsesor from '@/components/asesores/MisAsesoriasAsesor.vue';
import AsesoriasPendientesAsesor from '@/components/asesores/AsesoriasPendientesAsesor.vue';
import EditarAsesoriaAsesor from '@/components/asesores/EditarAsesoriaAsesor.vue';
import ReprogramarAsesoria from '@/components/asesores/ReprogramarAsesoria.vue';
import AsesoriasImpartidasAsesor from '@/components/asesores/AsesoriasImpartidasAsesor.vue';
import CalificarAsesoriaAsesor from '@/components/asesores/CalificarAsesoriaAsesor.vue';
import AgendarAsesoriaAsesor from '@/components/asesores/AgendarAsesoriaAsesor.vue';
import SolicitudesDeAsesorias from '@/components/asesores/SolicitudesDeAsesorias.vue';
import ListaDeEstudiantes from '@/components/asesores/ListaDeEstudiantes.vue';
import PerfilEstudianteAsesor from '@/components/asesores/PerfilEstudianteAsesor.vue';
import MandarMensajeAsesor from '@/components/asesores/MandarMensajeAsesor.vue';
import ReporteAsesor from '@/components/asesores/ReporteAsesor.vue';
import CalificacionAsesor from '@/components/asesores/CalificacionAsesor.vue';
import NotificacionesAsesores from '@/components/asesores/NotificacionesAsesores.vue';
import ConfiguracionAsesor from '@/components/asesores/ConfiguracionAsesor.vue';


/* Definición de rutas */                         
const routes = [
  // Rutas generales
  { path: '/', name: 'bienvenida', component: VisitaBienvenida },
  { path: '/iniciar-asesorias', name: 'iniciar-asesorias', component: IniciarAsesorias },
  { path: '/pagina-informacion', name: 'pagina-informacion', component: PaginaInformacion },

  /* Rutas Administradores */
  { path: '/admin/inicio', name: 'inicio-admin', component: InicioAdmin, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/bienvenida', name: 'bienvenida-admin', component: BienvenidaAdmin, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/editarPerfil', name: 'perfil-admin', component: EditarPerfil, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/cerrar-sesion', name: 'cerrar-sesion', component: CerrarSesion, meta: { requiresAuth: true } },
  { path: '/admin/seleccionar-usuario', name: 'seleccionar-usuario', component: SeleccionarTipoUsuario },
  { path: '/admin/usuariosAdmin', name: 'usuarios-admin', component: UsuariosAdmin, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/AgregarAdmin', name: 'Agregarusuarios-Admin', component: AgregarAdmin, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/EditarAdmin', name: 'Editar-Admin', component: EditarAdmin, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/usuariosAsesores', name: 'usuarios-asesores', component: UsuariosAsesores, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/AgregarAsesor', name: 'Agregarusuarios-Asesores', component: AgregarAsesor, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/EditarAsesores', name: 'Editar-Asesores', component: EditarAsesores, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/usuariosEstudiantes', name: 'usuarios-estudiantes', component: UsuariosEstudiantes, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/AgregarEstudiante', name: 'Agregarusuarios-Estudiante', component: AgregarEstudiante, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/EditarEstudiantes', name: 'Editar-Estudiantes', component: EditarEstudiantes, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/solicitudesAdmin', name: 'SolicitudesAdmin', component: solicitudesAdmin, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/AdminInformes', name: 'AdminInformes', component: AdminInformes, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/ListaAsesores', name: 'ListaAsesores', component: ListaAsesores, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/PerfilAsesor', name: 'PerfilAsesor', component: perfilAsesor, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/ListaEstudiantes', name: 'ListaEstudiantes', component: ListaEstudiantes, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/PerfilEstudiante', name: 'PerfilEstudiante', component: perfilEstudiante, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/NotificacionesAdmin', name: 'NotificacionAdmin', component: NotificacionesAdmin, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/configuracionAdmin', name: 'configuracionAdmin', component: configuracionAdmin, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/MandarMensajeAdmin', name: 'MensajeAdmin', component: MandarMensajeAdmin, meta: { requiresAuth: true, requiresAdmin: true } },


  /* Rutas Estudiantes */
  { path: '/estudiante/inicio', name: 'inicio-estudiante', component: InicioEstudiante, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/bienvenida', name: 'bienvenida-estudiante', component: BienvenidaEstudiante, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/registro', name: 'registro-estudiante', component: RegistroEstudiante },
  { path: '/estudiante/CerrarSesionEstudiante', name: 'CerrarSesionEstudiante', component: CerrarSesionEstudiante, meta: { requiresAuth: true } },
  { path: '/estudiante/editarPerfilEstudiante', name: 'EditarPerfilEstudiante', component: EditarPerfilEstudiante, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/MisAsesoriasEstudiante', name: 'MisAsesoriasEstudiante', component: MisAsesoriasEstudiante, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/AsesoriasPendientesEstudiantes', name: 'AsesoriasPendientesEST', component: AsesoriasPendientesEstudiantes, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/EditarAsesoriaEstudiante', name: 'EditarAsesoriaEstudiante', component: EditarAsesoriaEstudiante, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/AsesoriasImpartidasEstudiantes', name: 'AsesoriasImpartidasEST', component: AsesoriasImpartidasEstudiantes, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/CalificarAsesoria', name: 'CalificarAsesoria', component: CalificarAsesoria, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/SolicitarAsesoria', name: 'SolicitarAsesoria', component: SolicitarAsesoriaEstudiante, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/GenerarSolicitud', name: 'GenerarSolicitud', component: GenerarSolicitud, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/ReporteEstudiante', name: 'ReporteEstudiante', component: ReporteEstudiantes, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/CalificacionAsesoria', name: 'CalificacionAsesoria', component: CalificacionAsesoria, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/NotificacionesEstudiante', name: 'NotificacionesEstudiante', component: NotificacionesEstudiante, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/ConfiguracionEstudiante', name: 'ConfiguracionEstudiante', component: ConfiguracionEstudiante, meta: { requiresAuth: true, requiresEstudiante: true } },
  { path: '/estudiante/MandarMensaje', name: 'MandarMensaje', component: MandarMensaje, meta: { requiresAuth: true, requiresAdmin: true } },


  /* Rutas asesor */
  {path: '/asesor/inicio', name: 'inicio-asesor', component: InicioAsesor, meta: {requiresAuth: true, requiresAsesor: true} },
  { path: '/asesor/bienvenida', name: 'bienvenida-asesor', component: BienvenidaAsesor, meta: { requiresAuth: true, requiresAsesor: true } },
  { path: '/asesor/editarPerfilAsesor', name: 'perfil-asesor', component: EditarPerfilAsesor, meta: { requiresAuth: true, requiresAsesor: true } },
  { path: '/asesor/CerrarSesionAsesor', name: 'cerrar-sesionAsesor', component: CerrarSesionAsesor, meta: { requiresAuth: true } },
  { path: '/asesor/MisAsesoriasAsesor', name: 'MisAsesoriasAsesor', component: MisAsesoriasAsesor, meta: { requiresAuth: true, requiresAsesor: true } },
  { path: '/asesor/AsesoriasPendientesAsesor', name: 'AsesoriasPendientesAsesor', component: AsesoriasPendientesAsesor, meta: { requiresAuth: true, requiresAsesor: true } },
  { path: '/asesor/EditarAsesoriaAsesoria', name: 'EditarAsesoriaAsesor', component: EditarAsesoriaAsesor, meta: { requiresAuth: true, requiresAsesor: true } },
  { path: '/asesor/ReprogramarAsesoria', name: 'ReprogramarAsesoriaAsesor', component: ReprogramarAsesoria, meta: { requiresAuth: true, requiresAsesor: true } },
  { path: '/asesor/AsesoriasImpartidasAsesor', name: 'AsesoriasImpartidasAsesor', component: AsesoriasImpartidasAsesor, meta: { requiresAuth: true, requiresAsesor: true } },
  { path: '/asesor/CalificarAsesoriaAsesor', name: 'CalificarAsesoriaAsesor', component: CalificarAsesoriaAsesor, meta: { requiresAuth: true, requiresAsesor:true } },
  { path: '/asesor/AgendarAsesoriaAsesor', name: 'AgendarAsesoriaAsesor', component: AgendarAsesoriaAsesor, meta: { requiresAuth: true, requiresAsesor: true } },
  { path: '/asesor/SolicitudesDeAsesoria', name: 'SolicitudesAsesor', component: SolicitudesDeAsesorias, meta: { requiresAuth: true, requiresAsesor: true } },
  { path: '/asesor/ListaDeEstudiantes', name: 'UsuariosEstudiantes', component: ListaDeEstudiantes, meta: { requiresAuth: true, requiresAsesor: true } },
  { path: '/asesor/PerfilEstudianteAsesor', name: 'PerfilEstudianteAsesor', component: PerfilEstudianteAsesor, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/asesor/MandarMensajeAsesor', name: 'MensajeAsesor', component: MandarMensajeAsesor, meta: { requiresAuth: true, requiresAdmin:  true } },
  { path: '/asesor/ReporteAsesor', name: 'InformesAsesor', component: ReporteAsesor, meta: { requiresAuth: true, requiresAdmin:  true } },
  { path: '/asesor/CalificacionAsesor', name: 'CalificacionAsesor', component: CalificacionAsesor, meta: { requiresAuth: true, requiresAdmin:  true } },
  { path: '/asesor/NotificacionesAsesores', name: 'NotificacionesAsesor', component: NotificacionesAsesores, meta: { requiresAuth: true, requiresAdmin:  true } },
  { path: '/asesor/ConfiguracionAsesor', name: 'ConfiguracionAsesor', component: ConfiguracionAsesor, meta: { requiresAuth: true, requiresAdmin:  true } },




];

const router = createRouter({
  history: createWebHistory(), 
  routes, 
});

export default router;

