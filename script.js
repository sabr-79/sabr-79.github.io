lucide.createIcons();

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    lucide.createIcons();
});

const navLinks = document.querySelectorAll('.nav-link[data-section]');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const sectionId = link.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

const sections = document.querySelectorAll('.content-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-100px 0px -50% 0px' });

sections.forEach(section => observer.observe(section));

document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        const map = { '1': 'biography', '2': 'education', '3': 'experience', '4': 'projects', '5': 'news', '6': 'awards' };
        const id = map[e.key];
        if (id) {
            const section = document.getElementById(id);
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

navLinks.forEach((link, i) => {
    link.title = `Alt+${i+1}`;
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    setTimeout(() => document.body.style.opacity = '1', 100);
});

