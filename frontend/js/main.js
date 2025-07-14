// Main JavaScript for Online Book Store
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSearch();
    initCategoryCards();
    initNewsletter();
    loadFeaturedBooks();
    loadBestsellers();
    updateWishlistCount();
    checkAuthStatus();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // User dropdown toggle
    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            userDropdown.style.display = 'none';
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        // Store search query in localStorage for the search results page
        localStorage.setItem('searchQuery', query);
        window.location.href = 'pages/search-results.html';
    }
}

// Category cards functionality
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            window.location.href = `pages/category.html?cat=${category}`;
        });
    });
}

// Newsletter subscription
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                subscribeNewsletter(email);
            }
        });
    }
}

function subscribeNewsletter(email) {
    // Show loading state
    const submitBtn = document.querySelector('#newsletterForm button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Successfully subscribed to newsletter!', 'success');
        
        // Reset form
        document.getElementById('newsletterForm').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Load featured books
function loadFeaturedBooks() {
    const featuredBooksContainer = document.getElementById('featuredBooks');
    
    if (featuredBooksContainer) {
        // Show loading state
        featuredBooksContainer.innerHTML = '<div class="loading">Loading featured books...</div>';
        
        // Simulate API call to get featured books
        setTimeout(() => {
            const featuredBooks = getFeaturedBooks();
            displayBooks(featuredBooks, featuredBooksContainer);
        }, 1000);
    }
}

// Load bestsellers
function loadBestsellers() {
    const bestsellersContainer = document.getElementById('bestsellersBooks');
    
    if (bestsellersContainer) {
        // Show loading state
        bestsellersContainer.innerHTML = '<div class="loading">Loading bestsellers...</div>';
        
        // Simulate API call to get bestsellers
        setTimeout(() => {
            const bestsellers = getBestsellers();
            displayBooks(bestsellers, bestsellersContainer);
        }, 1200);
    }
}

// Display books in grid
function displayBooks(books, container) {
    if (!books || books.length === 0) {
        container.innerHTML = '<p class="no-books">No books available at the moment.</p>';
        return;
    }

    const booksHTML = books.map(book => createBookCard(book)).join('');
    container.innerHTML = booksHTML;
    
    // Add event listeners to book cards
    addBookCardListeners();
}

// Create book card HTML
function createBookCard(book) {
    const discountBadge = book.discount_percentage > 0 ? 
        `<div class="book-badge">-${book.discount_percentage}%</div>` : '';
    
    const originalPrice = book.original_price && book.original_price > book.price ? 
                        `<span class="original-price">KSh ${book.original_price.toFixed(0)}</span>` : '';
    
    const discount = book.original_price && book.original_price > book.price ? 
        `<span class="discount">Save KSh ${(book.original_price - book.price).toFixed(0)}</span>` : '';

    return `
        <div class="book-card" data-book-id="${book.id}">
            <div class="book-image">
                <img src="${book.cover_image_url || 'images/book-placeholder.jpg'}" alt="${book.title}">
                ${discountBadge}
            </div>
            <div class="book-content">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-rating">
                    <div class="stars">
                        ${generateStars(book.rating || 0)}
                    </div>
                    <span class="rating-text">(${book.review_count || 0} reviews)</span>
                </div>
                <div class="book-price">
                    <span class="current-price">KSh ${book.price.toFixed(0)}</span>
                    ${originalPrice}
                    ${discount}
                </div>
                <div class="book-actions">
                    <button class="btn-add-cart icon-only" onclick="addToCart(${book.id})" title="Add to Cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="btn-wishlist" onclick="toggleWishlist(${book.id})" title="Add to Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Add event listeners to book cards
function addBookCardListeners() {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.closest('.book-actions')) {
                return;
            }
            
            const bookId = this.dataset.bookId;
            window.location.href = `pages/book-details.html?id=${bookId}`;
        });
    });
}

// Cart functionality
function addToCart(bookId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if book is already in cart
    const existingItem = cart.find(item => item.bookId === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            bookId: bookId,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    ShoppingCart.updateCartCount();
    
    showNotification('Book added to cart!', 'success');
}

// Wishlist functionality
function toggleWishlist(bookId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    const existingIndex = wishlist.indexOf(bookId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showNotification('Book removed from wishlist!', 'info');
    } else {
        wishlist.push(bookId);
        showNotification('Book added to wishlist!', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

// Update wishlist count badge
function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        wishlistCount.textContent = wishlist.length;
        wishlistCount.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

// Check authentication status
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const profileLink = document.getElementById('profileLink');
    const ordersLink = document.getElementById('ordersLink');
    const logoutLink = document.getElementById('logoutLink');
    
    if (user) {
        // User is logged in
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'block';
        if (ordersLink) ordersLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'block';
    } else {
        // User is not logged in
        if (loginLink) loginLink.style.display = 'block';
        if (registerLink) registerLink.style.display = 'block';
        if (profileLink) profileLink.style.display = 'none';
        if (ordersLink) ordersLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Remove any fallback to localStorage for book info
// All book info should come from window.booksData only
function getFeaturedBooks() {
    // Example: return first 4 books as featured
    return window.booksData.slice(0, 4);
}
function getBestsellers() {
    // Example: return next 4 books as bestsellers
    return window.booksData.slice(4, 8);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .loading {
        text-align: center;
        padding: 2rem;
        color: #666;
    }
    
    .no-books {
        text-align: center;
        padding: 2rem;
        color: #666;
        font-style: italic;
    }
`;
document.head.appendChild(style); 

// Hide navbar on scroll down, show on scroll up
let lastScrollY = window.scrollY;
let header = document.querySelector('.header');
let ticking = false;

function handleNavScroll() {
  if (!header) return;
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Scrolling down
    header.style.top = '-100px';
    header.style.opacity = '0';
  } else {
    // Scrolling up
    header.style.top = '0';
    header.style.opacity = '1';
  }
  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(handleNavScroll);
    ticking = true;
  }
}); 