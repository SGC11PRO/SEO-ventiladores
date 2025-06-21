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


// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("VentiladorSinAspas.com loaded successfully!")

  // Inicializar funcionalidades
  initializeNavigation()
  initializeAnimations()
  initializeCalculator()
})


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




// Intersection Observer for animations
class AnimationObserver {
  constructor() {
    this.options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.options)

    this.init()
  }

  init() {
    const elements = document.querySelectorAll(".product__card, .benefit__card, .testimonial__card, .guide__item")

    elements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      this.observer.observe(el)
    })
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        this.observer.unobserve(entry.target)
      }
    })
  }
}

// Header scroll effect
class HeaderScroll {
  constructor() {
    this.header = document.querySelector(".header")
    this.lastScrollTop = 0
    this.scrollThreshold = 100

    if (this.header) {
      this.init()
    }
  }

  init() {
    window.addEventListener("scroll", this.debounce(this.handleScroll.bind(this), 10))
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > this.scrollThreshold) {
      if (scrollTop > this.lastScrollTop) {
        // Scrolling down
        this.header.style.transform = "translateY(-100%)"
      } else {
        // Scrolling up
        this.header.style.transform = "translateY(0)"
      }
    } else {
      this.header.style.transform = "translateY(0)"
    }

    this.lastScrollTop = scrollTop
  }

  debounce(func, wait) {
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
}

// Product card hover effects
class ProductCards {
  constructor() {
    this.cards = document.querySelectorAll(".product__card")
    this.init()
  }

  init() {
    this.cards.forEach((card) => {
      // Only add hover effects on non-touch devices
      if (window.matchMedia("(hover: hover)").matches) {
        card.addEventListener("mouseenter", this.handleMouseEnter.bind(this))
        card.addEventListener("mouseleave", this.handleMouseLeave.bind(this))
      }

      // Add click handler for mobile
      card.addEventListener("click", this.handleClick.bind(this))
    })
  }

  handleMouseEnter(e) {
    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)"
  }

  handleMouseLeave(e) {
    e.currentTarget.style.transform = "translateY(0) scale(1)"
  }

  handleClick(e) {
    // Add ripple effect for mobile
    if (!window.matchMedia("(hover: hover)").matches) {
      this.createRipple(e)
    }
  }

  createRipple(e) {
    const card = e.currentTarget
    const ripple = document.createElement("span")
    const rect = card.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(37, 99, 235, 0.1);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `

    card.style.position = "relative"
    card.style.overflow = "hidden"
    card.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }
}

// Add loading states for buttons
class ButtonLoading {
  constructor() {
    this.buttons = document.querySelectorAll(".product__btn")
    this.init()
  }

  init() {
    this.buttons.forEach((btn) => {
      btn.addEventListener("click", this.handleClick.bind(this))
    })
  }

  handleClick(e) {
    const btn = e.currentTarget
    const originalText = btn.innerHTML

    btn.classList.add("loading")
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirigiendo...'
    btn.disabled = true

    // Simulate loading
    setTimeout(() => {
      btn.classList.remove("loading")
      btn.innerHTML = originalText
      btn.disabled = false
    }, 2000)
  }
}

// Lazy loading for images
class LazyLoading {
  constructor() {
    this.images = document.querySelectorAll("img[data-src]")
    this.imageObserver = null

    if ("IntersectionObserver" in window) {
      this.init()
    } else {
      this.loadAllImages()
    }
  }

  init() {
    this.imageObserver = new IntersectionObserver(this.handleImageIntersection.bind(this), {
      rootMargin: "50px 0px",
      threshold: 0.01,
    })

    this.images.forEach((img) => {
      this.imageObserver.observe(img)
    })
  }

  handleImageIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target)
        this.imageObserver.unobserve(entry.target)
      }
    })
  }

  loadImage(img) {
    img.src = img.dataset.src
    img.classList.remove("lazy")

    img.addEventListener("load", () => {
      img.style.opacity = "1"
    })

    img.addEventListener("error", () => {
      img.style.opacity = "0.5"
      console.warn("Failed to load image:", img.dataset.src)
    })
  }

  loadAllImages() {
    this.images.forEach((img) => {
      this.loadImage(img)
    })
  }
}

// Price animation effect
class PriceAnimation {
  constructor() {
    this.prices = document.querySelectorAll(".price__current")
    this.priceObserver = null
    this.init()
  }

  init() {
    if ("IntersectionObserver" in window) {
      this.priceObserver = new IntersectionObserver(this.handlePriceIntersection.bind(this), { threshold: 0.5 })

      this.prices.forEach((price) => {
        this.priceObserver.observe(price)
      })
    }
  }

  handlePriceIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
        entry.target.classList.add("animated")
        this.animatePrice(entry.target)
      }
    })
  }

  animatePrice(element) {
    const text = element.textContent
    const finalPrice = Number.parseFloat(text.replace(/[€,]/g, ""))

    if (isNaN(finalPrice)) return

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

      element.textContent = `${current.toFixed(2)}€`
    }, duration / steps)
  }
}

// Newsletter form handling
class Newsletter {
  constructor() {
    this.form = document.querySelector(".newsletter__form")
    if (this.form) {
      this.init()
    }
  }

  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this))
  }

  handleSubmit(e) {
    e.preventDefault()
    const email = this.form.querySelector(".newsletter__input").value

    if (this.validateEmail(email)) {
      this.showSuccess()
      this.form.querySelector(".newsletter__input").value = ""
    } else {
      this.showError("Por favor, introduce un email válido")
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  showSuccess() {
    this.showMessage("¡Gracias por suscribirte! Te mantendremos informado.", "success")
  }

  showError(message) {
    this.showMessage(message, "error")
  }

  showMessage(message, type) {
    // Create toast notification
    const toast = document.createElement("div")
    toast.className = `toast toast--${type}`
    toast.textContent = message

    toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === "success" ? "background: #10b981;" : "background: #ef4444;"}
        `

    document.body.appendChild(toast)

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)"
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = "translateX(100%)"
      setTimeout(() => {
        toast.remove()
      }, 300)
    }, 3000)
  }
}

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

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.init()
  }

  init() {
    // Monitor page load performance
    window.addEventListener("load", () => {
      if ("performance" in window) {
        const perfData = performance.getEntriesByType("navigation")[0]
        console.log("Page Load Time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
      }
    })

    // Monitor scroll performance
    let scrollCount = 0
    window.addEventListener("scroll", () => {
      scrollCount++
      if (scrollCount % 100 === 0) {
        console.log("Scroll events:", scrollCount)
      }
    })
  }
}


// Main App Initialization
class App {
  constructor() {
    this.init()
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", this.initializeComponents.bind(this))
    } else {
      this.initializeComponents()
    }
  }

  initializeComponents() {
    console.log("VentiladorSinAspas.com loaded successfully!")

    // Initialize all components
    new MobileNavigation()
    new AnimationObserver()
    new HeaderScroll()
    new ProductCards()
    new ButtonLoading()
    new LazyLoading()
    new PriceAnimation()
    new Newsletter()
    new PerformanceMonitor()
    new Analytics()

    // Initialize smooth scrolling
    initSmoothScrolling()

    // Add ripple animation styles
    this.addRippleStyles()

    // Handle orientation change
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        window.scrollTo(0, window.scrollY)
      }, 100)
    })
  }

  addRippleStyles() {
    const style = document.createElement("style")
    style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .toast {
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
        `
    document.head.appendChild(style)
  }
}

// Initialize the app
new App()

// Service Worker Registration (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
