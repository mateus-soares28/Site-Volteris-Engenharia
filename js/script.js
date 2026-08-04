(() => {
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('[data-loader-progress]');
    const minDisplayTime = 1500;
    const startedAt = Date.now();

    if (!preloader || !progress) {
        return;
    }

    let currentProgress = 0;
    let loaderFinished = false;
    const progressInterval = window.setInterval(() => {
        currentProgress = Math.min(currentProgress + Math.random() * 18, 92);
        progress.style.width = `${currentProgress}%`;
    }, 260);

    const finishLoader = () => {
        if (loaderFinished) {
            return;
        }

        loaderFinished = true;
        window.clearInterval(progressInterval);
        progress.style.width = '100%';

        const elapsedTime = Date.now() - startedAt;
        const remainingTime = Math.max(minDisplayTime - elapsedTime, 0);

        window.setTimeout(() => {
            preloader.classList.add('is-hidden');
            document.body.classList.remove('is-loading');
        }, remainingTime + 450);
    };

    window.addEventListener('load', finishLoader, { once: true });
    window.setTimeout(finishLoader, 4500);
})();

document.addEventListener('DOMContentLoaded', () => {
    // Lógica do Dropdown de Serviços
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Toggle ao clicar (melhor para UX mobile e acessibilidade)
    if (dropdown && dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');

            // Gira a setinha
            const icon = dropdownToggle.querySelector('i');
            if (icon) {
                icon.style.transform = dropdownMenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        // Fecha o dropdown ao clicar fora dele
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.classList.remove('active');
                const icon = dropdownToggle.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    initAnchorNavigation();
    initGsapScrollAnimations();
});

function initAnchorNavigation() {
    const header = document.querySelector('.navbar');
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 24;

            window.scrollTo({
                top: Math.max(targetPosition, 0),
                behavior: 'smooth'
            });

            if (window.history && window.history.pushState) {
                window.history.pushState(null, '', href);
            }
        });
    });
}

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

function initGsapScrollAnimations() {
    const fadeElements = Array.from(document.querySelectorAll('.fade-in'));
    const cardElements = Array.from(document.querySelectorAll([
        '.service-card',
        '.process-card',
        '.cta-card',
        '.contact-card-wrapper',
        '.stat-item'
    ].join(', ')));
    const splitTextElements = Array.from(document.querySelectorAll([
        '.hero h1',
        '.services-header h2',
        '.about-content h2',
        '.process-header h2',
        '.testimonials-header h2',
        '.cta-card h2',
        '.contact-info h2'
    ].join(', ')));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion) {
        fadeElements.forEach((element) => element.classList.add('visible'));
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const smoothWrapper = document.querySelector('#smooth-wrapper');
    const smoothContent = document.querySelector('#smooth-content');

    if (window.ScrollSmoother && smoothWrapper && smoothContent) {
        gsap.registerPlugin(ScrollSmoother);
        ScrollSmoother.create({
            wrapper: smoothWrapper,
            content: smoothContent,
            smooth: 1.15,
            smoothTouch: 0.12,
            effects: true,
            normalizeScroll: true
        });
        document.documentElement.classList.add('has-scroll-smoother');
    }

    gsap.set(fadeElements, {
        autoAlpha: 0,
        y: 34
    });

    gsap.set(cardElements, {
        autoAlpha: 0
    });

    fadeElements.forEach((element) => {
        gsap.to(element, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 82%',
                end: 'bottom 58%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    cardElements.forEach((card, index) => {
        gsap.to(card, {
            autoAlpha: 1,
            duration: 0.75,
            ease: 'power2.out',
            delay: (index % 6) * 0.04,
            scrollTrigger: {
                trigger: card,
                start: 'top 86%',
                end: 'bottom 62%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    if (window.SplitText) {
        gsap.registerPlugin(SplitText);

        const splitTargets = splitTextElements.filter((element) => element.textContent.trim().length);
        splitTargets.forEach((element) => element.classList.add('split-reveal'));

        const createSplitAnimations = () => {
            splitTargets.forEach((element) => {
                SplitText.create(element, {
                    type: 'lines,words',
                    linesClass: 'split-line',
                    wordsClass: 'split-word',
                    mask: 'lines',
                    autoSplit: true,
                    onSplit(self) {
                        gsap.set(self.words, {
                            autoAlpha: 0,
                            yPercent: 105
                        });

                        return gsap.to(self.words, {
                            autoAlpha: 1,
                            yPercent: 0,
                            duration: 0.72,
                            ease: 'power3.out',
                            stagger: {
                                each: 0.025,
                                from: 'start'
                            },
                            scrollTrigger: {
                                trigger: element,
                                start: 'top 84%',
                                end: 'bottom 62%',
                                toggleActions: 'play none none reverse'
                            }
                        });
                    }
                });
            });
        };

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(createSplitAnimations);
        } else {
            createSplitAnimations();
        }
    }

    window.addEventListener('load', () => ScrollTrigger.refresh());
}
