// Data storage and management for POS system

const STAFF_CREDENTIALS = [
    {
        username: "staff1",
        password: "staff123"
    },
    {
        username: "staff2",
        password: "staff456"
    }
];

// Admin credentials
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123" // In a real application, this would be hashed
};

// Sample initial data
const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: "Apple",
        category: "Fruits & Vegetables",
        price: 2.99,
        stock: 50,
        description: "Fresh red apples",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        name: "Milk",
        category: "Dairy & Eggs",
        price: 3.49,
        stock: 30,
        description: "Whole milk 1 gallon",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        name: "Bread",
        category: "Bakery",
        price: 2.49,
        stock: 5,
        description: "Whole wheat bread",
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        name: "Chicken Breast",
        category: "Meat & Poultry",
        price: 8.99,
        stock: 25,
        description: "Boneless chicken breast",
        createdAt: new Date().toISOString()
    }
];

// New initial roles data
const INITIAL_ROLES = [
    {
        id: 1,
        name: "Admin",
        description: "Full access to all features"
    },
    {
        id: 2,
        name: "Staff",
        description: "Limited access to sales and inventory"
    }
];

const INITIAL_SALES = [
    {
        id: "T001",
        date: new Date('2024-01-15T10:30:00').toISOString(),
        products: [
            { name: "Apple", quantity: 2, price: 2.99 },
            { name: "Milk", quantity: 1, price: 3.49 }
        ],
        totalAmount: 9.47,
        paymentMethod: "Cash"
    },
    {
        id: "T002",
        date: new Date('2024-01-15T14:45:00').toISOString(),
        products: [
            { name: "Bread", quantity: 1, price: 2.49 },
            { name: "Chicken Breast", quantity: 2, price: 8.99 }
        ],
        totalAmount: 20.47,
        paymentMethod: "Card"
    }
];

// Data storage functions
class DataManager {
    constructor() {
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify(INITIAL_PRODUCTS));
        }
        if (!localStorage.getItem('sales')) {
            localStorage.setItem('sales', JSON.stringify(INITIAL_SALES));
        }
        if (!localStorage.getItem('activities')) {
            localStorage.setItem('activities', JSON.stringify([]));
        }
        if (!localStorage.getItem('roles')) {
            localStorage.setItem('roles', JSON.stringify(INITIAL_ROLES));
        }
    }

    // Product management
    getProducts() {
        return JSON.parse(localStorage.getItem('products') || '[]');
    }

    addProduct(product) {
        const products = this.getProducts();
        const newProduct = {
            ...product,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        
        // Add activity
        this.addActivity(`Added product: ${product.name}`);
        return newProduct;
    }

    updateProduct(id, updates) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            const oldProduct = products[index];
            products[index] = { ...oldProduct, ...updates };
            localStorage.setItem('products', JSON.stringify(products));
            
            // Add activity
            this.addActivity(`Updated product: ${oldProduct.name}`);
            return products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            const deletedProduct = products[index];
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            
            // Add activity
            this.addActivity(`Deleted product: ${deletedProduct.name}`);
            return true;
        }
        return false;
    }

    // Roles management
    getRoles() {
        return JSON.parse(localStorage.getItem('roles') || '[]');
    }

    addRole(role) {
        const roles = this.getRoles();
        const newRole = {
            ...role,
            id: Date.now()
        };
        roles.push(newRole);
        localStorage.setItem('roles', JSON.stringify(roles));
        this.addActivity(`Added role: ${role.name}`);
        return newRole;
    }

    updateRole(id, updates) {
        const roles = this.getRoles();
        const index = roles.findIndex(r => r.id === id);
        if (index !== -1) {
            const oldRole = roles[index];
            roles[index] = { ...oldRole, ...updates };
            localStorage.setItem('roles', JSON.stringify(roles));
            this.addActivity(`Updated role: ${oldRole.name}`);
            return roles[index];
        }
        return null;
    }

    deleteRole(id) {
        const roles = this.getRoles();
        const index = roles.findIndex(r => r.id === id);
        if (index !== -1) {
            const deletedRole = roles[index];
            roles.splice(index, 1);
            localStorage.setItem('roles', JSON.stringify(roles));
            this.addActivity(`Deleted role: ${deletedRole.name}`);
            return true;
        }
        return false;
    }

    // Sales management
    getSales() {
        return JSON.parse(localStorage.getItem('sales') || '[]');
    }

    addSale(sale) {
        const sales = this.getSales();
        const newSale = {
            ...sale,
            id: `T${String(sales.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString()
        };
        sales.unshift(newSale); // Add to beginning for recent first
        localStorage.setItem('sales', JSON.stringify(sales));
        
        // Add activity
        this.addActivity(`New sale: $${sale.totalAmount.toFixed(2)}`);
        return newSale;
    }

    // Activities management
    getActivities() {
        return JSON.parse(localStorage.getItem('activities') || '[]');
    }

    addActivity(message) {
        const activities = this.getActivities();
        activities.unshift({
            message,
            timestamp: new Date().toISOString()
        });
        // Keep only last 10 activities
        if (activities.length > 10) {
            activities.pop();
        }
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    // Statistics
    getStatistics() {
        const products = this.getProducts();
        const sales = this.getSales();
        
        const totalProducts = products.length;
        const totalSales = sales.length;
        const lowStockItems = products.filter(p => p.stock < 10).length;
        const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
        
        return {
            totalProducts,
            totalSales,
            lowStockItems,
            totalRevenue
        };
    }

    // Search products
    searchProducts(query) {
        const products = this.getProducts();
        if (!query) return products;
        
        return products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Authentication
    authenticate(username, password) {
        const isAdmin = username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
        const isStaff = STAFF_CREDENTIALS.some(staff => staff.username === username && staff.password === password);
        return isAdmin || isStaff;
    }
}

// Create global instance
const dataManager = new DataManager();
