document.addEventListener("DOMContentLoaded", function () {
    // 1. Funcionalidade do Menu Hambúrguer (NÃO PRECISA DE ALTERAÇÃO)
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    document.querySelectorAll('#main-nav a').forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });

    // 2. Script para o efeito de digitação (NÃO PRECISA DE ALTERAÇÃO)
    const typingTextElement = document.getElementById('typing-text');
    const cursorElement = document.querySelector('.hero-subtitle .cursor');
    const textToType = "Developer";
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 200;
    const pauseTime = 8000;
    const cycleDelay = 5000;

    function typeWriter() {
        const currentText = textToType.substring(0, charIndex);
        typingTextElement.textContent = currentText;

        if (!isDeleting && charIndex < textToType.length) {
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeWriter, deletingSpeed);
        } else if (!isDeleting && charIndex === textToType.length) {
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            setTimeout(typeWriter, cycleDelay - (textToType.length * typingSpeed) - (textToType.length *
                deletingSpeed) - (2 * pauseTime));
        }
    }

    typeWriter();

    setInterval(() => {
        cursorElement.style.opacity = (cursorElement.style.opacity === '0' ? '1' : '0');
    }, 500);

    // 3. JavaScript para carregar as SKILLS dinamicamente
    const skillsData = {
        "Languages": ["JavaScript", "Python", "Java", "C#", "HTML", "CSS"],
        "Frameworks/Libraries": ["React", "Next.js", "Node.js", ".NET", "Tailwind CSS", "Bootstrap", "jQuery"],
        "Databases": ["PostgreSQL", "Entity Framework", "SQL Server"],
        "Microservices/DevOps": ["Grafana", "Git", "GitHub Actions", "Docker", "Kubernetes", "AWS"]
    };

    const skillsContentDiv = document.getElementById('skills-content'); // Verifique seu HTML para este ID!

    // Cria a grid para os grupos de skills. Se esta div já existe no HTML, apenas selecione-a.
    // Se o JS é quem cria ela, como está no seu código, mantenha assim.
    const skillsGroupGrid = document.createElement('div');
    skillsGroupGrid.classList.add('skills-group-grid'); // Esta classe já existe no CSS

    // Loop através de cada categoria de skill para criar os grupos (título + tags)
    for (const category in skillsData) {
        if (skillsData.hasOwnProperty(category)) {
            // AQUI ESTÁ A ALTERAÇÃO: MUDANÇA DE 'skill-group-card' PARA 'skill-category'
            const skillCategoryDiv = document.createElement('div');
            skillCategoryDiv.classList.add('skill-category'); // Agora usa a nova classe 'skill-category' do CSS

            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category;
            
            // Opcional: Adiciona uma classe para títulos longos para ajuste de fonte via CSS
            if (category.length > 15) {
                categoryTitle.classList.add('long-title');
            }
            
            skillCategoryDiv.appendChild(categoryTitle);

            const tagsGrid = document.createElement('div');
            tagsGrid.classList.add('skill-tags-grid');

            skillsData[category].forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.classList.add('skill-tag');
                skillTag.textContent = skill;
                tagsGrid.appendChild(skillTag);

                // Adiciona evento de clique para cada tag de skill
                skillTag.addEventListener('click', function() {
                    console.log(`Você clicou na skill: ${skill}!`);
                    this.classList.add('clicked');
                    setTimeout(() => {
                        this.classList.remove('clicked');
                    }, 300);
                });
            });

            skillCategoryDiv.appendChild(tagsGrid);
            skillsGroupGrid.appendChild(skillCategoryDiv); // Adiciona a div da categoria à grid de skills
        }
    }
    skillsContentDiv.appendChild(skillsGroupGrid); // Adiciona a grid de skills ao contêiner principal de skills


    // 4. Efeito de blur no header ao rolar (NÃO PRECISA DE ALTERAÇÃO)
    const mainHeader = document.getElementById('main-header');
    const scrollThreshold = 50; // Quantidade de pixels para rolar antes de ativar o blur

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

});