document.addEventListener("DOMContentLoaded", () => {
  initGaleriSplide();
  initTestimoniSplide();
  initFormFilledEffect();
  initFormValidation();
  initImageColorSwitcher();
  initScrollToTop();
});
function initGaleriSplide() {
  const splide = new Splide("#galeriSplide", {
    type: "loop",
    perPage: 3,
    focus: "center",
    gap: "1rem",
    autoplay: true,
    interval: 3000,
    speed: 600,
    arrows: true,
    breakpoints: {
      768: { perPage: 1, padding: { left: 0, right: 25 } },
      992: { perPage: 2 },
    },
  });

  document.querySelector("#galeriSplide").classList.add("splide-not-ready");

  splide.on("mounted", () => {
    document
      .querySelector("#galeriSplide")
      .classList.remove("splide-not-ready");
    splide.go("+1");
    setTimeout(() => splide.go("-1"), 100);
  });

  splide.mount();
}

function initTestimoniSplide() {
  new Splide("#testimoniSplide", {
    type: "loop",
    perPage: 3,
    autoplay: true,
    interval: 5500,
    speed: 400,
    focus: "center",
    gap: "1rem",
    pagination: false,
    breakpoints: {
      768: { perPage: 2 },
      992: { perPage: 2 },
    },
  }).mount();
}

function initFormFilledEffect() {
  document.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.toggle("filled", this.value.trim() !== "");
    });
  });
}

function initFormValidation() {
  const form = document.getElementById("kontakForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    form.querySelectorAll("input, textarea").forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("is-invalid");
        isValid = false;
      } else {
        input.classList.remove("is-invalid");
      }
    });

    if (isValid) {
      alert("Pesan berhasil dikirim!");
      form.reset();
    }
  });
}

function initImageColorSwitcher() {
  document.querySelectorAll("[data-card]").forEach((card) => {
    const cardType = card.getAttribute("data-card");
    const radios = card.querySelectorAll(`input[name="color-${cardType}"]`);
    const img = card.querySelector("img");

    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio.checked) {
          img.src = `assets/${radio.value}.png`;
        }
      });
    });
  });
}

function initScrollToTop() {
  const scrollBtn = document.getElementById("scrollTopBtn");
  const homeSection = document.getElementById("home");

  if (!scrollBtn || !homeSection) return;

  window.addEventListener("scroll", () => {
    const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
    scrollBtn.style.display =
      window.scrollY > homeBottom - 100 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
