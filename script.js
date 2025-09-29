// Global state
let selectedAnimals = []
let selectedSpecialist = null
let selectedPlan = null
let currentUser = null

// Sample data
const specialists = [
  {
    id: 1,
    name: "Dr. Marina Silva",
    specialty: "reptil",
    rating: 4.9,
    reviews: 127,
    bio: "Veterinária especializada em répteis com 8 anos de experiência. Mestrado em Medicina Veterinária pela USP.",
    photo: "/professional-veterinarian-woman.jpg",
    verified: true,
    certified: true,
    pricing: {
      daily: 80,
      weekly: 500,
      monthly: 1800,
    },
  },
  {
    id: 2,
    name: "Dr. Carlos Mendes",
    specialty: "ave",
    rating: 4.8,
    reviews: 89,
    bio: "Especialista em aves exóticas com 12 anos de experiência. Doutor em Medicina Veterinária pela UNESP.",
    photo: "/professional-veterinarian-man.jpg",
    verified: true,
    certified: true,
    pricing: {
      daily: 90,
      weekly: 600,
      monthly: 2100,
    },
  },
  {
    id: 3,
    name: "Dra. Ana Costa",
    specialty: "mamifero",
    rating: 4.9,
    reviews: 156,
    bio: "Especialista em mamíferos exóticos com 10 anos de experiência. Pós-graduação em Animais Silvestres.",
    photo: "/professional-veterinarian-woman-smiling.jpg",
    verified: true,
    certified: true,
    pricing: {
      daily: 85,
      weekly: 550,
      monthly: 1950,
    },
  },
]

// DOM Elements
const animalModal = document.getElementById("animalModal")
const specialistModal = document.getElementById("specialistModal")
const checkoutModal = document.getElementById("checkoutModal")
const specialistLoginModal = document.getElementById("specialistLoginModal")
const mobileMenu = document.getElementById("mobileMenu")

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  loadSpecialists()
  setupEventListeners()
})

// Event Listeners
function setupEventListeners() {
  // Animal selection
  document.querySelectorAll(".animal-card").forEach((card) => {
    card.addEventListener("click", function () {
      toggleAnimalSelection(this)
    })
  })

  // Plan selection
  document.addEventListener("click", (e) => {
    if (e.target.closest(".plan-card")) {
      selectPlan(e.target.closest(".plan-card"))
    }
  })

  // Forms
  document.getElementById("loginForm").addEventListener("submit", handleLogin)
  document.getElementById("registerForm").addEventListener("submit", handleRegister)
  document.getElementById("paymentForm").addEventListener("submit", handlePayment)

  // Close modals on outside click
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeAllModals()
    }
  })
}

// Mobile menu toggle
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active")
}

// Animal selection functions
function showAnimalSelection() {
  animalModal.classList.add("active")
}

function closeAnimalModal() {
  animalModal.classList.remove("active")
}

function toggleAnimalSelection(card) {
  const animal = card.dataset.animal

  if (card.classList.contains("selected")) {
    card.classList.remove("selected")
    selectedAnimals = selectedAnimals.filter((a) => a !== animal)
  } else {
    card.classList.add("selected")
    selectedAnimals.push(animal)
  }
}

function findSpecialists() {
  const location = document.getElementById("location").value

  if (selectedAnimals.length === 0) {
    alert("Por favor, selecione pelo menos um tipo de animal.")
    return
  }

  if (!location.trim()) {
    alert("Por favor, informe sua localização.")
    return
  }

  closeAnimalModal()

  // Filter and display specialists
  const filteredSpecialists = specialists.filter((specialist) => selectedAnimals.includes(specialist.specialty))

  displaySpecialists(filteredSpecialists)

  // Scroll to specialists section
  document.getElementById("specialists").scrollIntoView({ behavior: "smooth" })
}

// Specialists functions
function loadSpecialists() {
  displaySpecialists(specialists)
}

function displaySpecialists(specialistList) {
  const container = document.getElementById("specialistsList")

  container.innerHTML = specialistList
    .map(
      (specialist) => `
        <div class="specialist-card" onclick="openSpecialistProfile(${specialist.id})">
            <div class="specialist-header">
                <img src="${specialist.photo}" alt="${specialist.name}" class="specialist-avatar">
                <div class="specialist-info">
                    <h3>${specialist.name}</h3>
                    <div class="rating">
                        <span class="stars">★★★★★</span>
                        <span>${specialist.rating} (${specialist.reviews} avaliações)</span>
                    </div>
                </div>
            </div>
            <div class="badges">
                ${specialist.verified ? '<span class="badge verified">✓ Verificado</span>' : ""}
                ${specialist.certified ? '<span class="badge certified">🎓 Certificado</span>' : ""}
            </div>
            <p class="specialist-bio">${specialist.bio}</p>
            <div class="specialist-price">A partir de R$ ${specialist.pricing.daily}/dia</div>
        </div>
    `,
    )
    .join("")
}

