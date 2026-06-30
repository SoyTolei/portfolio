function refreshIcons() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    refreshIcons();
    initReveal();
    initNavSpy();
    initProjectFilters();
});

/* ── Navbar ── */
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navEnd = document.querySelector('.nav-end');

window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
});

if (navToggle && navEnd) {
    navToggle.addEventListener('click', () => {
        const isOpen = navEnd.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navEnd.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            navEnd.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});

function initNavSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            links.forEach(link => {
                link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
            });
        });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s));
}

/* ── Reveal ── */
function initReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
        '.card, .section-title, .section-lead, .hero-content, .hero-visual, .hero-stat, .project-card, .contact-info, .contact-form-card'
    ).forEach((el, i) => {
        el.classList.add('reveal');
        if (i % 3 === 1) el.classList.add('reveal-delay-1');
        if (i % 3 === 2) el.classList.add('reveal-delay-2');
        observer.observe(el);
    });
}

/* ── Project filters ── */
function initProjectFilters() {
    const filters = document.querySelectorAll('.project-filter');
    const cards = document.querySelectorAll('.project-card[data-category]');

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filters.forEach(f => {
                f.classList.toggle('is-active', f === btn);
                f.setAttribute('aria-selected', f === btn ? 'true' : 'false');
            });

            cards.forEach(card => {
                const cat = card.dataset.category;
                const show = filter === 'all' || cat === filter;
                card.classList.toggle('is-hidden', !show);
            });
        });
    });
}

