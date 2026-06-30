document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initNavSpy();
});

/* ── Nav ── */
function initNav() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav-toggle');
    const end = document.querySelector('.header-end');

    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 24);
    });

    if (toggle && end) {
        toggle.addEventListener('click', () => {
            const open = end.classList.toggle('open');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        end.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                end.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (!id || id === '#') return;
            e.preventDefault();
            const target = document.querySelector(id);
            if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
        });
    });
}

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
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s));
}

/* ── i18n ── */
const translations = {
    es: {
        logo_sub: 'leonel gallo',
        nav_about: 'Sobre mí',
        nav_experience: 'Trayectoria',
        nav_projects: 'Proyectos',
        nav_contact: 'Contacto',
        hero_badge: 'Thomson Reuters · Bejerman · ST2',
        hero_name: 'Leonel Gallo',
        hero_alias: 'Tolei',
        hero_subtitle: 'Soporte Bejerman en producción. Si un caso se repite más de dos veces en la mesa, probablemente ya tenga un script o una pantalla en <strong>ST2</strong>.',
        term_cmd1: 'whoami',
        term_out1: 'leonel.gallo · soporte técnico · buenos aires',
        term_cmd2: 'stack --brief',
        term_out2: 'sql-server · t-sql · csharp · dotnet · python · powershell',
        term_cmd3: 'st2 status',
        term_out3: '4 módulos activos · exe + web + backup + consola',
        hero_cta_projects: 'Ver proyectos',
        hero_cta_cv: 'CV',
        chip_sql: 'SQL Server',
        chip_dotnet: '.NET',
        chip_python: 'Python',
        chip_csharp: 'C#',
        chip_ps: 'PowerShell',
        about_title: 'Sobre mí',
        about_lead: 'No empecé programando por hobby: empecé porque en soporte el mismo problema aparecía el lunes, el martes y el viernes.',
        about_p1: 'Varios años en soporte e infraestructura. Me interesa que el sistema quede estable, que el caso cierre con contexto claro y que el próximo técnico no tenga que adivinar qué pasó.',
        about_p2: 'En <strong>Thomson Reuters</strong> atiendo empresas y estudios contables con <strong>Bejerman</strong>: SQL Server, instalaciones, consultas y entornos donde un error a las 16:45 del mes contable no es opción.',
        about_p3: 'La suite <strong>ST2</strong> nació ahí — planillas de casos, backup de bases, consola de mantenimiento, versión web. Python al principio; hoy <strong>C# / .NET</strong>. Herramientas propias, no productos oficiales de TR.',
        note_label: '// de la mesa al repo',
        note_body: 'Cada módulo ST2 cerró un dolor concreto: textos de ticket inconsistentes, backups lentos, chequeos de instalación que se hacían a mano. Automatizar eso es cómo sumo valor sin salir del rol de soporte.',
        exp_title: 'Trayectoria',
        exp_present: 'hoy',
        exp_tr_title: 'Analista de Soporte Técnico',
        exp_tr_b1: 'Soporte Bejerman a empresas y estudios contables.',
        exp_tr_b2: 'SQL Server, instalación y configuración de sistemas.',
        exp_tr_b3: 'Desarrollo de la suite ST2 para el flujo diario de soporte.',
        exp_9z_title: 'DBA & IT Support',
        exp_9z_b1: 'SQL y servidores para plataforma de gaming competitivo.',
        exp_9z_b2: 'Usuarios VIP, monitoreo y disponibilidad.',
        exp_9z_b3: 'Coordinación con operaciones en entornos de alta carga.',
        exp_gms_title: 'Data Entry Specialist',
        exp_gms_b1: 'Ingreso y validación de datos con alta precisión.',
        exp_gms_b2: 'Control de consistencia en bases operativas.',
        projects_title: 'Proyectos',
        projects_lead: 'Herramientas que uso o usé en soporte. La mayoría son ST2 — iniciativas personales de productividad.',
        projects_disclaimer: 'Las herramientas ST2 no representan productos ni posiciones oficiales de Thomson Reuters.',
        group_st2: 'Suite ST2',
        group_other: 'Experiencia aplicada',
        group_side: 'Side project',
        link_live: 'st2.tolei.dev ↗',
        link_play: 'jugar ↗',
        proj_st2web_title: 'ST2 WEB',
        proj_st2web_p1: 'La suite en el navegador: misma lógica que el exe, API en servidor, frontend estático. Planillas y buscador sin instalar nada.',
        proj_st2_title: 'ST2.exe',
        proj_st2_badge: 'Ejecutable · .NET',
        proj_st2_p1: 'Ejecutable principal del soporte: documentación de casos, conocimiento técnico y recursos web en un solo lugar.',
        proj_sbbackup_title: 'ST2 — Backup y Restauración',
        proj_sbbackup_p1: 'Backup y restore de bases Bejerman con detección de entorno y empaquetado listo para archivar o migrar.',
        proj_st2bat_title: 'ST2.bat — Mantenimiento Bejerman',
        proj_st2bat_p1: 'Consola de campo: detecta instalación por registro y centraliza diagnósticos que antes eran 15 pasos manuales.',
        proj_bej_title: 'Gestión SQL Bejerman',
        proj_bej_p1: 'Optimización de consultas y mantenimiento SQL Server en clientes enterprise.',
        proj_9z_title: 'Infraestructura 9z Gaming',
        proj_9z_p1: 'Servidores dedicados y monitoreo para gaming competitivo — de ahí vino el alias Tolei.',
        proj_game_title: 'Referral Runner',
        proj_game_p1: 'Endless runner en Canvas con temática de mesa de ayuda — combos, power-ups y modo BUOL.',
        contact_title: 'Contacto',
        contact_subtitle: 'Consultas técnicas, colaboraciones en herramientas de soporte u oportunidades en IT.',
        cv_button: 'Descargar CV',
        footer_text: 'Tolei · Leonel Gallo · Buenos Aires'
    },
    en: {
        logo_sub: 'leonel gallo',
        nav_about: 'About',
        nav_experience: 'Career',
        nav_projects: 'Projects',
        nav_contact: 'Contact',
        hero_badge: 'Thomson Reuters · Bejerman · ST2',
        hero_name: 'Leonel Gallo',
        hero_alias: 'Tolei',
        hero_subtitle: 'Bejerman support in production. If a case repeats more than twice on the desk, it probably already has a script or screen in <strong>ST2</strong>.',
        term_cmd1: 'whoami',
        term_out1: 'leonel.gallo · technical support · buenos aires',
        term_cmd2: 'stack --brief',
        term_out2: 'sql-server · t-sql · csharp · dotnet · python · powershell',
        term_cmd3: 'st2 status',
        term_out3: '4 active modules · exe + web + backup + console',
        hero_cta_projects: 'View projects',
        hero_cta_cv: 'CV',
        chip_sql: 'SQL Server',
        chip_dotnet: '.NET',
        chip_python: 'Python',
        chip_csharp: 'C#',
        chip_ps: 'PowerShell',
        about_title: 'About me',
        about_lead: "I didn't start coding as a hobby — I started because the same problem showed up Monday, Tuesday and Friday on the help desk.",
        about_p1: 'Several years in support and infrastructure. I care about stable systems, cases closed with clear context, and the next technician not having to guess what happened.',
        about_p2: 'At <strong>Thomson Reuters</strong> I support companies and accounting firms on <strong>Bejerman</strong>: SQL Server, installs, queries and environments where an error at 4:45 PM on month-end is not an option.',
        about_p3: 'The <strong>ST2</strong> suite grew from there — case sheets, database backup, maintenance console, web version. Python first; now <strong>C# / .NET</strong>. Personal tools, not official TR products.',
        note_label: '// from desk to repo',
        note_body: 'Every ST2 module closed a concrete pain: inconsistent ticket text, slow backups, install checks done by hand. Automating that is how I add value without leaving the support role.',
        exp_title: 'Career',
        exp_present: 'now',
        exp_tr_title: 'Technical Support Analyst',
        exp_tr_b1: 'Bejerman support for companies and accounting firms.',
        exp_tr_b2: 'SQL Server, system installation and configuration.',
        exp_tr_b3: 'ST2 suite development for daily support workflow.',
        exp_9z_title: 'DBA & IT Support',
        exp_9z_b1: 'SQL and servers for a competitive gaming platform.',
        exp_9z_b2: 'VIP users, monitoring and availability.',
        exp_9z_b3: 'Coordination with ops in high-load environments.',
        exp_gms_title: 'Data Entry Specialist',
        exp_gms_b1: 'Data entry and validation with high accuracy.',
        exp_gms_b2: 'Consistency control in operational databases.',
        projects_title: 'Projects',
        projects_lead: 'Tools I use or used in support. Most are ST2 — personal productivity initiatives.',
        projects_disclaimer: 'ST2 tools do not represent official Thomson Reuters products or positions.',
        group_st2: 'ST2 Suite',
        group_other: 'Applied experience',
        group_side: 'Side project',
        link_live: 'st2.tolei.dev ↗',
        link_play: 'play ↗',
        proj_st2web_title: 'ST2 WEB',
        proj_st2web_p1: 'The suite in the browser: same logic as the desktop app, server API, static frontend. Case sheets and search without installing anything.',
        proj_st2_title: 'ST2.exe',
        proj_st2_badge: 'Executable · .NET',
        proj_st2_p1: 'Main support executable: case documentation, technical knowledge and web resources in one place.',
        proj_sbbackup_title: 'ST2 — Backup & Restore',
        proj_sbbackup_p1: 'Backup and restore Bejerman databases with environment detection and archive-ready packaging.',
        proj_st2bat_title: 'ST2.bat — Bejerman Maintenance',
        proj_st2bat_p1: 'Field console: detects install via registry and centralises diagnostics that used to be 15 manual steps.',
        proj_bej_title: 'Bejerman SQL Management',
        proj_bej_p1: 'Query optimisation and SQL Server maintenance for enterprise clients.',
        proj_9z_title: '9z Gaming Infrastructure',
        proj_9z_p1: 'Dedicated servers and monitoring for competitive gaming — where the Tolei alias comes from.',
        proj_game_title: 'Referral Runner',
        proj_game_p1: 'Canvas endless runner with help-desk theme — combos, power-ups and BUOL mode.',
        contact_title: 'Contact',
        contact_subtitle: 'Technical consulting, support tooling collaborations or IT opportunities.',
        cv_button: 'Download CV',
        footer_text: 'Tolei · Leonel Gallo · Buenos Aires'
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
    });
}
