document.addEventListener("DOMContentLoaded", function () {
    // 1. Funcionalidade do Menu Hambúrguer
    // Usamos os IDs que você já tem no seu HTML
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav'); // Este é o seu <nav class="session" id="main-nav">

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav-active'); // Adiciona/remove a classe para mostrar/esconder o menu
        hamburger.classList.toggle('toggle'); // Adiciona/remove a classe para animar o ícone do hambúrguer
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('#main-nav a').forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });

    // 2. Script para o efeito de digitação
    const typingTextElement = document.getElementById('typing-text');
    const cursorElement = document.querySelector('.hero-subtitle .cursor');
    const textToType = "Desenvolvedora";
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150; // Velocidade de digitação (ms por caractere)
    const deletingSpeed = 200; // Velocidade de apagar (ms por caractere)
    const pauseTime = 8000; // Tempo de pausa após digitar ou apagar (1 segundo)
    const cycleDelay = 5000; // Tempo total do ciclo (10 segundos)

    function typeWriter() {
        const currentText = textToType.substring(0, charIndex);
        typingTextElement.textContent = currentText;

        if (!isDeleting && charIndex < textToType.length) {
            // Digitando
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            // Apagando
            charIndex--;
            setTimeout(typeWriter, deletingSpeed);
        } else if (!isDeleting && charIndex === textToType.length) {
            // Pausa após digitar
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            // Pausa após apagar, e reinicia o ciclo após o cycleDelay
            isDeleting = false;
            setTimeout(typeWriter, cycleDelay - (textToType.length * typingSpeed) - (textToType.length *
                deletingSpeed) - (2 * pauseTime));
        }
    }

    // Inicia o efeito de digitação
    typeWriter();

    // Animação do cursor
    setInterval(() => {
        cursorElement.style.opacity = (cursorElement.style.opacity === '0' ? '1' : '0');
    }, 500); // Pisca a cada 500ms

    // 3. JavaScript para as SKILLS (interação de clique)
    const skillCards = document.querySelectorAll('.my-skills-section .skill-card');

    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const skillName = this.querySelector('h3').textContent;
            console.log(`Você clicou na skill: ${skillName}!`);

            // Adicionar uma classe temporária para um efeito visual de clique (opcional)
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300); // Remove a classe após 300ms
        });
    });
});