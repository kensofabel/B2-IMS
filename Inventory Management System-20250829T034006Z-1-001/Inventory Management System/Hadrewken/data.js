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

// Initial data
const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: "Apple",
        category: "Fruits & Vegetables",
        price: 2.99,
        stock: 50,
        description: "Fresh red apples",
        sku: "FRT-APP-001",
        brand: "Fresh Farms",
        supplier: "Local Orchard Co.",
        barcode: "123456789012",
        variants: [
            { name: "Red Delicious", price: 2.99, stock: 30 },
            { name: "Granny Smith", price: 3.19, stock: 20 }
        ],
        reorderPoint: 20,
        lowStockThreshold: 15,
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        name: "Milk",
        category: "Dairy & Eggs",
        price: 3.49,
        stock: 30,
        description: "Whole milk 1 gallon",
        sku: "DRY-MIL-001",
        brand: "Dairy Best",
        supplier: "Fresh Dairy Farms",
        barcode: "123456789013",
        variants: [
            { name: "Whole Milk", price: 3.49, stock: 20 },
            { name: "2% Milk", price: 3.29, stock: 10 }
        ],
        reorderPoint: 15,
        lowStockThreshold: 12,
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        name: "Bread",
        category: "Bakery",
        price: 2.49,
        stock: 5,
        description: "Whole wheat bread",
        sku: "BAK-BRD-001",
        brand: "Golden Grain",
        supplier: "Bakery Supply Co.",
        barcode: "123456789014",
        variants: [
            { name: "Whole Wheat", price: 2.49, stock: 3 },
            { name: "White Bread", price: 2.29, stock: 2 }
        ],
        reorderPoint: 10,
        lowStockThreshold: 8,
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        name: "Chicken Breast",
        category: "Meat & Poultry",
        price: 8.99,
        stock: 25,
        description: "Boneless chicken breast",
        sku: "MEA-CHK-001",
        brand: "Premium Poultry",
        supplier: "Meat Packers Inc.",
        barcode: "123456789015",
        variants: [
            { name: "Boneless", price: 8.99, stock: 15 },
            { name: "Bone-in", price: 7.99, stock: 10 }
        ],
        reorderPoint: 12,
        lowStockThreshold: 10,
        createdAt: new Date().toISOString()
    }
];

// Initial roles data
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

// Initial permissions data
const INITIAL_PERMISSIONS = [
    {
        id: 1,
        name: "Dashboard Access",
        description: "Access to dashboard and statistics",
        module: "dashboard"
    },
    {
        id: 2,
        name: "Inventory Management",
        description: "View and manage inventory",
        module: "inventory"
    },
    {
        id: 3,
        name: "Add Products",
        description: "Add new products to inventory",
        module: "products"
    },
    {
        id: 4,
        name: "Edit Products",
        description: "Edit existing products",
        module: "products"
    },
    {
        id: 5,
        name: "Delete Products",
        description: "Delete products from inventory",
        module: "products"
    },
    {
        id: 6,
        name: "Sales Processing",
        description: "Process sales transactions",
        module: "sales"
    },
    {
        id: 7,
        name: "View Sales Reports",
        description: "Access sales reports",
        module: "reports"
    },
    {
        id: 8,
        name: "View Inventory Reports",
        description: "Access inventory reports",
        module: "reports"
    },
    {
        id: 9,
        name: "Manage Roles",
        description: "Create and manage user roles",
        module: "roles"
    },
    {
        id: 10,
        name: "Set Permissions",
        description: "Assign permissions to roles",
        module: "permissions"
    },
    {
        id: 11,
        name: "Employee Management",
        description: "Manage employee accounts",
        module: "employees"
    },
    {
        id: 12,
        name: "Audit Logs Access",
        description: "View system audit logs",
        module: "audit"
    }
];

// Initial role-permissions mapping
const INITIAL_ROLE_PERMISSIONS = [
    {
        roleId: 1, // Admin
        permissionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // All permissions
    },
    {
        roleId: 2, // Staff
        permissionIds: [1, 2, 6, 7, 8] // Limited permissions
    }
];

