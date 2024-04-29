let wishlistItems = [
    { id: 1, name: "Product 1", price: 799 },
    { id: 2, name: "Product 2", price: 2990 },
    { id: 3, name: "Product 3", price: 3120 }
];

// Function to display wishlist items
function displayWishlistItems() {
    const wishlistContainer = document.getElementById("wishlist-items");
    wishlistContainer.innerHTML = ""; // Clear previous content

    wishlistItems.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card">
                <img src="product${item.id}.jpg" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">₹${item.price.toFixed(2)}</p>
                    <button class="btn btn-danger" onclick="removeFromWishlist(${item.id})">Remove</button>
                </div>
            </div>
        `;
        wishlistContainer.appendChild(card);
    });
}

// Function to remove item from wishlist
function removeFromWishlist(itemId) {
    wishlistItems = wishlistItems.filter(item => item.id !== itemId);
    displayWishlistItems(); // Refresh wishlist display
}

// Display initial wishlist items
displayWishlistItems();