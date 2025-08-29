// Main JavaScript functionality for POS system

class POSSystem {
    constructor() {
        this.currentSection = 'dashboard';
        this.cart = []; // Initialize cart array
        this.initializeEventListeners();
        this.checkAuthentication();
        this.disableZoom();
    }

    disableZoom() {
        // Prevent zooming using various methods
        document.addEventListener('wheel', function(e) {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        }, { passive: false });

        // Prevent pinch zoom on touch devices
        document.addEventListener('touchmove', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        // Prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });

        // Disable browser zoom shortcuts
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey === true || e.metaKey === true) && 
                (e.key === '+' || e.key === '-' || e.key === '=' || e.keyCode === 187 || e.keyCode === 189)) {
                e.preventDefault();
            }
        });
    }

    initializeEventListeners() {
        // POS search functionality
        const posSearchInput = document.getElementById('pos-search');
        if (posSearchInput) {
            posSearchInput.addEventListener('input', (e) => this.searchProductsForPOS(e));
        }
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Add product form
        const addProductForm = document.getElementById('add-product-form');
        if (addProductForm) {
            addProductForm.addEventListener('submit', (e) => this.handleAddProduct(e));
        }

        // Search functionality
        const searchInput = document.getElementById('search-inventory');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e));
        }
    }

    checkAuthentication() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentPage = window.location.pathname.split('/').pop();
        
        if (currentPage === 'dashboard.html' && !isLoggedIn) {
            window.location.href = 'index.html';
        } else if (currentPage === 'index.html' && isLoggedIn) {
            window.location.href = 'dashboard.html';
        }

        if (isLoggedIn && currentPage === 'dashboard.html') {
            this.loadDashboard();
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        try {
            const isAuthenticated = await dataManager.authenticate(username, password);
            if (isAuthenticated) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Invalid username or password';
                this.showToast('Invalid credentials', 'error');
            }
        } catch (error) {
            errorMessage.textContent = 'Authentication error occurred';
            this.showToast('Authentication error', 'error');
        }
    }

    logout() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(`${sectionId}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.nav-item[href="#${sectionId}"]`).classList.add('active');

        this.currentSection = sectionId;

        // Load section-specific data
        switch(sectionId) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'inventory':
                this.loadInventory();
                break;
            case 'sales':
                this.loadSales();
                break;
            case 'pos':
                this.loadPOS();
                break;
        }
    }

    loadPOS() {
        // Load products for POS
        this.loadProductsForPOS();
    }

    searchProductsForPOS(e) {
        const query = e.target.value.toLowerCase();
        const products = dataManager.getProducts();
        const productGrid = document.getElementById('product-grid');
        
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        
        productGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-item" onclick="addToCart(${product.id})">
                <h4>${product.name}</h4>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Stock: ${product.stock}</p>
            </div>
        `).join('');
    }

    loadProductsForPOS() {
        const products = dataManager.getProducts();
        const productGrid = document.getElementById('product-grid');
        
        productGrid.innerHTML = products.map(product => `
            <div class="product-item" onclick="addToCart(${product.id})">
                <h4>${product.name}</h4>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Stock: ${product.stock}</p>
            </div>
        `).join('');
    }

    loadDashboard() {
        const stats = dataManager.getStatistics();
        
        // Update statistics
        document.getElementById('total-products').textContent = stats.totalProducts;
        document.getElementById('total-sales').textContent = stats.totalSales;
        document.getElementById('low-stock').textContent = stats.lowStockItems;
        document.getElementById('total-revenue').textContent = `$${stats.totalRevenue.toFixed(2)}`;

        // Load activities
        this.loadActivities();
    }

    addToCart(productId) {
        const product = dataManager.getProducts().find(p => p.id === productId);
        if (product) {
            this.cart.push(product);
            this.updateCart();
        }
    }

    updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `).join('');

        this.updateCartSummary();
    }

    updateCartSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + item.price, 0);
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    loadActivities() {
        const activities = dataManager.getActivities();
        const activitiesList = document.getElementById('activities-list');
        
        activitiesList.innerHTML = activities.length > 0 
            ? activities.map(activity => `
                <div class="activity-item">
                    <p>${activity.message} - ${this.formatDate(activity.timestamp)}</p>
                </div>
            `).join('')
            : '<p>No recent activities</p>';
    }

    processPayment(method) {
        const total = this.cart.reduce((sum, item) => sum + item.price, 0);
        const sale = {
            products: this.cart,
            totalAmount: total,
            paymentMethod: method
        };
        dataManager.addSale(sale);
        this.cart = []; // Clear cart after payment
        this.updateCart();
        this.showToast('Payment processed successfully!', 'success');
    }

    clearCart() {
        this.cart = [];
        this.updateCart();
    }

    loadInventory() {
        const products = dataManager.getProducts();
        const tableBody = document.getElementById('inventory-table-body');
        
        tableBody.innerHTML = products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <span class="status-badge ${
                        product.stock === 0 ? 'status-out-of-stock' :
                        product.stock < 10 ? 'status-low-stock' : 'status-in-stock'
                    }">
                        ${product.stock === 0 ? 'Out of Stock' :
                          product.stock < 10 ? 'Low Stock' : 'In Stock'}
                    </span>
                </td>
                <td class="action-buttons">
                    <button class="btn btn-edit" onclick="posSystem.editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-delete" onclick="posSystem.deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }

    handleSearch(e) {
        const query = e.target.value;
        const products = dataManager.searchProducts(query);
        const tableBody = document.getElementById('inventory-table-body');
        
        tableBody.innerHTML = products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <span class="status-badge ${
                        product.stock === 0 ? 'status-out-of-stock' :
                        product.stock < 10 ? 'status-low-stock' : 'status-in-stock'
                    }">
                        ${product.stock === 0 ? 'Out of Stock' :
                          product.stock < 10 ? 'Low Stock' : 'In Stock'}
                    </span>
                </td>
                <td class="action-buttons">
                    <button class="btn btn-edit" onclick="posSystem.editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-delete" onclick="posSystem.deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }

    handleAddProduct(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Input validation
        const name = formData.get('name').trim();
        const category = formData.get('category');
        const price = parseFloat(formData.get('price'));
        const stock = parseInt(formData.get('stock'));
        const description = formData.get('description').trim();

        // Validate required fields
        if (!name) {
            this.showToast('Product name is required', 'error');
            return;
        }

        if (!category) {
            this.showToast('Category is required', 'error');
            return;
        }

        if (isNaN(price) || price <= 0) {
            this.showToast('Price must be a positive number', 'error');
            return;
        }

        if (isNaN(stock) || stock < 0) {
            this.showToast('Stock must be a non-negative number', 'error');
            return;
        }

        const product = {
            name,
            category,
            price,
            stock,
            description
        };

        try {
            dataManager.addProduct(product);
            e.target.reset();
            this.showToast('Product added successfully!', 'success');
            this.loadInventory();
            this.loadDashboard(); // Refresh stats
        } catch (error) {
            this.showToast('Error adding product', 'error');
        }
    }

    editProduct(id) {
        const products = dataManager.getProducts();
        const product = products.find(p => p.id === id);
        
        if (product) {
            const newName = prompt('Enter new product name:', product.name);
            const newPrice = prompt('Enter new price:', product.price);
            const newStock = prompt('Enter new stock quantity:', product.stock);
            
            if (newName && newPrice && newStock) {
                // Input validation
                const name = newName.trim();
                const price = parseFloat(newPrice);
                const stock = parseInt(newStock);
                
                if (!name) {
                    this.showToast('Product name is required', 'error');
                    return;
                }
                
                if (isNaN(price) || price <= 0) {
                    this.showToast('Price must be a positive number', 'error');
                    return;
                }
                
                if (isNaN(stock) || stock < 0) {
                    this.showToast('Stock must be a non-negative number', 'error');
                    return;
                }
                
                const updates = {
                    name,
                    price,
                    stock
                };
                
                dataManager.updateProduct(id, updates);
                this.showToast('Product updated successfully!', 'success');
                this.loadInventory();
                this.loadDashboard();
            }
        }
    }

    deleteProduct(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            const success = dataManager.deleteProduct(id);
            if (success) {
                this.showToast('Product deleted successfully!', 'success');
                this.loadInventory();
                this.loadDashboard();
            } else {
                this.showToast('Error deleting product', 'error');
            }
        }
    }

    loadSales() {
        const sales = dataManager.getSales();
        const tableBody = document.getElementById('sales-table-body');
        
        tableBody.innerHTML = sales.length > 0 
            ? sales.map(sale => `
                <tr>
                    <td>${sale.id}</td>
                    <td>${this.formatDate(sale.date)}</td>
                    <td>
                        ${sale.products.map(p => 
                            `${p.quantity}x ${p.name} ($${p.price.toFixed(2)} each)`
                        ).join('<br>')}
                    </td>
                    <td>$${sale.totalAmount.toFixed(2)}</td>
                    <td>${sale.paymentMethod}</td>
                </tr>
            `).join('')
            : '<tr><td colspan="5" style="text-align: center;">No sales recorded yet</td></tr>';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    showToast(message, type = 'info') {
        // Remove existing toasts
        document.querySelectorAll('.toast').forEach(toast => toast.remove());
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize the system
const posSystem = new POSSystem();

// Global functions for HTML onclick handlers
function showSection(sectionId) {
    posSystem.showSection(sectionId);
}

function logout() {
    posSystem.logout();
}

// Initialize dashboard when page loads
if (window.location.pathname.endsWith('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        posSystem.showSection('dashboard');
    });
}

// Global function for HTML onclick handlers
function addToCart(productId) {
    posSystem.addToCart(productId);
}
