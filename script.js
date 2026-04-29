document.addEventListener("DOMContentLoaded", () => {

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

    
    function loadUser() {
        const user = JSON.parse(localStorage.getItem("user"));
        const loggedIn = localStorage.getItem("loggedIn");
        const authSection = document.getElementById("authSection");

        if (!authSection) return;

        if (user && loggedIn === "true") {
            authSection.innerHTML = `
                <span class="nav-button">Hi, ${user.fullname || user.username}</span>
                <a href="account.html" class="nav-button">View Account</a>
                <a href="#" id="logoutBtn" class="nav-button">Logout</a>
            `;

            document.getElementById("logoutBtn").addEventListener("click", function(e) {
                e.preventDefault();
                logout();
            });

        } else {
            authSection.innerHTML = `
                <a href="login.html" class="nav-button">Login</a>
                <a href="signup.html" class="nav-button">Sign Up</a>
            `;
        }
    }

    function logout() {
    localStorage.removeItem('user');
    window.location.replace("login.html");
}

    function loadAccount() {
        const user = JSON.parse(localStorage.getItem("user"));
        const loggedIn = localStorage.getItem("loggedIn");
        const accountName = document.getElementById("accountName");

        if (!accountName) return;

        if (user && loggedIn === "true") {
            accountName.innerHTML = `
                <b>Full Name:</b> ${user.fullname}<br>
                <b>Username:</b> ${user.username}<br>
                <b>Country:</b> ${user.country}<br>
                <b>Region:</b> ${user.region}<br>
                <b>City:</b> ${user.city}<br>
                <b>Address:</b> ${user.address}<br>
                <b>Zip Code:</b> ${user.zipcode}<br>
                <b>Contact:</b> ${user.contact}
            `;
        } else {
        }
    }
    loadUser();
    loadAccount();
});

function handleSearch(event) {
    if (event.key === "Enter") executeSearch();
}

function executeSearch() {
    const query = document.getElementById('site-search').value.toLowerCase();
    if (query) {
        window.location.href = `hotwheels.html?search=${query}`;
    }
}

function loadSuggestions() {
    const cars = [
        { name: "Toyota Supra", price: "250", img: "https://example.com/supra.jpg" },
        { name: "Mazda RX-7", price: "230", img: "https://example.com/rx7.jpg" },
        { name: "Honda Civic Type R", price: "210", img: "https://example.com/civic.jpg" }
    ];

    const box = document.getElementById('suggestion-box');
    if (!box) return;

    cars.forEach(car => {
        box.innerHTML += `
            <a href="product-details.html?name=${car.name}&price=${car.price}&img=${car.img}" class="suggest-card">
                <img src="${car.img}">
                <h5>${car.name}</h5>
                <p style="color:#e60000">₱${car.price}</p>
            </a>
        `;
    });
}

function executeSearch() {
    const query = document.getElementById('site-search').value.toLowerCase().trim();
    if (query) {
        window.location.href = `hotwheels.html?search=${encodeURIComponent(query)}`;
    }
}

function handleSearch(event) {
    if (event.key === "Enter") executeSearch();
}
