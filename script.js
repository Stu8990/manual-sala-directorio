/* ========================================
   SCRIPT.JS - FUNCIONALIDAD DEL MANUAL
   ========================================
   Este archivo maneja toda la interactividad del manual
   Última actualización: 2025
   Autor: Stuart Palma
*/

// ========================================
// SMOOTH SCROLL
// ========================================
/*
   Cuando el usuario hace clic en un enlace (#como-encender, #problemas, etc.),
   la página se desplaza suavemente en lugar de saltar bruscamente.

   Cómo funciona:
   1. Busca todos los enlaces que empiezan con #
   2. Cuando se hace clic, cancela el comportamiento normal
   3. Encuentra el elemento destino
   4. Se desplaza suavemente hasta ese elemento
*/

document.querySelectorAll('a[href^="#"]').forEach(function(enlace) {
    enlace.addEventListener('click', function(evento) {
        // Prevenir el salto brusco
        evento.preventDefault();

        // Obtener el ID del destino (ej: "#como-encender")
        const destino = this.getAttribute('href');

        // Buscar el elemento en la página
        const elemento = document.querySelector(destino);

        // Si existe el elemento, hacer scroll suave
        if (elemento) {
            elemento.scrollIntoView({
                behavior: 'smooth',    // Desplazamiento suave
                block: 'start'         // Alinear al inicio
            });
        }
    });
});

// ========================================
// MANEJO DE IMÁGENES QUE NO CARGAN
// ========================================
/*
   Si una imagen no puede cargarse (ruta incorrecta, archivo no existe),
   en lugar de mostrar el icono roto, muestra un placeholder bonito.

   Esto es útil mientras organizas las fotografías.
*/

document.querySelectorAll('img').forEach(function(imagen) {
    imagen.addEventListener('error', function() {
        // Ocultar la imagen rota
        this.style.display = 'none';

        // Crear un placeholder
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 20px;
            text-align: center;
            border-radius: 10px;
            font-size: 1.1rem;
            margin: 20px 0;
        `;
        placeholder.textContent = '📷 Imagen: ' + this.alt || 'Imagen no disponible';

        // Insertar el placeholder después de la imagen
        this.parentElement.appendChild(placeholder);
    });
});

// ========================================
// BOTÓN "VOLVER ARRIBA"
// ========================================
/*
   Crea un botón flotante que aparece cuando haces scroll hacia abajo.
   Al hacer clic, te lleva de vuelta al inicio de la página.

   Características:
   - Aparece solo después de hacer scroll 300px
   - Posición fija en la esquina inferior derecha
   - Desaparece cuando estás en la parte superior
*/

function crearBotonVolverArriba() {
    // Crear el botón
    const boton = document.createElement('button');
    boton.innerHTML = '↑';
    boton.setAttribute('aria-label', 'Volver arriba');
    // Ajustar posición según si es móvil o desktop
    const esMobile = window.innerWidth <= 768;
    const bottomPosition = esMobile ? '30px' : '30px'; // Mismo para ambos ahora

    boton.style.cssText = `
        position: fixed;
        bottom: ${bottomPosition};
        right: 30px;
        background: linear-gradient(135deg, #2E5C8A 0%, #4A90E2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        font-size: 1.8rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;

    // Cuando se hace clic, volver arriba
    boton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mostrar/ocultar según la posición del scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            // Mostrar el botón
            boton.style.opacity = '1';
            boton.style.visibility = 'visible';
        } else {
            // Ocultar el botón
            boton.style.opacity = '0';
            boton.style.visibility = 'hidden';
        }
    });

    // Efecto hover
    boton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
    });

    boton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    });

    // Agregar el botón al body
    document.body.appendChild(boton);
}

// Ejecutar la función cuando la página carga
crearBotonVolverArriba();

// ========================================
// BOTONES STICKY (PEGADOS ARRIBA)
// ========================================
/*
   Hace que los botones de acceso rápido se queden pegados arriba
   cuando haces scroll, pero se hacen más pequeños para no ocupar
   tanto espacio.

   Cómo funciona:
   1. Detecta la posición inicial de los botones
   2. Cuando haces scroll y pasas esa posición, agrega clase "sticky"
   3. Los estilos CSS se encargan de hacer los botones más pequeños
*/

function hacerBotonesSticky() {
    const quickAccess = document.querySelector('.quick-access');

    if (!quickAccess) return;  // Si no existe, salir

    // Obtener la posición inicial del elemento
    const stickyPoint = quickAccess.offsetTop;

    // Función que se ejecuta al hacer scroll
    function checkSticky() {
        // Si el scroll pasó el punto donde están los botones
        if (window.scrollY > stickyPoint - 10) {
            // Agregar clase "sticky" para hacerlos pequeños
            quickAccess.classList.add('sticky');
        } else {
            // Quitar clase cuando volvemos arriba
            quickAccess.classList.remove('sticky');
        }
    }

    // Escuchar el evento de scroll
    window.addEventListener('scroll', checkSticky);

    // Ejecutar una vez al cargar por si ya está scrolleado
    checkSticky();
}

