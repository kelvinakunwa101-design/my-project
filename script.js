//script.js
 <script src="js/script.js"></script>
const bcrypt = require('bcryptjs'); 
const form = document.getElementById('laundry-form');
async function placeOrder() {
    const orderData = {
        email: "customer@example.com", 
        order: "2 Bags of Laundry - Wash & Fold" 
    };
    document.getElementById('inquiry-link').addEventListener('contextmenu', function(e) {
    e.preventDefault();
    navigator.clipboard.writeText("yourname@email.com");
    alert("Email copied to clipboard!");
});

    const response = await fetch('127.0.0.1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    

    const result = await response.json();
    if (result.status === "success") {
        alert("Order placed! Check your email for confirmation.");
    } else {
        alert("Error sending email.");
    }
}
console.log("%c STOP! %c You've found the secret console.", "color: red; font-size: 40px; font-weight: bold;", "color: green; font-size: 20px;");
console.log("Looking for a Software Engineer? Let's talk: kelvinakun101@gmail.com");
console.log("%c STOP! %c You found the secret console.", "color: red; font-size: 30px; font-weight: bold;", "color: #00ffc8; font-size: 15px;");

async function placeOrder(event) {
    event.preventDefault(); // Prevents the page from refreshing

    // 1. Get the data from your HTML input fields
    const customerEmail = document.getElementById('email-input').value;
    const laundryService = document.getElementById('service-select').value;

    const orderData = {
        email: customerEmail,
        order: laundryService
    };
    // Runs when the page loads
window.onload = () => {
    console.log("Page loaded successfully!");
};

    // 2. Send the data to your Flask Backend
    try {
        const response = await fetch('127.0.0.1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        if (result.status === "success") {
            alert("Order placed! Check your email for confirmation.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to the email server.");
    }
}

app = Flask(__name__)


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById(' service').value;
  const quantity = document.getElementById('quantity').value;

  const data = {
    name,
    phone,
    service,
    quantity
  };
  
  fetch('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
});     
const bookingForm = document.getElementById('booking-form');
const { client, connect } = require('./db');

connect();

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const bookingData = { service, date, time};

  fetch('/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  }) 
  .then((res) => res.text())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
});   
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
});

const sliderImages = document.querySelectorAll('.slider img');
let currentImage = 0;

setInterval(() => {
  sliderImages[currentImage].classList.remove('active');
  currentImage = (currentImage + 1) % sliderImages.length;
  sliderImages[currentImage].classList.add('active');
},  3000); 
const sections = document.querySelectorAll('section');

sections.forEach((section) => {
  section.addEventListener('click', () => {
    section.classList.toggle('active');
  });
});    

const businessNameInput = document.getElementById('business-name');
const updateBtn = document.getElementById('update-btn');

updateBtn.addEventListener('click', () => {
  const newBusinessName = businessNameInput.value;
  document.title = newBusinessName;
  document.querySelector('h1').textContent = newBusinessName;
})  
  
// Update logo
const logoUrlInput = document.getElementById('logo-url');
const updateLogoBtn = document.getElementById('update-logo-btn');
const logoImg = document.getElementById('logo');

updateLogoBtn.addEventListener('click', () => {
  const newLogoUrl = logoUrlInput.value;
  logoImg.src = newLogoUrl;
})

//Update primary color
const primaryColorInput = document.getElementById('primary-color');
const updateColorBtn = document.getElementById('update-color-btn');

updateColorBtn.addEventListener('click', () => {
  const newPrimaryColor = primaryColorInput.value;
  document.documentElement.style.setProperty('--primary-color', newPrimaryColor);
  
});
// Update
async function placeOrder(event) {
    event.preventDefault(); // Prevents the page from refreshing

    // 1. Get the data from your HTML input fields
    const customerEmail = document.getElementById('email-input').value;
    const laundryService = document.getElementById('service-select').value;

    const orderData = {
        email: customerEmail,
        order: laundryService
    };

    // 2. Send the data to your Flask Backend
    try {
        const response = await fetch('127.0.0.1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        if (result.status === "success") {
            alert("Order placed! Check your email for confirmation.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to the email server.")
    }
} 
    

