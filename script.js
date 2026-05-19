// ══════════════════════════════════════════════════════
//  INPUT RESTRICTION
// ══════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("fullname") || document.getElementById("signup-fullname");
    if (nameInput) {
        nameInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        });
    }

    loadUser();
    updateCartBadge();

    if (typeof renderNews === 'function') renderNews();
    if (typeof initDrops === 'function') initDrops();

    renderFeatured('hotwheels', 'feat-hotwheels');
    renderFeatured('premium',   'feat-premium');
    renderFeatured('matchbox',  'feat-matchbox');

    if (localStorage.getItem('loggedIn') === 'true') {
        const tl = document.getElementById('trackLinkDrawer');
        if (tl) tl.style.display = 'block';
    }
});

// ══════════════════════════════════════════════════════
//  SORT (product pages)
// ══════════════════════════════════════════════════════
const sortSelect = document.getElementById("sort");
const container  = document.querySelector(".products");

if (sortSelect && container) {
    const originalOrder = Array.from(container.children);
    sortSelect.addEventListener("change", () => {
        let items = Array.from(container.children);
        if (sortSelect.value === "low") {
            items.sort((a, b) => a.dataset.price - b.dataset.price);
        } else if (sortSelect.value === "high") {
            items.sort((a, b) => b.dataset.price - a.dataset.price);
        } else {
            items = originalOrder;
        }
        container.innerHTML = "";
        items.forEach(item => container.appendChild(item));
    });
}

// ══════════════════════════════════════════════════════
//  AUTH
// ══════════════════════════════════════════════════════
function loadUser() {
    const loggedIn   = localStorage.getItem("loggedIn");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Desktop nav auth section
    const authSection = document.getElementById("authSection");
    if (authSection) {
        if (loggedIn === "true" && currentUser) {
            authSection.innerHTML = `
                <li class="nav-item"><span class="nav-button" style="color:#e60000;font-weight:bold;">HI, ${currentUser.username.toUpperCase()}</span></li>
                <li class="nav-item"><a href="account.html" class="nav-button">ACCOUNT</a></li>
                <li class="nav-item"><a href="#" onclick="logout()" class="nav-button">LOGOUT</a></li>`;
        } else {
            authSection.innerHTML = `
                <li class="nav-item"><a href="login.html" class="nav-button">LOGIN</a></li>
                <li class="nav-item"><a href="signup.html" class="nav-button">SIGN UP</a></li>`;
        }
    }

    // Hamburger drawer auth section
    const drawer = document.getElementById("drawerAuthSection");
    if (drawer) {
        if (loggedIn === "true" && currentUser) {
            drawer.innerHTML = `
                <p class="drawer-greeting">Hi, <strong>${currentUser.username}</strong> 👋</p>
                <a href="inbox.html" class="drawer-link drawer-link--green">📩 Inbox</a>
                <a href="account.html" class="drawer-link">👤 Account</a>
                <a href="#" onclick="logout()" class="drawer-link drawer-link--red">⏻ Logout</a>`;
        } else {
            drawer.innerHTML = `
                <a href="login.html" class="drawer-link drawer-link--accent">Login</a>
                <a href="signup.html" class="drawer-link">Sign Up</a>`;
        }
    }
}

function logout() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAdmin");
        window.location.reload();
    }
}

// ══════════════════════════════════════════════════════
//  SEARCH
// ══════════════════════════════════════════════════════
function handleSearch(event) {
    if (event.key === "Enter") executeSearch();
}

function executeSearch() {
    const searchInput = document.getElementById('site-search');
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase().trim();
    if (query) window.location.href = `hotwheels.html?search=${encodeURIComponent(query)}`;
}

// ══════════════════════════════════════════════════════
//  CART BADGE
// ══════════════════════════════════════════════════════
function updateCartBadge() {
    const cart  = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    if (cart.length > 0) {
        badge.style.display = 'inline';
        badge.textContent   = cart.length;
    }
}

// ══════════════════════════════════════════════════════
//  WISHLIST
// ══════════════════════════════════════════════════════
function addToWishlist(id, name, price, img) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.find(item => item.name === name)) {
        alert(name + " is already in your wishlist!");
        return;
    }
    wishlist.push({ id, name, price, img });
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(name + " added to Wishlist! ❤️🏁");
}

// ══════════════════════════════════════════════════════
//  HAMBURGER
// ══════════════════════════════════════════════════════
function toggleHamburger() {
    document.getElementById('hamburgerDrawer').classList.toggle('open');
    document.getElementById('hamburgerOverlay').classList.toggle('open');
    document.getElementById('hamburgerBtn').classList.toggle('active');
}

function closeHamburger() {
    document.getElementById('hamburgerDrawer').classList.remove('open');
    document.getElementById('hamburgerOverlay').classList.remove('open');
    document.getElementById('hamburgerBtn').classList.remove('active');
}

// ══════════════════════════════════════════════════════
//  THEME
// ══════════════════════════════════════════════════════
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
        const cur  = document.documentElement.getAttribute('data-theme');
        const next = cur === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
    });
}