/* ── i18n ── */
const translations = {
    es: {
        logo_sub: 'Leonel Gallo · IT Support',
        nav_about: 'Sobre mí',
        nav_experience: 'Experiencia',
        nav_skills: 'Skills',
        nav_projects: 'Proyectos',
        nav_contact: 'Contacto',
        hero_badge: 'Thomson Reuters · Bejerman · ST2',
        hero_name: 'Leonel Gallo',
        hero_alias: 'Tolei',
        hero_tagline: 'Soporte técnico · SQL Server · automatización',
        hero_subtitle: 'Mantengo entornos Bejerman y SQL Server en producción. Cuando algo se repite en la mesa de ayuda, lo llevo a la suite <strong>ST2</strong> — empezó en Python, hoy en .NET. Buenos Aires.',
        hero_stat_years: 'Años en IT',
        hero_stat_projects: 'Proyectos',
        hero_stat_suite: 'Suite propia',
        hero_cta_projects: 'Ver proyectos',
        hero_cta_cv: 'Descargar CV',
        about_label: 'Perfil',
        about_title: 'Sobre mí',
        about_lead: 'Soporte técnico de base, desarrollador de herramientas por necesidad. Mi fuerte está en entender el problema del usuario y traducirlo en algo que funcione de verdad.',
        about_p1: 'Trabajo en soporte técnico e infraestructura desde hace varios años. Me enfoco en mantener sistemas estables, resolver incidencias con claridad y dejar procesos más ordenados que cuando los encontré.',
        about_p2: 'En <strong>Thomson Reuters</strong> doy soporte a empresas y estudios contables con <strong>Sistemas Bejerman</strong>: SQL Server, instalaciones, consultas y entornos críticos donde cada minuto cuenta.',
        about_p3: 'En paralelo al trabajo diario, desarrollé la suite <strong>ST2</strong> — herramientas de productividad para documentar casos, consultar conocimiento técnico y automatizar tareas de soporte en Bejerman. Empezó en Python; hoy es <strong>C# / .NET</strong> con versión web.',
        highlight_title: 'De la mesa de ayuda al código',
        highlight_p: 'Cada módulo ST2 resolvió un dolor concreto del soporte: textos de casos inconsistentes, backups lentos, chequeos de instalación repetitivos. Automatizar eso es mi forma de sumar valor al equipo.',
        value_stability: 'Estabilidad',
        value_response: 'Respuesta rápida',
        value_tools: 'Herramientas útiles',
        value_clarity: 'Claridad',
        value_teamwork: 'Trabajo en equipo',
        value_data: 'Precisión en datos',
        value_stability_tip: 'SQL Server y Bejerman siempre disponibles.',
        value_response_tip: 'Incidencias cerradas con tiempos claros.',
        value_tools_tip: 'Convertir problemas repetitivos en herramientas ST2.',
        value_clarity_tip: 'Explicar lo técnico en lenguaje entendible.',
        value_teamwork_tip: 'Coordinar con soporte, ops y negocio.',
        value_data_tip: 'Datos consistentes en sistemas y bases.',
        exp_label: 'Trayectoria',
        exp_title: 'Experiencia',
        exp_present: 'Presente',
        exp_tr_title: 'Analista de Soporte Técnico',
        exp_tr_b1: 'Soporte a empresas y estudios contables usuarios de Sistemas Bejerman.',
        exp_tr_b2: 'Administración SQL Server, instalación y configuración de sistemas.',
        exp_tr_b3: 'Desarrollo de herramientas de productividad (suite ST2) para el flujo de soporte.',
        exp_9z_title: 'DBA & IT Support',
        exp_9z_b1: 'Bases de datos SQL y servidores para plataforma de gaming de alto rendimiento.',
        exp_9z_b2: 'Gestión de servidores, usuarios VIP y monitoreo de rendimiento.',
        exp_9z_b3: 'Coordinación con operaciones para mantener la plataforma estable.',
        exp_gms_title: 'Data Entry Specialist',
        exp_gms_b1: 'Ingreso y validación de datos con alto nivel de precisión.',
        exp_gms_b2: 'Control de información y verificación de consistencia.',
        skills_label: 'Stack',
        skills_title: 'Habilidades técnicas',
        skills_data_title: 'Datos & SQL',
        skills_dev_title: 'Desarrollo .NET',
        skills_support_title: 'Soporte & Infra',
        skills_auto_title: 'Automatización',
        projects_label: 'Portfolio',
        projects_title: 'Proyectos',
        projects_lead: 'Herramientas de productividad que desarrollé para agilizar el soporte técnico en entornos Bejerman. Proyectos personales, no oficiales de Thomson Reuters.',
        projects_disclaimer: 'Las herramientas ST2 son iniciativas propias de productividad, creadas en el marco de mi rol en soporte. No representan productos ni posiciones oficiales de Thomson Reuters.',
        filter_all: 'Todos',
        filter_st2: 'Suite ST2',
        filter_python: 'Python',
        filter_exp: 'Experiencia',
        filter_creative: 'Creativo',
        proj_st2_badge: 'Desktop · .NET',
        proj_st2_title: 'ST2 — Sistema de Planillas',
        proj_st2_p1: 'Suite de escritorio para técnicos de soporte: unifica en un solo lugar la documentación de casos, la búsqueda de conocimiento y el acceso a recursos web del día a día.',
        proj_st2_features: '<ul><li>Planillas guiadas por tipo de gestión (transferencias, escalamientos, oportunidades)</li><li>Buscador de documentación, FAQs y manuales en tiempo real</li><li>Acceso integrado a recursos web del soporte</li><li>Actualizaciones automáticas del ejecutable</li></ul>',
        proj_st2web_badge: 'Web · misma suite',
        proj_st2web_title: 'ST2 WEB',
        proj_st2web_p1: 'La misma suite ST2, accesible desde el navegador. Comparte la lógica del ejecutable en una API con frontend estático — ideal para consultar conocimiento y planillas sin instalar nada.',
        proj_st2web_features: '<ul><li>Misma lógica que el ejecutable, sin instalación</li><li>API REST con credenciales solo en servidor</li><li>Módulos de planillas y buscador de conocimiento</li><li>Preparado para uso en red interna</li></ul>',
        proj_sbbackup_badge: 'SQL Server',
        proj_sbbackup_title: 'ST2 — Backup y Restauración',
        proj_sbbackup_p1: 'Herramienta para respaldar y restaurar bases SQL Server del ecosistema Bejerman, con detección automática del entorno y empaquetado listo para archivar o migrar.',
        proj_sbbackup_features: '<ul><li>Detección de servidor y bases vía registro ODBC</li><li>Backup múltiple con compresión ZIP</li><li>Restauración coordinada con progreso en vivo</li><li>Soporte para SQL Server remoto</li></ul>',
        proj_st2bat_badge: 'Scripting · consola',
        proj_st2bat_title: 'ST2.bat — Mantenimiento Bejerman',
        proj_st2bat_p1: 'Consola interactiva para técnicos de campo: detecta la instalación desde el registro de Windows y centraliza tareas de diagnóstico y mantenimiento que antes se hacían a mano, una por una.',
        proj_st2bat_features: '<ul><li><strong>Planilla técnica:</strong> permisos NTFS, compatibilidad RUNASADMIN, reglas de firewall, locale es-AR y administradores ODBC</li><li><strong>Registro:</strong> DLLs, OCX, Crystal Reports, componentes AFIP y TLB del sistema</li><li><strong>Herramientas TEC:</strong> cierre de procesos Bejerman, DEP on/off, comparación UPDATES vs local, detección de archivos renombrados</li><li>Detección automática de ruta de instalación desde el registro</li></ul>',
        proj_planillas_badge: 'Origen de ST2 · Python',
        proj_planillas_title: 'Sistema de Planillas',
        proj_planillas_p1: 'Primera versión del generador de casos: formularios guiados que arman el texto del ticket con la estructura que pide cada tipo de gestión, listo para copiar al sistema de incidencias.',
        proj_planillas_features: '<ul><li>Plantillas por sistema (Bejerman SQL, ONVIO) y tipo de caso</li><li>Validaciones por mesa y circuito de soporte</li><li>Copia al portapapeles en un clic</li><li>Empaquetado como .exe con PyInstaller</li></ul>',
        proj_bej_badge: 'Thomson Reuters',
        proj_bej_title: 'Gestión SQL Bejerman',
        proj_bej_p1: 'Optimización de consultas y mantenimiento SQL Server para clientes enterprise Bejerman.',
        proj_9z_badge: '9z Globant',
        proj_9z_title: 'Infraestructura 9z Gaming',
        proj_9z_p1: 'Servidores dedicados de alta disponibilidad y monitoreo para gaming competitivo.',
        proj_game_badge: 'Canvas · arcade',
        proj_game_title: 'Referral Runner',
        proj_game_p1: 'Endless runner en Canvas con temática de mesa de ayuda: combos, power-ups y modo BUOL.',
        contact_label: 'Contacto',
        contact_title: '¿Hablamos?',
        contact_subtitle: 'Disponible para consultas técnicas, colaboraciones en herramientas de soporte u oportunidades en IT.',
        contact_name_label: 'Nombre',
        contact_email_label: 'Email',
        contact_message_label: 'Mensaje',
        contact_button: 'Enviar mensaje',
        contact_sending: 'Enviando…',
        contact_name_placeholder: 'Tu nombre',
        contact_email_placeholder: 'tu@email.com',
        contact_message_placeholder: '¿En qué puedo ayudarte?',
        cv_button: 'Descargar CV',
        footer_text: 'Tolei (Leonel Gallo) — Buenos Aires, Argentina'
    },
    en: {
        logo_sub: 'Leonel Gallo · IT Support',
        nav_about: 'About',
        nav_experience: 'Experience',
        nav_skills: 'Skills',
        nav_projects: 'Projects',
        nav_contact: 'Contact',
        hero_badge: 'Thomson Reuters · Bejerman · ST2',
        hero_name: 'Leonel Gallo',
        hero_alias: 'Tolei',
        hero_tagline: 'Technical support · SQL Server · automation',
        hero_subtitle: 'I keep Bejerman and SQL Server environments running in production. When something keeps repeating on the help desk, it goes into the <strong>ST2</strong> suite — started in Python, now in .NET. Buenos Aires.',
        hero_stat_years: 'Years in IT',
        hero_stat_projects: 'Projects',
        hero_stat_suite: 'Own suite',
        hero_cta_projects: 'View projects',
        hero_cta_cv: 'Download CV',
        about_label: 'Profile',
        about_title: 'About me',
        about_lead: 'Support engineer first, tool builder by necessity. I excel at understanding the user problem and shipping something that actually works.',
        about_p1: "I've spent years in technical support and infrastructure — keeping systems stable, resolving incidents clearly and leaving processes better than I found them.",
        about_p2: 'At <strong>Thomson Reuters</strong> I support companies and accounting firms on <strong>Bejerman systems</strong>: SQL Server, installations, queries and critical environments where every minute counts.',
        about_p3: 'Beyond daily work, I built the <strong>ST2</strong> suite — productivity tools for case documentation, technical knowledge lookup and Bejerman support automation. Started in Python; now <strong>C# / .NET</strong> with a web version.',
        highlight_title: 'From help desk to code',
        highlight_p: 'Every ST2 module solved a concrete support pain point: inconsistent case text, slow backups, repetitive install checks. Automating that is how I add value to the team.',
        value_stability: 'Stability',
        value_response: 'Fast response',
        value_tools: 'Useful tools',
        value_clarity: 'Clarity',
        value_teamwork: 'Teamwork',
        value_data: 'Data accuracy',
        value_stability_tip: 'Keeping SQL Server and Bejerman available.',
        value_response_tip: 'Closing incidents with clear timelines.',
        value_tools_tip: 'Turning repetitive problems into ST2 tools.',
        value_clarity_tip: 'Explaining tech in plain language.',
        value_teamwork_tip: 'Working with support, ops and business.',
        value_data_tip: 'Consistent data across systems and databases.',
        exp_label: 'Career',
        exp_title: 'Experience',
        exp_present: 'Present',
        exp_tr_title: 'Technical Support Analyst',
        exp_tr_b1: 'Support for companies and accounting firms using Bejerman systems.',
        exp_tr_b2: 'SQL Server administration, system installation and configuration.',
        exp_tr_b3: 'Productivity tool development (ST2 suite) for the support workflow.',
        exp_9z_title: 'DBA & IT Support',
        exp_9z_b1: 'SQL databases and servers for a high-performance gaming platform.',
        exp_9z_b2: 'Server management, VIP users and performance monitoring.',
        exp_9z_b3: 'Coordination with operations to keep the platform stable.',
        exp_gms_title: 'Data Entry Specialist',
        exp_gms_b1: 'Data entry and validation with high accuracy.',
        exp_gms_b2: 'Information control and consistency verification.',
        skills_label: 'Stack',
        skills_title: 'Technical skills',
        skills_data_title: 'Data & SQL',
        skills_dev_title: '.NET Development',
        skills_support_title: 'Support & Infra',
        skills_auto_title: 'Automation',
        projects_label: 'Portfolio',
        projects_title: 'Projects',
        projects_lead: 'Productivity tools I built to streamline technical support in Bejerman environments. Personal projects, not official Thomson Reuters products.',
        projects_disclaimer: 'ST2 tools are personal productivity initiatives created within my support role. They do not represent official Thomson Reuters products or positions.',
        filter_all: 'All',
        filter_st2: 'ST2 Suite',
        filter_python: 'Python',
        filter_exp: 'Experience',
        filter_creative: 'Creative',
        proj_st2_badge: 'Desktop · .NET',
        proj_st2_title: 'ST2 — Sistema de Planillas',
        proj_st2_p1: 'Desktop suite for support technicians: brings case documentation, knowledge search and day-to-day web resources into one place.',
        proj_st2_features: '<ul><li>Guided case sheets by workflow type (transfers, escalations, opportunities)</li><li>Live search across documentation, FAQs and manuals</li><li>Integrated access to support web resources</li><li>Automatic executable updates</li></ul>',
        proj_st2web_badge: 'Web · same suite',
        proj_st2web_title: 'ST2 WEB',
        proj_st2web_p1: 'The same ST2 suite in the browser. Shares the desktop logic via a REST API and static frontend — knowledge and case sheets without installing anything.',
        proj_st2web_features: '<ul><li>Same logic as the desktop app, no install required</li><li>REST API with credentials kept server-side only</li><li>Case sheet and knowledge search modules</li><li>Ready for internal network use</li></ul>',
        proj_sbbackup_badge: 'SQL Server',
        proj_sbbackup_title: 'ST2 — Backup & Restore',
        proj_sbbackup_p1: 'Tool to back up and restore SQL Server databases in the Bejerman ecosystem, with automatic environment detection and archive-ready packaging.',
        proj_sbbackup_features: '<ul><li>Server and database detection via ODBC registry</li><li>Multi-database backup with ZIP compression</li><li>Coordinated restore with live progress</li><li>Remote SQL Server support</li></ul>',
        proj_st2bat_badge: 'Scripting · console',
        proj_st2bat_title: 'ST2.bat — Bejerman Maintenance',
        proj_st2bat_p1: 'Interactive console for field technicians: detects the install from the Windows registry and centralises diagnostic and maintenance tasks that used to be done manually, one by one.',
        proj_st2bat_features: '<ul><li><strong>Technical checklist:</strong> NTFS permissions, RUNASADMIN compatibility, firewall rules, es-AR locale and ODBC admins</li><li><strong>Registration:</strong> DLLs, OCX, Crystal Reports, AFIP components and system TLBs</li><li><strong>Tech tools:</strong> kill Bejerman processes, DEP on/off, compare UPDATES vs local, detect renamed files</li><li>Automatic install path detection from registry</li></ul>',
        proj_planillas_badge: 'ST2 origin · Python',
        proj_planillas_title: 'Sistema de Planillas',
        proj_planillas_p1: 'First version of the case generator: guided forms that build ticket text with the structure each workflow requires, ready to paste into the incident system.',
        proj_planillas_features: '<ul><li>Templates by system (Bejerman SQL, ONVIO) and case type</li><li>Validations by desk and support circuit</li><li>One-click clipboard copy</li><li>Packaged as .exe with PyInstaller</li></ul>',
        proj_bej_badge: 'Thomson Reuters',
        proj_bej_title: 'Bejerman SQL Management',
        proj_bej_p1: 'Query optimization and SQL Server maintenance for Bejerman enterprise clients.',
        proj_9z_badge: '9z Globant',
        proj_9z_title: '9z Gaming Infrastructure',
        proj_9z_p1: 'High-availability dedicated servers and monitoring for competitive gaming.',
        proj_game_badge: 'Canvas · arcade',
        proj_game_title: 'Referral Runner',
        proj_game_p1: 'Canvas endless runner with help-desk theme: combos, power-ups and BUOL mode.',
        contact_label: 'Contact',
        contact_title: "Let's talk",
        contact_subtitle: 'Available for technical consulting, support tooling collaborations or IT opportunities.',
        contact_name_label: 'Name',
        contact_email_label: 'Email',
        contact_message_label: 'Message',
        contact_button: 'Send message',
        contact_sending: 'Sending…',
        contact_name_placeholder: 'Your name',
        contact_email_placeholder: 'you@email.com',
        contact_message_placeholder: 'How can I help?',
        cv_button: 'Download CV',
        footer_text: 'Tolei (Leonel Gallo) — Buenos Aires, Argentina'
    }
};

let currentLang = 'es';

function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;
    currentLang = lang;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const value = dict[el.getAttribute('data-i18n')];
        if (value) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const value = dict[el.getAttribute('data-i18n-placeholder')];
        if (value) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-tooltip-key]').forEach(el => {
        const value = dict[el.getAttribute('data-tooltip-key')];
        if (value) el.setAttribute('data-tooltip', value);
    });

    refreshIcons();
}

const langToggle = document.querySelector('.lang-toggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const next = currentLang === 'es' ? 'en' : 'es';
        langToggle.setAttribute('data-lang', next);
        applyTranslations(next);
    });
    applyTranslations('es');
}

/* ── Theme ── */
const themeToggle = document.querySelector('.theme-toggle');
const THEME_KEY = 'tolei-portfolio-theme';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
        themeToggle.setAttribute('data-theme', theme);
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
    }
    localStorage.setItem(THEME_KEY, theme);
}

if (themeToggle) {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(saved || (prefersLight ? 'light' : 'dark'));

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
        refreshIcons();
    });
}

/* ── Form ── */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        const btn = contactForm.querySelector('button[type="submit"]');
        const dict = translations[currentLang];
        btn.disabled = true;
        btn.textContent = dict?.contact_sending || 'Enviando…';
    });
}
