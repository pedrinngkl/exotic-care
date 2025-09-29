// Dashboard JavaScript
let currentSection = "dashboard"
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  showSection("dashboard")
  generateCalendar()
})

// Navigation
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active")
  })

  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Show selected section
  document.getElementById(sectionId).classList.add("active")

  // Add active class to selected nav item
  document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add("active")

  currentSection = sectionId
}

// Calendar functions
function generateCalendar() {
  const calendar = document.querySelector(".calendar-grid")
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  // Update month header
  document.getElementById("currentMonth").textContent = `${monthNames[currentMonth]} ${currentYear}`

  // Clear existing days (keep headers)
  const existingDays = calendar.querySelectorAll(".calendar-day:not(.header)")
  existingDays.forEach((day) => day.remove())

  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const today = new Date()

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div")
    emptyDay.className = "calendar-day"
    calendar.appendChild(emptyDay)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div")
    dayElement.className = "calendar-day"
    dayElement.textContent = day

    // Highlight today
    if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && day === today.getDate()) {
      dayElement.classList.add("today")
    }

    // Add appointments (sample data)
    if (day === 12 || day === 15 || day === 20) {
      dayElement.classList.add("has-appointment")
    }

    calendar.appendChild(dayElement)
  }
}

function previousMonth() {
  currentMonth--
  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }
  generateCalendar()
}

function nextMonth() {
  currentMonth++
  if (currentMonth > 11) {
    currentMonth = 0
    currentYear++
  }
  generateCalendar()
}

// Logout function
function logout() {
  if (confirm("Tem certeza que deseja sair?")) {
    window.location.href = "index.html"
  }
}

// Sample functions for interactivity
function startService(serviceId) {
  alert("Iniciando serviço...")
}

function contactClient(clientId) {
  alert("Entrando em contato com o cliente...")
}

function withdrawMoney() {
  alert("Solicitação de saque enviada!")
}

function saveProfile() {
  alert("Perfil atualizado com sucesso!")
}

function saveSettings() {
  alert("Configurações salvas com sucesso!")
}

// Mobile sidebar toggle (for responsive design)
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("active")
}

// Add mobile menu button functionality
if (window.innerWidth <= 768) {
  const header = document.querySelector(".dashboard-header .nav")
  const menuBtn = document.createElement("button")
  menuBtn.className = "mobile-menu-btn"
  menuBtn.innerHTML = "<span></span><span></span><span></span>"
  menuBtn.onclick = toggleSidebar
  header.appendChild(menuBtn)
}
