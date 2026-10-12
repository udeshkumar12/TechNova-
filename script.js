"use strict";

// Header gets a glass background after scrolling
const siteHeader = document.getElementById("siteHeader");
const onScroll = () => {
  if (siteHeader) siteHeader.classList.toggle("scrolled", window.scrollY > 12);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Scroll reveal animation
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.innerHTML = "<span></span><span></span><span></span>";
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
    menuToggle.innerHTML = isOpen
      ? "<span class='close-mark'>×</span>"
      : "<span></span><span></span><span></span>";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target))
      closeMenu();
  });
}

// Rotating hero message; safe if hero elements are absent
const heroServices = [
  {
    title: "Automate with AI.",
    description:
      "Practical technology solutions to simplify workflows, improve your online presence, and make better use of business data.",
    cardTitle: "AI Automation",
    cardDescription: "Work smarter. Automate faster.",
    icon: "✦",
    color: "#c4b5fd",
    background: "rgba(139, 92, 246, 0.2)",
  },
  {
    title: "Build for the web.",
    description:
      "Create modern, responsive websites that present your business clearly across phones, tablets, laptops, and desktops.",
    cardTitle: "Website Development",
    cardDescription: "Responsive design. Better experiences.",
    icon: "⌘",
    color: "#93c5fd",
    background: "rgba(59, 130, 246, 0.2)",
  },
  {
    title: "Understand your data.",
    description:
      "Turn business data into useful reports and visual insights to support clearer, more informed decisions.",
    cardTitle: "Data Analytics",
    cardDescription: "Clear reports. Useful insights.",
    icon: "▥",
    color: "#6ee7b7",
    background: "rgba(52, 211, 153, 0.18)",
  },
  {
    title: "Organize your records.",
    description:
      "Bring more structure to financial records, expense tracking, and routine reports with practical digital tools.",
    cardTitle: "Accounting Solutions",
    cardDescription: "Organized records. Smarter workflows.",
    icon: "▤",
    color: "#fcd34d",
    background: "rgba(251, 191, 36, 0.18)",
  },
];

const serviceTitle = document.getElementById("serviceTitle");
const serviceDescription = document.getElementById("serviceDescription");
const visualTitle = document.getElementById("visualTitle");
const visualDescription = document.getElementById("visualDescription");
const serviceIcon = document.getElementById("serviceIcon");
const serviceNumber = document.getElementById("serviceNumber");
const visualProgress = document.getElementById("visualProgress");
let activeService = 0;

function showService(index) {
  const service = heroServices[index];
  if (!service) return;

  if (serviceTitle) {
    serviceTitle.classList.remove("enter", "exit");
    serviceTitle.textContent = service.title;
    void serviceTitle.offsetWidth;
    serviceTitle.classList.add("enter");
  }
  if (serviceDescription) serviceDescription.textContent = service.description;
  if (visualTitle) visualTitle.textContent = service.cardTitle;
  if (visualDescription)
    visualDescription.textContent = service.cardDescription;
  if (serviceIcon) {
    serviceIcon.textContent = service.icon;
    serviceIcon.style.color = service.color;
    serviceIcon.style.background = service.background;
  }
  if (serviceNumber)
    serviceNumber.textContent = `${String(index + 1).padStart(2, "0")} / 04`;
  if (visualProgress)
    visualProgress.style.width = `${((index + 1) / heroServices.length) * 100}%`;
  activeService = index;
}

// Initial icon colours for the first service
if (serviceIcon) {
  serviceIcon.style.color = heroServices[0].color;
  serviceIcon.style.background = heroServices[0].background;
}

if (serviceTitle && heroServices.length > 1) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!reducedMotion) {
    window.setInterval(() => {
      showService((activeService + 1) % heroServices.length);
    }, 5000);
  }
}

// Keep the copyright year current.
const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