// Initial employees data
const INITIAL_EMPLOYEES = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@company.com",
        role: "Admin",
        hireDate: new Date('2023-01-15').toISOString(),
        status: "Active",
        phone: "+1-555-0123"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@company.com",
        role: "Staff",
        hireDate: new Date('2023-03-20').toISOString(),
        status: "Active",
        phone: "+1-555-0456"
    }
];

// Initial audit logs data
const INITIAL_AUDIT_LOGS = [
    {
        id: 1,
        timestamp: new Date('2024-01-15T09:00:00').toISOString(),
        user: "admin",
        action: "Login",
        details: "User logged into the system",
        type: "login",
        ipAddress: "192.168.1.100"
    },
    {
        id: 2,
        timestamp: new Date('2024-01-15T09:15:00').toISOString(),
        user: "admin",
        action: "Add Product",
        details: "Added new product: Apple",
        type: "product",
        ipAddress: "192.168.1.100"
    },
    {
        id: 3,
        timestamp: new Date('2024-01-15T10:30:00').toISOString(),
        user: "staff1",
        action: "Sale Transaction",
        details: "Processed sale T001 for $9.47",
        type: "sales",
        ipAddress: "192.168.1.101"
    },
    {
        id: 4,
        timestamp: new Date('2024-01-15T14:45:00').toISOString(),
        user: "staff2",
        action: "Sale Transaction",
        details: "Processed sale T002 for $20.47",
        type: "sales",
        ipAddress: "192.168.1.102"
    },
    {
        id: 5,
        timestamp: new Date('2024-01-15T16:00:00').toISOString(),
        user: "admin",
        action: "Update Product",
        details: "Updated product: Bread stock from 10 to 5",
        type: "inventory",
        ipAddress: "192.168.1.100"
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
        if (!localStorage.getItem('permissions')) {
            localStorage.setItem('permissions', JSON.stringify(INITIAL_PERMISSIONS));
        }
        if (!localStorage.getItem('rolePermissions')) {
            localStorage.setItem('rolePermissions', JSON.stringify(INITIAL_ROLE_PERMISSIONS));
        }
        if (!localStorage.getItem('auditLogs')) {
            localStorage.setItem('auditLogs', JSON.stringify(INITIAL_AUDIT_LOGS));
        }
        if (!localStorage.getItem('employees')) {
            localStorage.setItem('employees', JSON.stringify(INITIAL_EMPLOYEES));
        }
        if (!localStorage.getItem('settings')) {
            const defaultSettings = {
                businessName: 'My Business',
                currencySymbol: '$',
                taxRate: 8,
                lowStockThreshold: 10,
                discounts: 0,
                paymentTypes: 'Cash, Card, Credit',
                debugMode: 'false',
                performanceMonitoring: 'false',
                databaseOptimization: 'auto',
                maintenanceSchedule: 'weekly',
                customFields: {"product": [], "customer": []},
                workflowAutomation: 'false'
            };
            localStorage.setItem('settings', JSON.stringify(defaultSettings));
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

    // Permissions management
    getPermissions() {
        return JSON.parse(localStorage.getItem('permissions') || '[]');
    }

    getRolePermissions() {
        return JSON.parse(localStorage.getItem('rolePermissions') || '[]');
    }

    getPermissionsByRole(roleId) {
        const rolePermissions = this.getRolePermissions();
        const rolePermission = rolePermissions.find(rp => rp.roleId === roleId);
        return rolePermission ? rolePermission.permissionIds : [];
    }

    updateRolePermissions(roleId, permissionIds) {
        const rolePermissions = this.getRolePermissions();
        const index = rolePermissions.findIndex(rp => rp.roleId === roleId);

        if (index !== -1) {
            rolePermissions[index].permissionIds = permissionIds;
        } else {
            rolePermissions.push({ roleId, permissionIds });
        }

        localStorage.setItem('rolePermissions', JSON.stringify(rolePermissions));
        const role = this.getRoles().find(r => r.id === roleId);
        this.addActivity(`Updated permissions for role: ${role ? role.name : 'Unknown'}`);
        return true;
    }

    // Employee management
    getEmployees() {
        return JSON.parse(localStorage.getItem('employees') || '[]');
    }

    addEmployee(employee) {
        const employees = this.getEmployees();
        const newEmployee = {
            ...employee,
            id: Date.now(),
            hireDate: new Date().toISOString()
        };
        employees.push(newEmployee);
        localStorage.setItem('employees', JSON.stringify(employees));
        this.addActivity(`Added employee: ${employee.name}`);
        return newEmployee;
    }

    updateEmployee(id, updates) {
        const employees = this.getEmployees();
        const index = employees.findIndex(e => e.id === id);
        if (index !== -1) {
            const oldEmployee = employees[index];
            employees[index] = { ...oldEmployee, ...updates };
            localStorage.setItem('employees', JSON.stringify(employees));
            this.addActivity(`Updated employee: ${oldEmployee.name}`);
            return employees[index];
        }
        return null;
    }

    deleteEmployee(id) {
        const employees = this.getEmployees();
        const index = employees.findIndex(e => e.id === id);
        if (index !== -1) {
            const deletedEmployee = employees[index];
            employees.splice(index, 1);
            localStorage.setItem('employees', JSON.stringify(employees));
            this.addActivity(`Deleted employee: ${deletedEmployee.name}`);
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

    // Audit logs management
    getAuditLogs() {
        return JSON.parse(localStorage.getItem('auditLogs') || '[]');
    }

    addAuditLog(log) {
        const auditLogs = this.getAuditLogs();
        const newLog = {
            ...log,
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        auditLogs.unshift(newLog); // Add to beginning for recent first
        // Keep only last 100 audit logs
        if (auditLogs.length > 100) {
            auditLogs.splice(100);
        }
        localStorage.setItem('auditLogs', JSON.stringify(auditLogs));
        return newLog;
    }

    // Settings management
    getSettings() {
        return JSON.parse(localStorage.getItem('settings') || '{}');
    }

    updateSettings(newSettings) {
        localStorage.setItem('settings', JSON.stringify(newSettings));
        this.addActivity('Settings updated');
        return true;
    }

    resetSettings() {
        const defaultSettings = {
            businessName: 'My Business',
            currencySymbol: '$',
            taxRate: 8,
            lowStockThreshold: 10,
            discounts: 0,
            paymentTypes: 'Cash, Card, Credit',
            debugMode: 'false',
            performanceMonitoring: 'false',
            databaseOptimization: 'auto',
            maintenanceSchedule: 'weekly',
            customFields: {"product": [], "customer": []},
            workflowAutomation: 'false'
        };
        localStorage.setItem('settings', JSON.stringify(defaultSettings));
        this.addActivity('Settings reset to defaults');
        return defaultSettings;
    }

    clearSettings() {
        localStorage.setItem('settings', JSON.stringify({}));
        this.addActivity('All settings content cleared');
        return {};
    }

    // Authentication with employee status check
    authenticate(username, password) {
        // Check admin credentials
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            return { authenticated: true, role: 'Admin', user: 'admin' };
        }

        // Check staff credentials
        const staffCredential = STAFF_CREDENTIALS.find(staff => staff.username === username && staff.password === password);
        if (staffCredential) {
            // Find corresponding employee record
            const employees = this.getEmployees();
            const employee = employees.find(emp => emp.email === username || emp.name.toLowerCase().replace(' ', '.') === username);

            if (employee) {
                // Check if employee is active
                if (employee.status !== 'Active') {
                    return { authenticated: false, reason: 'Employee account is inactive' };
                }
                return { authenticated: true, role: employee.role, user: employee.name, employeeId: employee.id };
            } else {
                return { authenticated: false, reason: 'Employee record not found' };
            }
        }

        return { authenticated: false, reason: 'Invalid credentials' };
    }
}

// Create global instance
const dataManager = new DataManager();