// Ejecutar cuando la página carga
hacerBotonesSticky();

// ========================================
// MENÚ FLOTANTE MÓVIL
// ========================================
/*
   En móviles, muestra un botón flotante con menú desplegable
   para acceso rápido a las secciones principales.

   Cómo funciona:
   1. Solo se muestra en móviles (menos de 768px de ancho)
   2. Aparece cuando haces scroll hacia abajo
   3. Al tocar el botón, despliega el menú con las 4 opciones
   4. Al tocar una opción, navega y cierra el menú
*/

function menuFlotanteMovil() {
    const floatingBtn = document.getElementById('floatingMenuBtn');
    const floatingMenu = document.getElementById('floatingMenu');
    const menuItems = document.querySelectorAll('.floating-menu-item');

    if (!floatingBtn || !floatingMenu) return;

    let menuAbierto = false;

    // Función para mostrar/ocultar el botón según scroll y ancho de pantalla
    function actualizarVisibilidad() {
        const esMobile = window.innerWidth <= 768;
        const scrollY = window.scrollY;

        if (esMobile && scrollY > 300) {
            // Mostrar SOLO el botón en móvil si hay scroll
            floatingBtn.style.display = 'block';
            // NO mostrar el menú automáticamente, solo cuando se haga clic
        } else {
            // Ocultar todo en desktop o si no hay scroll
            floatingBtn.style.display = 'none';
            floatingMenu.classList.remove('open');
            menuAbierto = false;
        }
    }

    // Toggle del menú (abrir/cerrar)
    floatingBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Evitar que el click se propague

        if (menuAbierto) {
            // Cerrar menú
            floatingMenu.classList.remove('open');
            floatingBtn.textContent = '⚡ Menú Rápido';
            menuAbierto = false;
        } else {
            // Abrir menú
            floatingMenu.classList.add('open');
            floatingBtn.textContent = '✕ Cerrar';
            menuAbierto = true;
        }
    });

    // Cerrar menú al hacer clic en un item
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            floatingMenu.classList.remove('open');
            floatingBtn.textContent = '⚡ Menú Rápido';
            menuAbierto = false;
        });
    });

    // Cerrar menú si se hace clic fuera de él
    document.addEventListener('click', function(e) {
        if (menuAbierto &&
            !floatingMenu.contains(e.target) &&
            !floatingBtn.contains(e.target)) {
            floatingMenu.classList.remove('open');
            floatingBtn.textContent = '⚡ Menú Rápido';
            menuAbierto = false;
        }
    });

    // Actualizar visibilidad al hacer scroll
    window.addEventListener('scroll', actualizarVisibilidad);

    // Actualizar visibilidad al cambiar tamaño de ventana
    window.addEventListener('resize', actualizarVisibilidad);

    // Ejecutar al cargar
    actualizarVisibilidad();
}

// Ejecutar cuando la página carga
menuFlotanteMovil();

// ========================================
// ANIMACIÓN AL HACER SCROLL
// ========================================
/*
   Agrega una clase a los elementos cuando aparecen en la pantalla.
   Esto permite crear animaciones de "fade in" cuando haces scroll.

   Cómo funciona:
   1. Observa todos los elementos .step-card, .problem-card, etc.
   2. Cuando el elemento entra en la vista, agrega la clase 'visible'
   3. CSS puede usar esta clase para animar la entrada
*/

function animarAlHacerScroll() {
    // Elementos que queremos animar
    const elementos = document.querySelectorAll('.step-card, .problem-card, .component-simple');

    // Configurar el observador
    const opciones = {
        threshold: 0.1,     // 10% del elemento debe ser visible
        rootMargin: '0px 0px -50px 0px'
    };

    // Crear el observador
    const observador = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // El elemento es visible, agregar clase
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, opciones);

    // Aplicar estilos iniciales y observar cada elemento
    elementos.forEach(function(elemento) {
        // Estado inicial (invisible y ligeramente abajo)
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Comenzar a observar
        observador.observe(elemento);
    });
}

// Ejecutar cuando la página carga
animarAlHacerScroll();

// ========================================
// RESALTAR SECCIÓN ACTUAL
// ========================================
/*
   Opcional: Si tienes una navegación, esta función resaltaría
   el enlace de la sección que estás viendo actualmente.

   Por ahora está desactivada, pero puedes usarla si agregas
   una barra de navegación sticky.
*/

function resaltarSeccionActual() {
    const secciones = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let seccionActual = '';

        secciones.forEach(function(seccion) {
            const posicionSeccion = seccion.offsetTop;
            const alturaSeccion = seccion.clientHeight;

            // Si la posición del scroll está en esta sección
            if (window.scrollY >= posicionSeccion - 100) {
                seccionActual = seccion.getAttribute('id');
            }
        });

        // Aquí podrías agregar una clase 'active' a los enlaces de navegación
        // basándote en seccionActual
        console.log('Sección actual:', seccionActual);
    });
}

