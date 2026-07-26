document.addEventListener('DOMContentLoaded', () => {
    // Lógica do Dropdown de Serviços
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Toggle ao clicar (melhor para UX mobile e acessibilidade)
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle('active');
        
        // Gira a setinha
        const icon = dropdownToggle.querySelector('i');
        if (dropdownMenu.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
        icon.style.transition = 'transform 0.3s ease';
    });

    // Fecha o dropdown ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdownMenu.classList.remove('active');
            dropdownToggle.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });

    // Animação simples de Fade-in on Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos com a classe fade-in
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15, // Aciona quando 15% do elemento estiver visível na tela
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para de observar depois que já apareceu
            }
        });
    }, appearOptions);

    fadeElements.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((serviceCard) => {
    let luz = serviceCard.querySelector(".luz");

    if (!luz) {
        luz = document.createElement("div");
        luz.classList.add("luz");
        serviceCard.appendChild(luz);
    }

    serviceCard.addEventListener("mousemove", (e) => {
        const serviceRect = serviceCard.getBoundingClientRect();

        const mouseX = e.clientX - serviceRect.left;
        const mouseY = e.clientY - serviceRect.top;

        luz.style.opacity = 1;
        luz.style.transform = `translate(${mouseX - 130}px, ${mouseY - 130}px)`;
    });

    serviceCard.addEventListener("mouseleave", () => {
        luz.style.opacity = 0;
    });
});