// ══════════════════════════════════════════════════════
//  NEWS (index only)
// ══════════════════════════════════════════════════════
const NEWS = [
    {
        cat: 'new-release',
        catLabel: 'New Release',
        date: 'May 2026',
        img: 'https://github.com/XyrishLey/WBDV111_MidtermLabExam-Pits-Stop-Collectibles-/blob/main/IMAGES/PRE%20ORDER/BOULEVARD%202026.webp?raw=true',
        title: 'Hot Wheels Premium Boulevard Mix (Cars #151-#155)',
        desc: 'The highly anticipated Boulevard set has arrived. Featuring five iconic street legends and off-road beasts including the Toyota Alphard, Koenigsegg CC850, and GR Supra—all with full die-cast metal bodies and Real Riders rubber tires.',
        link: 'preorder.html',
        linkLabel: 'Pre-Order Now →'
    },

    {
        cat: 'voucher-code',
        catLabel: 'VOUCHER CODES!!!',
        date: 'May 2026',
        img: 'https://i.ytimg.com/vi/OW9pIOmXgSQ/hqdefault.jpg',
        title: '🚨 Pits Stop Collectibles is now officially LIVE! 🚨',
        desc: `
                To celebrate the launch, we’re dropping exclusive promo codes for everyone:

                 WEBSITEISNOWLIVE — 50% OFF (minimum order of ₱1,500 required)
                 PITSTOP10 — 10% OFF with no restrictions
                 PREMIUM2026 — ₱50 OFF on orders with Premium category items
            `,
        link: 'hotwheels.html',
        linkLabel: 'Shop Now →'
    },
];

function renderNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    NEWS.forEach(n => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <div class="news-img">
                <span class="news-cat ${n.cat}">${n.catLabel}</span>
                <img src="${n.img}" alt="${n.title}" onerror="this.style.opacity='0.2'">
            </div>
            <div class="news-body">
                <p class="news-date">${n.date}</p>
                <p class="news-title">${n.title}</p>
                <p class="news-desc">${n.desc}</p>
                <a href="${n.link}" class="news-action">${n.linkLabel}</a>
            </div>`;
        grid.appendChild(card);
    });
}

// ══════════════════════════════════════════════════════
//  NEW DROPS BANNER (index only)
// ══════════════════════════════════════════════════════
function initDrops() {
    if (sessionStorage.getItem('dropsDismissed')) {
        const bar  = document.getElementById('dropsBar');
        const hero = document.getElementById('heroSection');
        if (bar)  bar.classList.add('hidden');
        if (hero) hero.classList.remove('with-banner');
    }
}

function dismissDrops() {
    const bar  = document.getElementById('dropsBar');
    const hero = document.getElementById('heroSection');
    if (bar)  bar.classList.add('hidden');
    if (hero) hero.classList.remove('with-banner');
    sessionStorage.setItem('dropsDismissed', '1');
}

// ══════════════════════════════════════════════════════
//  FEATURED PRODUCTS (index only)
//  FIX: falls back to fetching products.json when
//  localStorage is empty (common on mobile / fresh visits)
// ══════════════════════════════════════════════════════
const FEATURED_LIMIT = 4;

function buildFeatCard(p) {
    const qty      = parseInt(p.quantity);
    const isSoldOut = qty <= 0;
    const isLow     = !isSoldOut && qty <= 3;
    const card = document.createElement('div');
    card.className = 'feat-card';
    card.onclick = () => window.location.href = `product-details.html?id=${p.id}`;
    card.innerHTML = `
        <div class="feat-img">
            ${isSoldOut ? `<span class="feat-sold-badge">Sold Out</span>` : ''}
            ${isLow     ? `<span class="feat-low-badge">Only ${qty} left</span>` : ''}
            <img src="${p.image}" alt="${p.name}" ${isSoldOut ? 'class="grayscale"' : ''} onerror="this.style.opacity='0.2'">
        </div>
        <div class="feat-body">
            <p class="feat-series">${p.series || ''}</p>
            <p class="feat-name">${p.name}</p>
            <p class="feat-price">₱${p.price}</p>
        </div>`;
    return card;
}

function renderFeatured(category, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    // Try localStorage first
    const cached = JSON.parse(localStorage.getItem('allProducts'));
    if (cached && cached.length > 0) {
        _populateFeatured(cached, category, el);
        return;
    }

    // Fallback: fetch from products.json (works on mobile / cold visits)
    fetch('products.json')
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(data => {
            localStorage.setItem('allProducts', JSON.stringify(data));
            _populateFeatured(data, category, el);
        })
        .catch(() => {
            el.innerHTML = `<p class="feat-empty">No products yet — check back soon.</p>`;
        });
}

function _populateFeatured(allProducts, category, el) {
    const items = allProducts.filter(p => p.category === category).slice(0, FEATURED_LIMIT);
    if (items.length === 0) {
        el.innerHTML = `<p class="feat-empty">No products yet — check back soon.</p>`;
        return;
    }
    items.forEach(p => el.appendChild(buildFeatCard(p)));
}