// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Newsletter form handling
const newsletterForm = document.querySelector(".newsletter__form")
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const email = this.querySelector(".newsletter__input").value

    if (email) {
      // Aquí integrarías con tu servicio de email marketing
      alert("¡Gracias por suscribirte! Te mantendremos informado de las mejores ofertas.")
      this.querySelector(".newsletter__input").value = ""
    }
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".product__card, .benefit__card, .testimonial__card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Header scroll effect
let lastScrollTop = 0
const header = document.querySelector(".header")

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    header.style.transform = "translateY(-100%)"
  } else {
    // Scrolling up
    header.style.transform = "translateY(0)"
  }

  lastScrollTop = scrollTop
})

// Add scroll effect to header
header.style.transition = "transform 0.3s ease"

// Product card hover effects
document.querySelectorAll(".product__card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Price animation effect
function animatePrice(element) {
  const finalPrice = Number.parseFloat(element.textContent.replace("€", ""))
  const duration = 1000
  const steps = 60
  const increment = finalPrice / steps
  let current = 0
  let step = 0

  const timer = setInterval(() => {
    current += increment
    step++

    if (step >= steps) {
      current = finalPrice
      clearInterval(timer)
    }

    element.textContent = `€${current.toFixed(2)}`
  }, duration / steps)
}

// Trigger price animation when prices come into view
const priceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
        entry.target.classList.add("animated")
        animatePrice(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".price__current").forEach((price) => {
  priceObserver.observe(price)
})

// Add loading states for buttons
document.querySelectorAll(".product__btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const originalText = this.innerHTML
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirigiendo...'
    this.disabled = true

    setTimeout(() => {
      this.innerHTML = originalText
      this.disabled = false
    }, 2000)
  })
})

// Testimonials carousel (simple version)
let currentTestimonial = 0
const testimonials = document.querySelectorAll(".testimonial__card")

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? "block" : "none"
  })
}

// Auto-rotate testimonials on mobile
if (window.innerWidth <= 768) {
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    showTestimonial(currentTestimonial)
  }, 5000)
}

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
  // Aquí integrarías con Google Analytics o tu herramienta de análisis
  console.log(`Tracking: ${action} clicked on ${element}`)

  // Ejemplo para Google Analytics 4:
  // gtag('event', action, {
  //     event_category: 'engagement',
  //     event_label: element
  // });
}

// Track product clicks
document.querySelectorAll(".product__btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    trackClick(`product-${index + 1}`, "amazon_redirect")
  })
})

// Track navigation clicks
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    trackClick(link.textContent, "navigation")
  })
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll handling code here
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("VentiladorSinAspas.com loaded successfully!")

  // Inicializar funcionalidades
  initializeNavigation()
  initializeAnimations()
  initializeCalculator()
})

// Función para inicializar la calculadora
function initializeCalculator() {
  const calculatorForm = document.getElementById("calculator-form")
  if (!calculatorForm) {
    console.warn("Calculadora no encontrada")
    return
  }

  // Mejorar la interactividad de las opciones de radio
  const radioOptions = calculatorForm.querySelectorAll(".radio-option")
  radioOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const input = this.querySelector('input[type="radio"]')
      if (input) {
        input.checked = true

        // Remover selección previa del mismo grupo
        const groupName = input.name
        const groupOptions = calculatorForm.querySelectorAll(`input[name="${groupName}"]`)
        groupOptions.forEach((radio) => {
          const parentOption = radio.closest(".radio-option")
          if (parentOption) {
            parentOption.classList.remove("selected")
          }
        })

        // Añadir clase de seleccionado
        this.classList.add("selected")
      }
    })
  })
}

// Función para inicializar navegación
function initializeNavigation() {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Cerrar menú móvil al hacer clic en un enlace
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) {
        navMenu.classList.remove("active")
      }
    })
  })
}

