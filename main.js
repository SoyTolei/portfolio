document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initNavSpy();
    initWorkHoverPreviews();
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

function initWorkHoverPreviews() {
    document.querySelectorAll('.work-thumb--hover').forEach(thumb => {
        const img = thumb.querySelector('.work-thumb__preview img[data-src]');
        if (!img) return;

        const loadPreview = () => {
            if (img.dataset.loaded) return;
            img.dataset.loaded = 'true';

            const markReady = () => thumb.classList.add('work-thumb--ready');
            img.addEventListener('load', markReady, { once: true });
            img.addEventListener('error', markReady, { once: true });
            img.src = img.dataset.src;

            if (img.complete && img.naturalWidth > 0) markReady();
        };

        thumb.addEventListener('mouseenter', loadPreview);
        thumb.addEventListener('focusin', loadPreview);
    });
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
        hero_subtitle: 'Soporte técnico en Thomson Reuters — Bejerman, SQL Server y herramientas propias que desarrollé para el día a día de la mesa.',
        term_cmd1: 'whoami',
        term_out1: 'leonel.gallo · soporte técnico · buenos aires, ar 🇦🇷',
        term_cmd2: 'stack --brief',
        term_out2: 'sql-server · t-sql · csharp · dotnet · python · batch',
        term_cmd3: 'st2 status',
        term_out3: '4 módulos activos · exe + web + backup + consola',
        hero_cta_projects: 'Ver proyectos',
        hero_cta_cv: 'CV',
        chip_sql: 'SQL Server',
        chip_dotnet: '.NET',
        chip_csharp: 'C#',
        chip_batch: 'Batch',
        chip_tsql: 'T-SQL',
        chip_python: 'Python',
        about_eyebrow: '// perfil',
        about_title: 'Sobre mí',
        about_p1: 'Me interesa resolver de raíz: dejar el sistema estable, el caso bien documentado y que quien lo retome no tenga que reconstruir todo desde cero.',
        about_p2: 'En <strong>Thomson Reuters</strong> doy soporte técnico de <strong>Bejerman</strong> a empresas y estudios contables — instalaciones, SQL Server, consultas y entornos donde un error en cierre de mes no es negociable.',
        about_p3: 'Para la mesa de ayuda armé <strong>ST2</strong> — <strong>S</strong>oluciones <strong>T</strong>ecnológicas: herramientas propias para que el agente trabaje más cómodo y consistente. Empezó con un .bat de mantenimiento; hoy suma exe, backup de bases y versión web en <strong>C# / .NET</strong>.',
        st2_disclaimer: 'Las herramientas ST2 no representan productos ni posiciones oficiales de Thomson Reuters.',
        note_label: '// por qué ST2',
        note_body: 'Cada módulo cerró algo repetitivo en soporte: chequeos de instalación a mano, backups lentos, textos de ticket distintos según quién atendía. Primero la consola .bat, después el exe, el backup y la web.',
        exp_eyebrow: '// carrera',
        exp_title: 'Trayectoria',
        exp_present: 'hoy',
        exp_tr_title: 'Analista de Soporte Técnico',
        exp_tr_b1: 'Soporte Bejerman a empresas y estudios contables.',
        exp_tr_b2: 'SQL Server, instalación y configuración de sistemas.',
        exp_tr_b3: 'Desarrollo de la suite ST2 (Soluciones Tecnológicas) para el flujo diario de soporte.',
        exp_9z_title: 'DBA & IT Support',
        exp_9z_b1: 'SQL y servidores para plataforma de gaming competitivo.',
        exp_9z_b2: 'Usuarios VIP, monitoreo y disponibilidad.',
        exp_9z_b3: 'Coordinación con operaciones en entornos de alta carga — de ahí viene el alias Tolei.',
        exp_gms_title: 'Data Entry Specialist',
        exp_gms_b1: 'Ingreso y validación de datos con alta precisión.',
        exp_gms_b2: 'Control de consistencia en bases operativas.',
        exp_brinks_dates: 'abr 2019 — ene 2020',
        exp_brinks_title: 'Data Entry',
        exp_brinks_b1: 'Carga y control de documentación operativa.',
        exp_brinks_b2: 'Validación de registros y conciliación de información.',
        projects_eyebrow: '// builds',
        projects_title: 'Proyectos',
        projects_lead: 'Herramientas que uso en soporte. La suite <strong>ST2</strong> nació en la mesa de ayuda de TR para hacer el día a día más práctico para el agente.',
        projects_disclaimer: 'Las herramientas ST2 no representan productos ni posiciones oficiales de Thomson Reuters.',
        group_st2: 'Suite ST2',
        link_live: 'st2.tolei.dev ↗',
        link_play: 'jugar ↗',
        proj_st2web_title: 'ST2 WEB',
        proj_st2web_p1: 'La suite en el navegador — último paso de la evolución. Misma lógica que el exe, API en servidor. Planillas y buscador sin instalar nada.',
        proj_st2_title: 'ST2.exe',
        proj_st2_badge: 'Ejecutable · .NET',
        proj_st2_p1: 'Ejecutable desktop de la suite, usado en producción hasta la migración web. Documentación de casos, base de conocimiento y recursos técnicos en un solo ejecutable.',
        proj_sbbackup_title: 'ST2 — Backup y Restauración',
        proj_sbbackup_p1: 'Backup y restore de bases Bejerman con detección de entorno y empaquetado listo para archivar o migrar.',
        proj_st2bat_title: 'ST2.bat — Mantenimiento Bejerman',
        proj_st2bat_p1: 'El primer módulo de la suite: consola de campo que detecta instalación por registro y centraliza diagnósticos que antes eran 15 pasos manuales.',
        proj_game_title: 'Referral Runner',
        proj_game_badge: 'Personal',
        proj_game_p1: 'Juego de plataforma en el navegador: corrés, esquivás obstáculos y sumás puntos. Hecho con JavaScript y Canvas 2D.',
        contact_eyebrow: '// ping',
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
        hero_subtitle: 'Technical support at Thomson Reuters — Bejerman, SQL Server and personal tools I built for daily desk work.',
        term_cmd1: 'whoami',
        term_out1: 'leonel.gallo · technical support · buenos aires, ar 🇦🇷',
        term_cmd2: 'stack --brief',
        term_out2: 'sql-server · t-sql · csharp · dotnet · python · batch',
        term_cmd3: 'st2 status',
        term_out3: '4 active modules · exe + web + backup + console',
        hero_cta_projects: 'View projects',
        hero_cta_cv: 'CV',
        chip_sql: 'SQL Server',
        chip_dotnet: '.NET',
        chip_csharp: 'C#',
        chip_batch: 'Batch',
        chip_tsql: 'T-SQL',
        chip_python: 'Python',
        about_eyebrow: '// profile',
        about_title: 'About me',
        about_p1: 'I focus on fixing things properly: stable systems, well-documented cases, and no one having to rebuild context from scratch.',
        about_p2: 'At <strong>Thomson Reuters</strong> I provide technical support for <strong>Bejerman</strong> to companies and accounting firms — installs, SQL Server, queries and environments where month-end errors are not an option.',
        about_p3: 'For the help desk I built <strong>ST2</strong> — <strong>T</strong>echnical <strong>S</strong>olutions: personal tools so agents can work more comfortably and consistently. Started with a maintenance .bat; today includes a desktop app, database backup and web version in <strong>C# / .NET</strong>.',
        st2_disclaimer: 'ST2 tools do not represent official Thomson Reuters products or positions.',
        note_label: '// why ST2',
        note_body: 'Each module closed something repetitive in support: manual install checks, slow backups, ticket text that varied by technician. First the .bat console, then the exe, backup and web.',
        exp_eyebrow: '// career',
        exp_title: 'Career',
        exp_present: 'now',
        exp_tr_title: 'Technical Support Analyst',
        exp_tr_b1: 'Bejerman support for companies and accounting firms.',
        exp_tr_b2: 'SQL Server, system installation and configuration.',
        exp_tr_b3: 'ST2 suite development (Technical Solutions) for daily support workflow.',
        exp_9z_title: 'DBA & IT Support',
        exp_9z_b1: 'SQL and servers for a competitive gaming platform.',
        exp_9z_b2: 'VIP users, monitoring and availability.',
        exp_9z_b3: 'Coordination with ops in high-load environments — where the Tolei alias comes from.',
        exp_gms_title: 'Data Entry Specialist',
        exp_gms_b1: 'Data entry and validation with high accuracy.',
        exp_gms_b2: 'Consistency control in operational databases.',
        exp_brinks_dates: 'Apr 2019 — Jan 2020',
        exp_brinks_title: 'Data Entry',
        exp_brinks_b1: 'Loading and control of operational documentation.',
        exp_brinks_b2: 'Record validation and information reconciliation.',
        projects_eyebrow: '// builds',
        projects_title: 'Projects',
        projects_lead: 'Tools I use in support. The <strong>ST2</strong> suite was born on the TR help desk to make daily work more practical for agents.',
        projects_disclaimer: 'ST2 tools do not represent official Thomson Reuters products or positions.',
        group_st2: 'ST2 Suite',
        link_live: 'st2.tolei.dev ↗',
        link_play: 'play ↗',
        proj_st2web_title: 'ST2 WEB',
        proj_st2web_p1: 'The suite in the browser — the latest step. Same logic as the desktop app, server API. Case sheets and search without installing anything.',
        proj_st2_title: 'ST2.exe',
        proj_st2_badge: 'Executable · .NET',
        proj_st2_p1: 'Desktop executable of the suite, used in production until the web migration. Case documentation, knowledge base and technical resources in one place.',
        proj_sbbackup_title: 'ST2 — Backup & Restore',
        proj_sbbackup_p1: 'Backup and restore Bejerman databases with environment detection and archive-ready packaging.',
        proj_st2bat_title: 'ST2.bat — Bejerman Maintenance',
        proj_st2bat_p1: 'The first suite module: field console that detects install via registry and centralises diagnostics that used to be 15 manual steps.',
        proj_game_title: 'Referral Runner',
        proj_game_badge: 'Personal',
        proj_game_p1: 'Browser platformer: run, dodge obstacles and score points. Built with JavaScript and Canvas 2D.',
        contact_eyebrow: '// ping',
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
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#0e0e0c' : '#f6f5f2');
    if (themeToggle) {
        themeToggle.setAttribute('data-theme', theme);
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
    }
    localStorage.setItem(THEME_KEY, theme);
}

if (themeToggle) {
    const saved = localStorage.getItem(THEME_KEY);
    applyTheme(saved || 'light');

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}
