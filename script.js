const year = document.getElementById("year");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.getElementById("mainMenu");
const faqButtons = document.querySelectorAll(".faq-question");
const reveals = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const openPlansControls = document.querySelectorAll("[data-open-plans='true']");
const plansOverlay = document.getElementById("plansOverlay");
const closePlansModal = document.getElementById("closePlansModal");
const closePlansModalSecondary = document.getElementById("closePlansModalSecondary");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuToggle && menuLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const openPlansModal = () => {
  if (!plansOverlay) {
    return;
  }

  plansOverlay.hidden = false;
  document.body.classList.add("modal-open");
  closePlansModal?.focus();
};

const closePlans = () => {
  if (!plansOverlay) {
    return;
  }

  plansOverlay.hidden = true;
  document.body.classList.remove("modal-open");
};

openPlansControls.forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    openPlansModal();
  });
});

closePlansModal?.addEventListener("click", closePlans);
closePlansModalSecondary?.addEventListener("click", closePlans);

plansOverlay?.addEventListener("click", (event) => {
  if (event.target === plansOverlay) {
    closePlans();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && plansOverlay && !plansOverlay.hidden) {
    closePlans();
  }
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const answer = button.closest(".faq-item")?.querySelector(".faq-answer");

    button.setAttribute("aria-expanded", String(!expanded));
    if (answer) {
      answer.hidden = expanded;
    }
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
}

const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (supportsHover) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * 6;
      const tiltY = (x - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
  });
}