function openSpecialistProfile(specialistId) {
  selectedSpecialist = specialists.find((s) => s.id === specialistId)

  if (!selectedSpecialist) return

  // Update modal content
  document.getElementById("specialistName").textContent = selectedSpecialist.name
  document.getElementById("specialistPhoto").src = selectedSpecialist.photo
  document.getElementById("specialistRating").textContent =
    `${selectedSpecialist.rating} (${selectedSpecialist.reviews} avaliações)`
  document.getElementById("specialistBio").textContent = selectedSpecialist.bio

  // Update pricing
  document.querySelector('[data-plan="daily"] .price').innerHTML =
    `R$ ${selectedSpecialist.pricing.daily}<span>/dia</span>`
  document.querySelector('[data-plan="weekly"] .price').innerHTML =
    `R$ ${selectedSpecialist.pricing.weekly}<span>/semana</span>`
  document.querySelector('[data-plan="monthly"] .price').innerHTML =
    `R$ ${selectedSpecialist.pricing.monthly}<span>/mês</span>`

  specialistModal.classList.add("active")
}

function closeSpecialistModal() {
  specialistModal.classList.remove("active")
  selectedSpecialist = null
  selectedPlan = null

  // Clear plan selections
  document.querySelectorAll(".plan-card").forEach((card) => {
    card.classList.remove("selected")
  })
}

// Plan selection
function selectPlan(planCard) {
  // Clear previous selections
  document.querySelectorAll(".plan-card").forEach((card) => {
    card.classList.remove("selected")
  })

  // Select current plan
  planCard.classList.add("selected")
  selectedPlan = planCard.dataset.plan
}

// Checkout functions
function proceedToCheckout() {
  if (!selectedPlan) {
    alert("Por favor, selecione um plano.")
    return
  }

  // Update checkout summary
  document.getElementById("checkoutSpecialist").textContent = selectedSpecialist.name
  document.getElementById("checkoutPlan").textContent = getPlanName(selectedPlan)
  document.getElementById("checkoutPrice").textContent = `R$ ${selectedSpecialist.pricing[selectedPlan]}`
  document.getElementById("checkoutAnimal").textContent = getAnimalName(selectedAnimals[0])

  closeSpecialistModal()
  checkoutModal.classList.add("active")
}

function closeCheckoutModal() {
  checkoutModal.classList.remove("active")
}

function processPayment() {
  // Simulate payment processing
  alert("Pagamento processado com sucesso! O especialista será notificado e entrará em contato em breve.")
  closeCheckoutModal()
}

// Specialist login functions
function openSpecialistLogin() {
  specialistLoginModal.classList.add("active")
}

function closeSpecialistLoginModal() {
  specialistLoginModal.classList.remove("active")
}

function showLoginTab() {
  document.querySelector(".tab-btn.active").classList.remove("active")
  document.querySelector(".tab-btn").classList.add("active")
  document.getElementById("loginTab").classList.remove("hidden")
  document.getElementById("registerTab").classList.add("hidden")
}

function showRegisterTab() {
  document.querySelector(".tab-btn.active").classList.remove("active")
  document.querySelectorAll(".tab-btn")[1].classList.add("active")
  document.getElementById("loginTab").classList.add("hidden")
  document.getElementById("registerTab").classList.remove("hidden")
}

// Form handlers
function handleLogin(e) {
  e.preventDefault()
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  // Simulate login
  currentUser = { email, type: "specialist" }
  alert("Login realizado com sucesso!")
  closeSpecialistLoginModal()

  // Redirect to dashboard (would be a separate page in real app)
  window.open("dashboard.html", "_blank")
}

function handleRegister(e) {
  e.preventDefault()
  const name = document.getElementById("registerName").value
  const email = document.getElementById("registerEmail").value
  const password = document.getElementById("registerPassword").value
  const specialty = document.getElementById("registerSpecialty").value

  // Simulate registration
  currentUser = { name, email, specialty, type: "specialist" }
  alert("Cadastro realizado com sucesso! Você receberá um email para verificação.")
  closeSpecialistLoginModal()
}

function handlePayment(e) {
  e.preventDefault()
  processPayment()
}

// Utility functions
function getPlanName(plan) {
  const names = {
    daily: "Diário",
    weekly: "Semanal",
    monthly: "Mensal",
  }
  return names[plan] || plan
}

function getAnimalName(animal) {
  const names = {
    reptil: "Réptil",
    ave: "Ave Exótica",
    mamifero: "Mamífero Exótico",
    aquatico: "Animal Aquático",
    aracnideo: "Aracnídeo",
    inseto: "Inseto",
  }
  return names[animal] || animal
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.remove("active")
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})
