document.addEventListener("DOMContentLoaded", function () {
  // 1. Funcionalidade do Menu Hambúrguer
  const hamburger = document.getElementById("hamburger-menu");
  const nav = document.getElementById("main-nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    hamburger.classList.toggle("toggle");
  });

  document.querySelectorAll("#main-nav a").forEach((item) => {
    item.addEventListener("click", () => {
      nav.classList.remove("nav-active");
      hamburger.classList.remove("toggle");
    });
  });

  // 2. Hover nos cards de projeto
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const imageUrl = card.getAttribute("data-image");
    if (imageUrl && !card.classList.contains("in-development")) {
      const cardImg = card.querySelector(".card__img");
      const cardImgHover = card.querySelector(".card__img--hover");

      if (cardImg) {
        cardImg.style.backgroundImage = `url('${imageUrl}')`;
      }
      if (cardImgHover) {
        cardImgHover.style.backgroundImage = `url('${imageUrl}')`;
      }
    } else if (card.classList.contains("in-development")) {
      applyLoadingEffect(card);
    }
  });

  function applyLoadingEffect(card) {
    const cardImg = card.querySelector(".card__img");
    const cardImgHover = card.querySelector(".card__img--hover");

    if (cardImg) {
      cardImg.classList.add("loading");
      cardImg.style.visibility = "visible";

      // Cria o spinner
      const spinner = document.createElement("div");
      spinner.classList.add("spinner");

      // Cria o texto "Em Breve"
      const text = document.createElement("span");
      text.textContent = "Coming soon";
      text.classList.add("loading-text");

      // Limpa conteúdo anterior e adiciona spinner + texto
      cardImg.innerHTML = "";
      cardImg.appendChild(spinner);
      cardImg.appendChild(text);
    }

    if (cardImgHover) {
      cardImgHover.style.opacity = "1";
    }
  }

  // 3. Efeito de digitação
  const typingTextElement = document.getElementById("typing-text");
  const cursorElement = document.querySelector(".hero-subtitle .cursor");
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
      setTimeout(
        typeWriter,
        cycleDelay -
          textToType.length * typingSpeed -
          textToType.length * deletingSpeed -
          2 * pauseTime
      );
    }
  }

  typeWriter();

  setInterval(() => {
    cursorElement.style.opacity =
      cursorElement.style.opacity === "0" ? "1" : "0";
  }, 500);

  // 4. JavaScript para carregar as SKILLS dinamicamente
  const skillsData = {
    Languages: ["JavaScript", "Python", "Java", "C#", "HTML", "CSS"],
    "Frameworks/Libraries": [
      "React",
      "Next.js",
      "Node.js",
      ".NET",
      "Tailwind CSS",
      "Bootstrap",
      "jQuery",
    ],
    Databases: ["PostgreSQL", "Entity Framework", "SQL Server"],
    "Microservices/DevOps": [
      "Grafana",
      "Git",
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "AWS",
    ],
  };

  const skillsContentDiv = document.getElementById("skills-content");

  const skillsGroupGrid = document.createElement("div");
  skillsGroupGrid.classList.add("skills-group-grid");

  for (const category in skillsData) {
    if (skillsData.hasOwnProperty(category)) {
      const skillCategoryDiv = document.createElement("div");
      skillCategoryDiv.classList.add("skill-category");

      const categoryTitle = document.createElement("h3");
      categoryTitle.textContent = category;

      if (category.length > 15) {
        categoryTitle.classList.add("long-title");
      }

      skillCategoryDiv.appendChild(categoryTitle);

      const tagsGrid = document.createElement("div");
      tagsGrid.classList.add("skill-tags-grid");

      skillsData[category].forEach((skill) => {
        const skillTag = document.createElement("span");
        skillTag.classList.add("skill-tag");
        skillTag.textContent = skill;
        tagsGrid.appendChild(skillTag);

        skillTag.addEventListener("click", function () {
          console.log(`Você clicou na skill: ${skill}!`);
          this.classList.add("clicked");
          setTimeout(() => {
            this.classList.remove("clicked");
          }, 300);
        });
      });

      skillCategoryDiv.appendChild(tagsGrid);
      skillsGroupGrid.appendChild(skillCategoryDiv);
    }
  }

  skillsContentDiv.appendChild(skillsGroupGrid);

  // 5. Efeito de blur no header ao rolar
  const mainHeader = document.getElementById("main-header");
  const scrollThreshold = 50;

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      mainHeader.classList.add("scrolled");
    } else {
      mainHeader.classList.remove("scrolled");
    }
  });
});
