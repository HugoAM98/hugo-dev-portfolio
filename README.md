# Portfolio Personal - Hugo Almaguer Mendoza

Portfolio profesional desarrollado con Next.js 15, TypeScript y Tailwind CSS. Un sitio web moderno y completamente responsive que muestra mi experiencia como desarrollador Full Stack, proyectos destacados y habilidades técnicas.

## 🚀 Características

- **Diseño Moderno**: Interfaz con estilo neon/cyberpunk, animaciones fluidas y efectos visuales impactantes
- **Completamente Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **Multilenguaje**: Soporte para Español e Inglés con cambio dinámico de idioma
- **SEO Optimizado**: Metadata completo, Open Graph, Schema.org markup, sitemap y robots.txt
- **Performance**: Lazy loading, code splitting, optimización de imágenes y preload de recursos
- **Accesibilidad**: ARIA labels, navegación por teclado, focus states y contraste WCAG AA
- **Formulario de Contacto**: Sistema funcional con validación en tiempo real y protección anti-spam
- **Animaciones**: Implementadas con Framer Motion para una experiencia fluida y profesional

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Internacionalización**: next-intl
- **Iconos**: Lucide React
- **Notificaciones**: react-hot-toast
- **Validación**: Zod

## 📦 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

El sitio estará disponible en `http://localhost:3000`

## 🎨 Estructura del Proyecto

```
portfolio/
├── app/
│   ├── [locale]/          # Rutas localizadas (es/en)
│   │   ├── layout.tsx     # Layout principal con metadata
│   │   ├── page.tsx       # Página principal
│   │   ├── schema.ts      # Schema.org markup
│   │   └── viewport.ts    # Configuración de viewport
│   ├── api/
│   │   └── contact/       # API endpoint para formulario
│   ├── opengraph-image.tsx # Generación de OG images
│   ├── sitemap.ts         # Sitemap dinámico
│   ├── robots.ts          # Configuración de robots.txt
│   └── not-found.tsx     # Página 404 personalizada
├── components/
│   ├── Hero.tsx           # Sección hero con animaciones
│   ├── About.tsx          # Experiencia y formación
│   ├── Skills.tsx          # Habilidades técnicas
│   ├── Projects.tsx         # Portfolio de proyectos
│   ├── Contact.tsx        # Formulario de contacto
│   ├── Navigation.tsx     # Barra de navegación
│   ├── LanguageSwitcher.tsx # Selector de idioma
│   └── ErrorBoundary.tsx  # Manejo de errores
├── messages/
│   ├── es.json            # Traducciones en español
│   └── en.json            # Traducciones en inglés
├── i18n/
│   └── request.ts         # Configuración de next-intl
└── public/                # Assets estáticos
```

## 🌐 Configuración de Idiomas

El portfolio soporta dos idiomas:
- **Español (es)**: Idioma por defecto - `/es` o `/`
- **Inglés (en)**: Idioma alternativo - `/en`

El cambio de idioma se realiza mediante el selector en la barra de navegación y actualiza toda la interfaz dinámicamente sin recargar la página.

## 📧 Formulario de Contacto

El formulario de contacto incluye:
- Validación en tiempo real de todos los campos
- Protección anti-spam mediante campo honeypot
- Feedback visual con toast notifications
- Estados de loading y manejo de errores
- Mensajes de éxito/error claros

**Nota**: Para que el formulario envíe emails, es necesario configurar un servicio de email (Resend, SendGrid, EmailJS, etc.) en `/app/api/contact/route.ts`.

### Ejemplo con Resend:

```typescript
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'Portfolio <onboarding@resend.dev>',
  to: 'tu@email.com',
  subject: `New contact from ${name}`,
  html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
})
```

## 🎯 SEO y Metadata

El portfolio está completamente optimizado para SEO:

- **Metadata dinámico** por idioma (títulos, descripciones, keywords)
- **Open Graph images** generadas automáticamente
- **Schema.org markup** (Person, WebSite, WebPage)
- **Sitemap.xml** dinámico
- **Robots.txt** optimizado
- **Canonical URLs** por idioma
- **Twitter Cards** configuradas

