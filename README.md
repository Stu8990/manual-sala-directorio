# 🎥 Manual de Uso - Sala de Directorio

Manual web interactivo, simple y directo para el uso del sistema de videoconferencias de la Sala de Directorio Principal de Expoflores.

## ✨ Características Principales

- ✅ **Súper Simple:** Todo visible de un vistazo, sin clicks extra
- ✅ **Botones Grandes:** Acceso rápido a las tareas principales
- ✅ **Pasos Numerados:** Instrucciones claras paso a paso
- ✅ **100% Responsive:** Funciona perfecto en móviles, tablets y computadoras
- ✅ **Sin Acordeones:** Todo el contenido visible sin expandir nada
- ✅ **Código Comentado:** Fácil de entender y modificar

## 📋 Contenido del Manual

1. **Botones de Acceso Rápido** - 4 botones grandes para ir directo a lo que necesitas
2. **Normas Importantes** - Advertencias visuales sobre el cuidado del equipo
3. **Componentes** - Los 4 elementos principales de la sala
4. **Encender Equipo** - 4 pasos simples con imágenes
5. **Videoconferencia** - Cómo iniciar Teams/Zoom en 3 pasos
6. **Proyectar Laptop** - Flujo visual de AnyDesk (laptop → mac → laptop)
7. **Solución de Problemas** - 5 problemas comunes con soluciones
8. **Apagado** - 3 pasos para apagar correctamente
9. **Soporte Técnico** - Información de contacto

## 🚀 Ver el Manual Localmente

Simplemente abre `index.html` en tu navegador:

1. Navega a la carpeta del proyecto
2. Doble clic en `index.html`
3. ¡Listo! El manual se abre en tu navegador predeterminado

## 📤 Publicar en GitHub Pages

### Paso 1: Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en "New Repository" (botón verde)
3. Nombre sugerido: `manual-sala-directorio`
4. Selecciona "Public"
5. NO marques ninguna casilla adicional
6. Clic en "Create repository"

### Paso 2: Subir los Archivos

```bash
# En tu terminal, navega a esta carpeta
cd "C:\Users\cmcomunicacion\Desktop\STU\proyetco sala directorio"

# Verifica que git esté inicializado
git status

# Si NO está inicializado, ejecuta:
git init

# Agrega todos los archivos
git add .

# Crea el commit
git commit -m "Manual interactivo de sala de directorio"

# Conecta con tu repositorio (reemplaza TU-USUARIO y TU-REPO)
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git

# Sube los archivos
git branch -M main
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Clic en "Settings" (arriba a la derecha)
3. En el menú lateral izquierdo, busca "Pages"
4. En "Source", selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
5. Clic en "Save"
6. Espera 1-2 minutos
7. Recarga la página
8. Verás el link de tu sitio: `https://TU-USUARIO.github.io/TU-REPO/`

## 📁 Estructura del Proyecto

```
proyetco-sala-directorio/
│
├── index.html          # Página principal (HTML comentado)
├── styles.css          # Estilos responsive (CSS comentado)
├── script.js           # Funcionalidad interactiva (JS comentado)
├── README.md           # Este archivo
├── .gitignore          # Archivos ignorados por Git
│
├── resources/          # Imágenes del manual
│   ├── WhatsApp Image... (múltiples imágenes)
│   ├── camarakandao.jpeg
│   ├── pantalla de bloqueo mini mac.jpeg
│   └── ...
│
└── guia sala directorio.pdf  # Documento original de referencia
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables en `styles.css` (líneas 7-18):

```css
:root {
    --primary: #2E5C8A;        /* Azul principal - Cambia aquí */
    --secondary: #4A90E2;      /* Azul claro */
    --success: #27AE60;        /* Verde */
    --warning: #F39C12;        /* Naranja */
    --danger: #E74C3C;         /* Rojo */
}
```

### Agregar/Cambiar Imágenes

1. Coloca tu imagen en la carpeta `resources/`
2. En `index.html`, busca la etiqueta `<img>`
3. Cambia el atributo `src`:

```html
<!-- ANTES -->
<img src="resources/WhatsApp Image... .jpeg" alt="Monitores">

<!-- DESPUÉS -->
<img src="resources/mi-nueva-imagen.jpg" alt="Monitores">
```

### Modificar Texto

Simplemente abre `index.html` y edita el contenido. Los comentarios te guiarán:

```html
<!--
    ========================================
    CÓMO ENCENDER
    ========================================
    Pasos simples y numerados para encender el equipo
-->
<section id="como-encender" class="section steps-section">
    <!-- Tu contenido aquí -->
</section>
```

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con variables CSS y Grid/Flexbox
- **JavaScript Vanilla** - Sin frameworks, 100% puro
- **Comentarios Extensos** - Cada línea explicada para fácil comprensión

## 📱 Compatibilidad

Probado y funcionando en:
- ✅ Chrome (Windows, Mac, Android)
- ✅ Firefox (Windows, Mac)
- ✅ Safari (Mac, iOS)
- ✅ Edge (Windows)
- ✅ Móviles iOS y Android

## 🔧 Características Técnicas

### HTML
- Estructura semántica con comentarios
- Secciones claramente identificadas
- IDs para navegación directa

### CSS
- Variables CSS para fácil personalización
- Grid y Flexbox para layouts responsive
- Media queries para móviles
- Comentarios explicativos en cada sección

### JavaScript
- Smooth scroll automático
- Botón "volver arriba" flotante
- Animaciones al hacer scroll
- Copiar contraseña con un clic
- Manejo de errores de imágenes
- Detección de dispositivo móvil
- TODO el código comentado línea por línea

## 📞 Soporte Técnico

**Para problemas con el equipo de la sala:**
- edison.vaca@expoflores.com
- s.palma@expoflores.com
- admin.sistemas1@expoflores.com

**Para problemas con el manual web:**
- s.palma@expoflores.com

**Horario:** Lunes a Viernes, 8:00 - 17:00

## 📝 Notas para Desarrolladores

### Entender el Código

Todos los archivos tienen comentarios extensos:

```javascript
// script.js - Ejemplo de comentarios
// ========================================
// SMOOTH SCROLL
// ========================================
/*
   Cuando el usuario hace clic en un enlace (#como-encender),
   la página se desplaza suavemente en lugar de saltar.
*/
document.querySelectorAll('a[href^="#"]').forEach(function(enlace) {
    // ... código explicado línea por línea
});
```

### Debugging

1. Abre la consola del navegador (F12)
2. Busca mensajes en color rojo (errores)
3. Los `console.log()` te mostrarán qué está pasando
4. Todos los errores tienen descripciones claras

### Agregar Nueva Funcionalidad

1. Abre `script.js`
2. Copia el patrón de las funciones existentes
3. Agrega comentarios explicativos
4. Llama tu función al final del archivo

## 🎯 Diferencias con la Versión Anterior

### Versión 1 (Anterior)
- ❌ Acordeones que había que expandir
- ❌ Mucho scrolling
- ❌ Navegación sticky compleja
- ❌ Menos visual

### Versión 2 (Actual)
- ✅ Todo visible de inmediato
- ✅ Botones grandes de acceso rápido
- ✅ Pasos con números gigantes
- ✅ Flujo visual de AnyDesk con flechas
- ✅ Cards grandes y fáciles de ver
- ✅ Código 100% comentado
- ✅ Más rápido de usar

## 📄 Licencia

© 2025 Expoflores - Todos los derechos reservados

---

**Desarrollado por:** Stuart Palma
**Email:** s.palma@expoflores.com
**Año:** 2025
**Versión:** 2.0.0 (Simplificada)
