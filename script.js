document.addEventListener("DOMContentLoaded", () => {
    // Input restriction for Name (A-Z only)
    const nameInput = document.getElementById("fullname") || document.getElementById("signup-fullname");
    if (nameInput) {
        nameInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        });
    }

    window.toggleMenu = function () {
        document.querySelector(".nav-menu")?.classList.toggle("active");
    };

    const sortSelect = document.getElementById("sort");
    const container = document.querySelector(".products");

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

    loadUser();
});

// GLOBAL WISHLIST FUNCTION
function addToWishlist(id, name, price, img) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.find(item => item.name === name);
    
    if (exists) {
        alert(name + " is already in your wishlist!");
        return;
    }

    wishlist.push({ id, name, price, img });
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(name + " added to Wishlist! ❤️🏁");
}

function loadUser() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const loggedIn = localStorage.getItem("loggedIn");
    const authSection = document.getElementById("authSection");

    if (!authSection) return;

    if (user && loggedIn === "true") {
        authSection.innerHTML = `
            <li class="nav-item"><span class="nav-button" style="color: #e60000; font-weight: bold;">HI, ${user.username.toUpperCase()}</span></li>
            <li class="nav-item"><a href="account.html" class="nav-button">ACCOUNT</a></li>
            <li class="nav-item"><a href="#" onclick="logout()" class="nav-button">LOGOUT</a></li>
        `;
    } else {
        authSection.innerHTML = `
            <li class="nav-item"><a href="login.html" class="nav-button">LOGIN</a></li>
            <li class="nav-item"><a href="signup.html" class="nav-button">SIGN UP</a></li>
        `;
    }
}

function logout() {
    if(confirm("Are you sure?")) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loggedIn');
        window.location.replace("index.html");
    }
}

function handleSearch(event) {
    if (event.key === "Enter") executeSearch();
}

function executeSearch() {
    const searchInput = document.getElementById('site-search');
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        window.location.href = `hotwheels.html?search=${encodeURIComponent(query)}`;
    }
}