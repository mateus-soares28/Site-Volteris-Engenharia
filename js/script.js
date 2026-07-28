(() => {
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('[data-loader-progress]');
    const minDisplayTime = 1500;
    const startedAt = Date.now();

    if (!preloader || !progress) {
        return;
    }

    let currentProgress = 0;
    const progressInterval = window.setInterval(() => {
        currentProgress = Math.min(currentProgress + Math.random() * 18, 92);
        progress.style.width = `${currentProgress}%`;
    }, 260);

    window.addEventListener('load', () => {
        window.clearInterval(progressInterval);
        progress.style.width = '100%';

        const elapsedTime = Date.now() - startedAt;
        const remainingTime = Math.max(minDisplayTime - elapsedTime, 0);

        window.setTimeout(() => {
            preloader.classList.add('is-hidden');
            document.body.classList.remove('is-loading');
        }, remainingTime + 450);
    });
})();

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

document.addEventListener('DOMContentLoaded', () => {
    const stack = document.querySelector('[data-testimonials-stack]');
    const shuffleButton = document.querySelector('[data-testimonial-shuffle]');

    if (stack) {
        const cards = Array.from(stack.querySelectorAll('.testimonial-card'));
        const positions = ['front', 'middle', 'back'];
        let order = positions.slice();
        let dragStartX = 0;
        let activeCard = null;

        const applyPositions = () => {
            cards.forEach((card, index) => {
                card.dataset.position = order[index];
                card.style.transform = '';
            });
        };

        const shuffleTestimonials = () => {
            order.unshift(order.pop());
            applyPositions();
        };

        cards.forEach((card) => {
            card.addEventListener('pointerdown', (event) => {
                if (card.dataset.position !== 'front') {
                    return;
                }

                activeCard = card;
                dragStartX = event.clientX;
                card.classList.add('is-dragging');
                card.setPointerCapture(event.pointerId);
            });

            card.addEventListener('pointermove', (event) => {
                if (activeCard !== card) {
                    return;
                }

                const dragDistance = event.clientX - dragStartX;
                card.style.transform = `translateX(${dragDistance}px) rotate(-6deg)`;
            });

            const finishDrag = (event) => {
                if (activeCard !== card) {
                    return;
                }

                const dragDistance = event.clientX - dragStartX;
                card.classList.remove('is-dragging');
                activeCard = null;
                dragStartX = 0;

                if (dragDistance < -150) {
                    shuffleTestimonials();
                    return;
                }

                card.style.transform = '';
            };

            card.addEventListener('pointerup', finishDrag);
            card.addEventListener('pointercancel', finishDrag);
        });

        if (shuffleButton) {
            shuffleButton.addEventListener('click', shuffleTestimonials);
        }

        applyPositions();
    }

    const contactForm = document.querySelector('#contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const formData = new FormData(contactForm);
            const nome = formData.get('nome');
            const empresa = formData.get('empresa');
            const telefone = formData.get('telefone');
            const email = formData.get('email');
            const mensagem = formData.get('mensagem');

            const whatsappMessage = [
                'Olá! Gostaria de solicitar um atendimento técnico.',
                '',
                `Nome: ${nome}`,
                `Empresa: ${empresa}`,
                `Telefone: ${telefone}`,
                `E-mail: ${email}`,
                mensagem ? `Projeto: ${mensagem}` : ''
            ].filter(Boolean).join('\n');

            const whatsappUrl = `https://wa.me/5547988958961?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank', 'noopener');
        });
    }
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
