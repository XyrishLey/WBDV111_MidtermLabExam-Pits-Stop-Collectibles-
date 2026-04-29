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
        localStorage.removeItem('loggedIn');
        window.location.replace("index.html");
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
        }
    }

    loadUser();
    loadAccount();
    if (document.getElementById('suggestion-box')) {
        loadSuggestions();
    }
});

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

function loadSuggestions() {
    const cars = [
        { name: "Toyota Supra", price: "250", img: "https://raw.githubusercontent.com/XyrishLey/WBDV111_MidtermLabExam-Pits-Stop-Collectibles-/refs/heads/main/IMAGES/HOTWHEELS/skyline%202.jpg" },
        { name: "Mazda RX-7", price: "230", img: "https://raw.githubusercontent.com/XyrishLey/WBDV111_MidtermLabExam-Pits-Stop-Collectibles-/refs/heads/main/IMAGES/HOTWHEELS/ford%20gt.jpg" },
        { name: "Honda Civic Type R", price: "210", img: "https://raw.githubusercontent.com/XyrishLey/WBDV111_MidtermLabExam-Pits-Stop-Collectibles-/refs/heads/main/IMAGES/HOTWHEELS/2018%20type%20r.jpg" }
    ];

    const box = document.getElementById('suggestion-box');
    if (!box) return;

    box.innerHTML = "";
    cars.forEach(car => {
        box.innerHTML += `
            <a href="product-details.html?name=${encodeURIComponent(car.name)}&price=${car.price}&img=${encodeURIComponent(car.img)}" class="suggest-card">
                <img src="${car.img}">
                <h5>${car.name}</h5>
                <p style="color:#e60000">₱${car.price}</p>
            </a>
        `;
    });
}