## ⚡ Optimizaciones de Performance

- **Lazy loading** de componentes pesados (Projects, Contact)
- **Code splitting** automático por Next.js
- **Optimización de imágenes** con Next.js Image
- **Preload de fuentes** críticas (Google Fonts)
- **Compresión** de assets habilitada
- **ETags** para caching
- **Loading skeletons** para mejor UX

## ♿ Accesibilidad

El sitio cumple con estándares de accesibilidad WCAG AA:

- **ARIA labels** en todos los elementos interactivos
- **Navegación completa por teclado**
- **Focus states** visibles y mejorados
- **Contraste de colores** verificado
- **Skip to content** link
- **Roles semánticos** correctos
- **Mensajes de error** accesibles

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Configura las variables de entorno:
   - `NEXT_PUBLIC_SITE_URL`: URL de tu sitio (ej: `https://hugoamdeveloper.com`)
3. Deploy automático en cada push a la rama principal

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SITE_URL=https://tudominio.com
RESEND_API_KEY=tu_api_key_aqui  # Si usas Resend para emails
```

### Otras Plataformas

El proyecto puede desplegarse en cualquier plataforma que soporte Next.js:
- **Netlify**: Conectar repositorio y configurar build command `npm run build`
- **AWS Amplify**: Soporte nativo para Next.js
- **Railway**: Deploy automático desde GitHub
- **DigitalOcean App Platform**: Configuración sencilla

## 📝 Personalización

### Actualizar Información Personal

1. **Experiencia Laboral**: Edita el array `experience` en `components/About.tsx`
2. **Formación**: Edita el array `education` en `components/About.tsx`
3. **Habilidades**: Edita el array `skills` en `components/Skills.tsx`
4. **Proyectos**: Edita el array `projects` en `components/Projects.tsx`
5. **Redes Sociales**: Edita el array `socialLinks` en `components/Contact.tsx`
6. **Traducciones**: Edita `messages/es.json` y `messages/en.json`

### Cambiar Colores y Estilos

Los colores principales están definidos en `tailwind.config.js`:

```javascript
colors: {
  neon: {
    cyan: '#06b6d4',
    purple: '#a855f7',
    pink: '#ec4899',
    amber: '#f59e0b',
  },
  dark: {
    bg: '#080810',
    card: '#0f0f1a',
    border: '#1a1a2e',
  },
}
```

Los estilos globales y animaciones personalizadas están en `app/globals.css`.

### Configurar Email

Para activar el envío de emails, edita `/app/api/contact/route.ts` y configura tu servicio de email preferido:

- **Resend** (Recomendado): Gratis hasta 3,000 emails/mes
- **SendGrid**: Plan gratuito disponible
- **EmailJS**: Fácil de implementar, solo frontend
- **Nodemailer**: Para servidores propios

## 🐛 Troubleshooting

### Error de Runtime "a[d] is not a function"

Este error puede ocurrir si las animaciones de Framer Motion no tienen el parámetro `times` configurado. Asegúrate de que todas las animaciones con arrays tengan:

```typescript
transition={{
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut',
  repeatType: 'loop' as const,
  times: [0, 0.5, 1], // Importante para arrays
}}
```

### Warning de metadataBase

El warning sobre `metadataBase` es informativo y no afecta la funcionalidad. Se resuelve automáticamente en producción cuando `NEXT_PUBLIC_SITE_URL` está configurado.

### Problemas de Build

Si el build falla, verifica:
1. Todas las dependencias están instaladas: `npm install`
2. No hay errores de TypeScript: `npm run build`
3. Las traducciones están completas en ambos idiomas

## 📄 Licencia

Este proyecto es de uso personal. Todos los derechos reservados.

## 👨‍💻 Autor

**Hugo Almaguer Mendoza**

- Portfolio: [hugoamdeveloper.com](https://hugoamdeveloper.com)
- LinkedIn: [Tu LinkedIn]
- GitHub: [Tu GitHub]
- Email: [Tu email]

---

Desarrollado con ❤️ usando Next.js, TypeScript y Tailwind CSS.