// Función para inicializar animaciones
function initializeAnimations() {
  // Intersection Observer para animaciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar elementos para animación
  const animatedElements = document.querySelectorAll(
    ".product__card, .benefit__card, .testimonial__card, .comparison-card",
  )
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Calculadora de Recomendación - VERSIÓN CORREGIDA
function calculateRecommendation() {
  // Obtener el formulario correctamente
  const form = document.getElementById("calculator-form")

  if (!form) {
    console.error("Formulario no encontrado")
    return
  }

  let traditionalScore = 0
  let bladelessScore = 0

  // Obtener todas las respuestas seleccionadas
  const selectedInputs = form.querySelectorAll('input[type="radio"]:checked')

  // Verificar que se hayan respondido todas las preguntas
  if (selectedInputs.length < 3) {
    alert("Por favor, responde todas las preguntas para obtener una recomendación precisa.")
    return
  }

  // Calcular puntuaciones
  selectedInputs.forEach((input) => {
    const traditionalPoints = Number.parseInt(input.getAttribute("data-traditional")) || 0
    const bladelessPoints = Number.parseInt(input.getAttribute("data-bladeless")) || 0

    traditionalScore += traditionalPoints
    bladelessScore += bladelessPoints
  })

  // Mostrar resultado
  showRecommendationResult(traditionalScore, bladelessScore)
}

// Nueva función para mostrar el resultado
function showRecommendationResult(traditionalScore, bladelessScore) {
  const resultDiv = document.getElementById("recommendation-result")
  const resultText = document.getElementById("result-text")
  const traditionalBtn = document.getElementById("traditional-btn")
  const bladelessBtn = document.getElementById("bladeless-btn")

  if (!resultDiv || !resultText) {
    console.error("Elementos de resultado no encontrados")
    return
  }

  let recommendation = ""
  let recommendationType = ""

  if (traditionalScore > bladelessScore) {
    recommendationType = "traditional"
    recommendation = `
      <strong>Te recomendamos ventiladores CON ASPAS</strong><br><br>
      Basado en tus respuestas, los ventiladores tradicionales con aspas son la mejor opción para ti. 
      Ofrecen mayor potencia de aire, mejor relación calidad-precio y son ideales para espacios grandes.
      <br><br>
      <em>Puntuación: Tradicionales ${traditionalScore}/6 vs Sin Aspas ${bladelessScore}/6</em>
    `
    if (traditionalBtn) traditionalBtn.style.display = "inline-block"
    if (bladelessBtn) bladelessBtn.style.display = "none"
  } else if (bladelessScore > traditionalScore) {
    recommendationType = "bladeless"
    recommendation = `
      <strong>Te recomendamos ventiladores SIN ASPAS</strong><br><br>
      Según tus preferencias, los ventiladores sin aspas son perfectos para ti. 
      Ofrecen máxima seguridad, funcionamiento ultra silencioso y tecnología avanzada con purificación de aire.
      <br><br>
      <em>Puntuación: Sin Aspas ${bladelessScore}/6 vs Tradicionales ${traditionalScore}/6</em>
    `
    if (bladelessBtn) bladelessBtn.style.display = "inline-block"
    if (traditionalBtn) traditionalBtn.style.display = "none"
  } else {
    recommendationType = "tie"
    recommendation = `
      <strong>¡Es un empate!</strong><br><br>
      Ambos tipos de ventiladores podrían funcionar bien para ti. Te recomendamos revisar nuestras 
      comparativas detalladas y considerar tu presupuesto final para tomar la decisión.
      <br><br>
      <em>Puntuación: Empate ${traditionalScore}/6</em>
    `
    if (traditionalBtn) traditionalBtn.style.display = "inline-block"
    if (bladelessBtn) bladelessBtn.style.display = "inline-block"
  }

  resultText.innerHTML = recommendation
  resultDiv.style.display = "block"

  // Scroll suave al resultado
  setTimeout(() => {
    resultDiv.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }, 100)

  // Tracking para analytics
  if (typeof trackClick === "function") {
    trackClick(`calculator-result-${recommendationType}`, "recommendation_calculator")
  }
}

// Animación de las barras de rendimiento cuando entran en vista
const performanceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll(".performance-fill")
        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.style.width || "0%"
          }, index * 200)
        })
      }
    })
  },
  { threshold: 0.5 },
)

// Observar las tarjetas de comparación
document.querySelectorAll(".comparison-card").forEach((card) => {
  performanceObserver.observe(card)
})

// Mejorar la interactividad de las opciones de radio
document.querySelectorAll(".radio-option").forEach((option) => {
  option.addEventListener("click", function () {
    const input = this.querySelector('input[type="radio"]')
    input.checked = true

    // Remover selección previa del mismo grupo
    const groupName = input.name
    document.querySelectorAll(`input[name="${groupName}"]`).forEach((radio) => {
      radio.closest(".radio-option").classList.remove("selected")
    })

    // Añadir clase de seleccionado
    this.classList.add("selected")
  })
})

// Añadir estilos dinámicos para opciones seleccionadas
const style = document.createElement("style")
style.textContent = `
    .radio-option.selected {
        border-color: var(--primary-color) !important;
        background: rgba(37, 99, 235, 0.1) !important;
        transform: scale(1.02);
    }
`
document.head.appendChild(style)
