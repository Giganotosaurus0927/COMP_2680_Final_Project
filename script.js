/* index */
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let autoSlide;

function showSlide(index) {
  // If there is no banner on the current page, stop the function
  if (slides.length === 0) {
    return;
  }

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
  // Only start auto slide if the page has more than one slide
  if (slides.length <= 1) {
    return;
  }

  autoSlide = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}


/* Sign in modal */
function openModal() {
  const modalOverlay = document.getElementById('modalOverlay');

  if (modalOverlay) {
    modalOverlay.classList.add('active');
  }
}

function closeModal() {
  const modalOverlay = document.getElementById('modalOverlay');

  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
}

function handleSignIn() {
  const email = document.getElementById('emailInput');
  const password = document.getElementById('passwordInput');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  // If the current page does not have sign in elements, stop the function
  if (!email || !password || !emailError || !passwordError) {
    return;
  }

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
    alert('Sign in successful!');
    closeModal();
  }
}


/*cart*/
function openCart() {
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
  }
}

function closeCart() {
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
  }
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
  const total = document.getElementById('cartTotal');

  // If the current page does not have cart elements, stop the function
  if (!container || !total) {
    return;
  }

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div class="cart-empty" id="cartEmpty">
        <p>🛒</p>
        <p>Your cart is empty</p>
      </div>
    `;

    total.textContent = '$0.00';
    return;
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

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


/* Main DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function () {

  /* Last Updated */
  const lastUpdated = document.getElementById('lastUpdated');

  if (lastUpdated) {
    lastUpdated.textContent = 'Last Updated: ' + document.lastModified;
  }

  /* mobile navbar */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');

    if (navLinks.classList.contains('open')) {
      menuToggle.textContent = '✕';
    } else {
      menuToggle.textContent = '☰';
    }
  });
}


  /* index */
  // Banner dots only work on index.html
  if (slides.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoSlide();
      });
    });

    showSlide(0);
    startAutoSlide();
  }


  /* Contact Page */
  const form = document.getElementById('contactForm');

  // Only run this part on contact.html
  if (form) {
    const fullName = document.getElementById('fullName');
    const age = document.getElementById('age');
    const phone = document.getElementById('phone');
    const orderNumber = document.getElementById('orderNumber');
    const message = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    fullName.addEventListener('input', function () {
      fullName.setCustomValidity('');

      if (fullName.value.trim().length < 2) {
        fullName.setCustomValidity('Full name must be at least 2 characters.');
      } else if (!/^[A-Za-z ]{2,40}$/.test(fullName.value.trim())) {
        fullName.setCustomValidity('Use letters and spaces only.');
      }
    });

    age.addEventListener('input', function () {
      age.setCustomValidity('');

      if (age.value !== '' && (age.value < 10 || age.value > 100)) {
        age.setCustomValidity('Age must be between 10 and 100.');
      }
    });

    phone.addEventListener('input', function () {
      phone.setCustomValidity('');

      if (phone.value !== '' && !/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone.value)) {
        phone.setCustomValidity('Phone number must be in this format: 123-456-7890');
      }
    });

    orderNumber.addEventListener('input', function () {
      orderNumber.setCustomValidity('');

      if (orderNumber.value !== '' && !/^[A-Z]{4}[0-9]{4}$/.test(orderNumber.value)) {
        orderNumber.setCustomValidity('Order number must look like ABCD1234');
      }
    });

    message.addEventListener('input', function () {
      message.setCustomValidity('');

      if (message.value.trim().length < 10) {
        message.setCustomValidity('Message must be at least 10 characters long.');
      }
    });

    form.addEventListener('submit', function (event) {
      successMessage.style.display = 'none';

      fullName.setCustomValidity('');
      age.setCustomValidity('');
      phone.setCustomValidity('');
      orderNumber.setCustomValidity('');
      message.setCustomValidity('');

      if (fullName.value.trim().length < 2) {
        fullName.setCustomValidity('Full name must be at least 2 characters.');
      } else if (!/^[A-Za-z ]{2,40}$/.test(fullName.value.trim())) {
        fullName.setCustomValidity('Use letters and spaces only.');
      }

      if (age.value !== '' && (age.value < 10 || age.value > 100)) {
        age.setCustomValidity('Age must be between 10 and 100.');
      }

      if (phone.value !== '' && !/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone.value)) {
        phone.setCustomValidity('Phone number must be in this format: 123-456-7890');
      }

      if (orderNumber.value !== '' && !/^[A-Z]{4}[0-9]{4}$/.test(orderNumber.value)) {
        orderNumber.setCustomValidity('Order number must look like ABCD1234');
      }

      if (message.value.trim().length < 10) {
        message.setCustomValidity('Message must be at least 10 characters long.');
      }

      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        return;
      }

      event.preventDefault();
      successMessage.style.display = 'block';
      alert('Form submitted successfully!');
      form.reset();
    });

    form.addEventListener('reset', function () {
      successMessage.style.display = 'none';
    });
  }


  /* Shipping Page */
  // Shipping page only needs the Last Updated part above.
  // This comment is kept so you can clearly see the shipping section.


  /*catalog*/
  const platformFilter = document.getElementById('platformFilter');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const productGrid = document.querySelector('.product-grid');
  const cards = Array.from(document.querySelectorAll('.product-card'));

  // Only run this part on products.html
  if (platformFilter && searchInput && sortSelect && productGrid && cards.length > 0) {

    // filter
    const params = new URLSearchParams(window.location.search);
    let platformFromUrl = params.get('platform');

    // This part connects index.html buttons with products.html filter
    // index.html uses ns and ps, but products.html uses nintendo and ps5
    if (platformFromUrl === 'ns') {
      platformFromUrl = 'nintendo';
    }

    if (platformFromUrl === 'ps') {
      platformFromUrl = 'ps5';
    }

    if (platformFromUrl) {
      platformFilter.value = platformFromUrl;
    }


    // add to cart button
    cards.forEach(card => {
      const button = card.querySelector('.add-to-cart');

      if (button) {
        button.addEventListener('click', () => {
          const product = {
            name: card.querySelector('h3').textContent,
            price: parseFloat(card.querySelector('p').textContent.replace('$', '')),
            img: card.querySelector('img').getAttribute('src'),
            platform: card.getAttribute('data-platform')
          };

          addToCart(product);
        });
      }
    });


    function filterAndSort() {
      const platform = platformFilter.value;
      const searchTerm = searchInput.value.toLowerCase().trim();

      // Filter
      let filteredCards = cards.filter(card => {
        const cardPlatform = card.getAttribute('data-platform');
        const matchesPlatform = platform === 'all' || cardPlatform === platform;

        const title = card.querySelector('h3').textContent.toLowerCase();
        const matchesSearch = !searchTerm || title.includes(searchTerm);

        return matchesPlatform && matchesSearch;
      });


      // Sort
      const sortValue = sortSelect.value;

      if (sortValue === 'Price: Low to High') {
        filteredCards.sort((a, b) => {
          const priceA = parseFloat(a.querySelector('p').textContent.replace('$', ''));
          const priceB = parseFloat(b.querySelector('p').textContent.replace('$', ''));
          return priceA - priceB;
        });
      } else if (sortValue === 'Price: High to Low') {
        filteredCards.sort((a, b) => {
          const priceA = parseFloat(a.querySelector('p').textContent.replace('$', ''));
          const priceB = parseFloat(b.querySelector('p').textContent.replace('$', ''));
          return priceB - priceA;
        });
      } else if (sortValue === 'Name A-Z') {
        filteredCards.sort((a, b) => {
          const nameA = a.querySelector('h3').textContent;
          const nameB = b.querySelector('h3').textContent;
          return nameA.localeCompare(nameB);
        });
      }

      // If "Sort By" is selected → keep original order (no sorting)

      // Clear grid
      productGrid.innerHTML = '';

      // Show results or "no results" message
      if (filteredCards.length === 0) {
        const noResult = document.createElement('p');
        noResult.textContent = 'No games found matching your filters.';
        noResult.classList.add('no-result');
        productGrid.appendChild(noResult);
      } else {
        filteredCards.forEach(card => productGrid.appendChild(card));
      }
    }


    // Event listeners
    platformFilter.addEventListener('change', filterAndSort);
    searchInput.addEventListener('input', filterAndSort);
    sortSelect.addEventListener('change', filterAndSort);


    // Initial load
    filterAndSort();
  }
});


/* ESC */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeCart();
  }
});