(function () {
    function revealOnScroll() {
        const animatedElements = document.querySelectorAll('.reveal-on-scroll');
        if (!animatedElements.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        animatedElements.forEach((element, index) => {
            element.style.setProperty('--reveal-delay', `${index * 70}ms`);
            observer.observe(element);
        });
    }

    function tiltCards() {
        const cards = document.querySelectorAll('.tilt-card');
        cards.forEach((card) => {
            card.addEventListener('mousemove', (event) => {
                const rect = card.getBoundingClientRect();
                const px = (event.clientX - rect.left) / rect.width;
                const py = (event.clientY - rect.top) / rect.height;
                const rotateY = (px - 0.5) * 10;
                const rotateX = (0.5 - py) * 8;

                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    function animateCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach((counter) => {
            const target = Number(counter.getAttribute('data-counter')) || 0;
            const duration = 1200;
            const start = performance.now();

            function frame(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = String(Math.round(target * eased));

                if (progress < 1) {
                    requestAnimationFrame(frame);
                }
            }

            requestAnimationFrame(frame);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        revealOnScroll();
        tiltCards();
        animateCounters();
    });
})();