// Descomentar si quieres activar esta función
// resaltarSeccionActual();

// ========================================
// COPIAR CONTRASEÑA AL HACER CLIC
// ========================================
/*
   Permite copiar la contraseña al portapapeles haciendo clic en ella.
   Esto facilita a los usuarios copiar la contraseña sin tener que escribirla.
*/

function habilitarCopiarContrasena() {
    const passwordElement = document.querySelector('.password-big');

    if (passwordElement) {
        // Hacer que se vea clickeable
        passwordElement.style.cursor = 'pointer';
        passwordElement.title = 'Haz clic para copiar';

        passwordElement.addEventListener('click', function() {
            // Obtener el texto de la contraseña
            const password = this.textContent;

            // Copiar al portapapeles
            navigator.clipboard.writeText(password).then(function() {
                // Mostrar mensaje de éxito
                const mensajeOriginal = passwordElement.textContent;
                passwordElement.textContent = '✓ Copiado!';
                passwordElement.style.background = '#27AE60';

                // Volver al estado original después de 2 segundos
                setTimeout(function() {
                    passwordElement.textContent = mensajeOriginal;
                    passwordElement.style.background = '#2C3E50';
                }, 2000);
            });
        });
    }
}

// Ejecutar cuando la página carga
habilitarCopiarContrasena();

// ========================================
// DETECTAR DISPOSITIVO MÓVIL
// ========================================
/*
   Detecta si el usuario está en un móvil o tablet.
   Esto permite ajustar comportamientos específicos.
*/

function esDispositivoMovil() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Si es móvil, agregar clase al body
if (esDispositivoMovil()) {
    document.body.classList.add('es-movil');
    console.log('Usuario en dispositivo móvil');
} else {
    console.log('Usuario en computadora');
}

// ========================================
// IMPRIMIR PÁGINA
// ========================================
/*
   Función opcional para agregar un botón de "Imprimir Manual".
   Útil si quieres que los usuarios puedan imprimir una copia física.
*/

function agregarBotonImprimir() {
    // Esta función está desactivada por defecto
    // Descomenta el código si quieres agregar un botón de imprimir

    /*
    const botonImprimir = document.createElement('button');
    botonImprimir.textContent = '🖨️ Imprimir Manual';
    botonImprimir.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: white;
        color: #2E5C8A;
        border: 2px solid #2E5C8A;
        border-radius: 25px;
        padding: 12px 20px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;

    botonImprimir.addEventListener('click', function() {
        window.print();
    });

    document.body.appendChild(botonImprimir);
    */
}

// Descomentar si quieres el botón de imprimir
// agregarBotonImprimir();

// ========================================
// LOG DE BIENVENIDA EN LA CONSOLA
// ========================================
/*
   Muestra un mensaje en la consola del navegador
   (F12 para verla en Chrome/Edge/Firefox)

   Útil para desarrolladores que inspeccionen el sitio.
*/

console.log('%c🎥 Manual de Uso - Sala de Directorio', 'background: #2E5C8A; color: white; font-size: 18px; padding: 10px; border-radius: 5px;');
console.log('%c📚 Desarrollado por Stuart Palma - 2025', 'background: #4A90E2; color: white; font-size: 12px; padding: 5px;');
console.log('📧 Contacto: s.palma@expoflores.com');
console.log('');
console.log('💡 Tip: Todas las funciones del manual están documentadas en script.js');

// ========================================
// INICIALIZACIÓN COMPLETA
// ========================================
/*
   Mensaje que se ejecuta cuando TODO el DOM está cargado.
   Útil para asegurarse de que todos los elementos existen
   antes de manipularlos.
*/

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Manual cargado correctamente');
    console.log('🚀 Todas las funcionalidades están activas');

    // Puedes agregar más inicializaciones aquí si es necesario
});

// ========================================
// FIN DEL SCRIPT
// ========================================

/*
   NOTAS PARA PERSONALIZACIÓN:

   1. CAMBIAR COLORES:
      - Edita las variables en styles.css (líneas 1-19)

   2. AGREGAR MÁS FUNCIONALIDAD:
      - Copia el patrón de las funciones existentes
      - Agrega comentarios explicativos
      - Llama tu función al final del archivo

   3. DEBUGGING:
      - Abre la consola (F12)
      - Busca errores en color rojo
      - Los console.log() te ayudarán a entender qué pasa

   4. COMPATIBILIDAD:
      - Este código funciona en todos los navegadores modernos
      - Chrome, Firefox, Safari, Edge (2020+)

   5. RENDIMIENTO:
      - El código está optimizado para ser rápido
      - No usa librerías externas (jQuery, etc.)
      - Vanilla JavaScript puro
*/
