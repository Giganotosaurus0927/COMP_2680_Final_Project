    /* index */
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let autoSlide;

    function showSlide(index) {
      if (index < 0) {
        currentSlide = slides.length - 1;
      } else if (index >= slides.length) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
      resetAutoSlide();
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
      resetAutoSlide();
    }

    function startAutoSlide() {
      autoSlide = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 3000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlide);
      startAutoSlide();
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoSlide();
      });
    });

    showSlide(0);
    startAutoSlide();

    /* Sign in modal */
    function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
    }

    function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    }

    document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    });

    function handleSignIn() {
    const email = document.getElementById('emailInput');
    const password = document.getElementById('passwordInput');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    let valid = true;

    email.classList.remove('invalid');
    password.classList.remove('invalid');
    emailError.classList.remove('show');
    passwordError.classList.remove('show');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailRegex.test(email.value)) {
        email.classList.add('invalid');
        emailError.classList.add('show');
        emailError.textContent = email.value ? 'Please enter a valid email' : 'Email is required';
        valid = false;
    }

    if (!password.value) {
        password.classList.add('invalid');
        passwordError.classList.add('show');
        valid = false;
    }

    if (valid) {
        console.log('Sign in successful');
        closeModal();
    }
    }

    /* Contact Page  */
    document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("contactForm");
      const fullName = document.getElementById("fullName");
      const age = document.getElementById("age");
      const phone = document.getElementById("phone");
      const orderNumber = document.getElementById("orderNumber");
      const message = document.getElementById("message");
      const successMessage = document.getElementById("successMessage");
      const lastUpdated = document.getElementById("lastUpdated");

      lastUpdated.textContent = "Last Updated: " + document.lastModified;

      fullName.addEventListener("input", function () {
        fullName.setCustomValidity("");

        if (fullName.value.trim().length < 2) {
          fullName.setCustomValidity("Full name must be at least 2 characters.");
        } else if (!/^[A-Za-z ]{2,40}$/.test(fullName.value.trim())) {
          fullName.setCustomValidity("Use letters and spaces only.");
        }
      });

      age.addEventListener("input", function () {
        age.setCustomValidity("");

        if (age.value !== "" && (age.value < 10 || age.value > 100)) {
          age.setCustomValidity("Age must be between 10 and 100.");
        }
      });

      phone.addEventListener("input", function () {
        phone.setCustomValidity("");

        if (phone.value !== "" && !/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone.value)) {
          phone.setCustomValidity("Phone number must be in this format: 123-456-7890");
        }
      });

      orderNumber.addEventListener("input", function () {
        orderNumber.setCustomValidity("");

        if (orderNumber.value !== "" && !/^[A-Z]{4}[0-9]{4}$/.test(orderNumber.value)) {
          orderNumber.setCustomValidity("Order number must look like ABCD1234");
        }
      });

      message.addEventListener("input", function () {
        message.setCustomValidity("");

        if (message.value.trim().length < 10) {
          message.setCustomValidity("Message must be at least 10 characters long.");
        }
      });

      form.addEventListener("submit", function (event) {
        successMessage.style.display = "none";

        fullName.setCustomValidity("");
        age.setCustomValidity("");
        phone.setCustomValidity("");
        orderNumber.setCustomValidity("");
        message.setCustomValidity("");

        if (fullName.value.trim().length < 2) {
          fullName.setCustomValidity("Full name must be at least 2 characters.");
        } else if (!/^[A-Za-z ]{2,40}$/.test(fullName.value.trim())) {
          fullName.setCustomValidity("Use letters and spaces only.");
        }

        if (age.value !== "" && (age.value < 10 || age.value > 100)) {
          age.setCustomValidity("Age must be between 10 and 100.");
        }

        if (phone.value !== "" && !/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone.value)) {
          phone.setCustomValidity("Phone number must be in this format: 123-456-7890");
        }

        if (orderNumber.value !== "" && !/^[A-Z]{4}[0-9]{4}$/.test(orderNumber.value)) {
          orderNumber.setCustomValidity("Order number must look like ABCD1234");
        }

        if (message.value.trim().length < 10) {
          message.setCustomValidity("Message must be at least 10 characters long.");
        }

        if (!form.checkValidity()) {
          event.preventDefault();
          form.reportValidity();
          return;
        }

        event.preventDefault();
        successMessage.style.display = "block";
        alert("Form submitted successfully!");
        form.reset();
      });

      form.addEventListener("reset", function () {
        successMessage.style.display = "none";
      });
    });

    /* Shipping Page  */
    document.addEventListener("DOMContentLoaded", function () {
      const lastUpdated = document.getElementById("lastUpdated");
      lastUpdated.textContent = "Last Updated: " + document.lastModified;
    });

    /*cart*/
    function openCart() {
    document.getElementById('cartDrawer').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
  }

    function closeCart() {
      document.getElementById('cartDrawer').classList.remove('active');
      document.getElementById('cartOverlay').classList.remove('active');
    }

    // data
    let cartItems = [];

    function addToCart(product) {
      const existing = cartItems.find(item => item.name === product.name);
      if (existing) {
        existing.qty += 1;
      } else {
        cartItems.push({ ...product, qty: 1 });
      }
      renderCart();
      openCart();
    }

    function removeFromCart(name) {
      cartItems = cartItems.filter(item => item.name !== name);
      renderCart();
    }

    function renderCart() {
      const container = document.getElementById('cartItems');
      const empty = document.getElementById('cartEmpty');
      const total = document.getElementById('cartTotal');

      if (cartItems.length === 0) {
        container.innerHTML = '';
        container.appendChild(empty);
        total.textContent = '$0.00';
        return;
      }

      const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      total.textContent = '$' + totalPrice.toFixed(2);

      container.innerHTML = cartItems.map(item => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-platform">${item.platform} · Qty: ${item.qty}</div>
            <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">✕</button>
        </div>
      `).join('');
    }

    // ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeModal();
        closeCart();
      }
    });