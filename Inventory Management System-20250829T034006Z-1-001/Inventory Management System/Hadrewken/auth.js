// Authentication related functions

// Employee management functions
function addEmployee() {
    showAddEmployeeForm();
}

function manageEmployees() {
    const modal = document.getElementById('employee-modal');
    if (modal) {
        modal.style.display = 'block';
        loadEmployees();
    }
}

function closeEmployeeModal() {
    const modal = document.getElementById('employee-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showAddEmployeeForm() {
    const formModal = document.getElementById('employee-form-modal');
    const formTitle = document.getElementById('employee-form-title');
    const form = document.getElementById('employee-form');

    if (formModal && formTitle && form) {
        formTitle.textContent = 'Add Employee';
        form.reset();
        form.removeAttribute('data-editing-id');
        formModal.style.display = 'block';
    }
}

function closeEmployeeFormModal() {
    const modal = document.getElementById('employee-form-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function loadEmployees() {
    const employees = dataManager.getEmployees();
    const employeesList = document.getElementById('employees-list');

    if (employeesList) {
        employeesList.innerHTML = employees.length > 0
            ? employees.map(employee => `
                <div class="employee-item">
                    <div class="employee-info">
                        <h3>${employee.name}</h3>
                        <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Role:</strong> ${employee.role}</p>
            <p><strong>Status:</strong> <span class="status-${employee.status.toLowerCase()}">${employee.status}</span></p>
            <p><strong>Hire Date:</strong> ${posSystem.formatDate(employee.hireDate)}</p>
                    </div>
                    <div class="employee-actions">
                        <button class="btn btn-edit" onclick="editEmployee(${employee.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-delete" onclick="deleteEmployee(${employee.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `).join('')
            : '<p>No employees found. Click "Add New Employee" to create your first employee record.</p>';
    }
}

function editEmployee(id) {
    const employees = dataManager.getEmployees();
    const employee = employees.find(e => e.id === id);

    if (employee) {
        const formModal = document.getElementById('employee-form-modal');
        const formTitle = document.getElementById('employee-form-title');
        const form = document.getElementById('employee-form');

        if (formModal && formTitle && form) {
            formTitle.textContent = 'Edit Employee';
            form.setAttribute('data-editing-id', id);

            // Populate form fields in arranged order
            document.getElementById('employee-name').value = employee.name;
            document.getElementById('employee-email').value = employee.email;
            document.getElementById('employee-phone').value = employee.phone;
            document.getElementById('employee-role').value = employee.role;
            document.getElementById('employee-status').value = employee.status;

            // Adjust color of status field based on status value
            const statusField = document.getElementById('employee-status');
            if (statusField) {
                switch (employee.status.toLowerCase()) {
                    case 'active':
                        statusField.style.color = 'green';
                        break;
                    case 'inactive':
                        statusField.style.color = 'red';
                        break;
                    case 'on leave':
                        statusField.style.color = 'orange';
                        break;
                    default:
                        statusField.style.color = 'black';
                }
            }

            formModal.style.display = 'block';
        }
    }
}

function deleteEmployee(id) {
    const employees = dataManager.getEmployees();
    const employee = employees.find(e => e.id === id);

    if (employee && confirm(`Are you sure you want to delete the employee "${employee.name}"?`)) {
        const success = dataManager.deleteEmployee(id);
        if (success) {
            posSystem.showToast('Employee deleted successfully!', 'success');
            loadEmployees();
        } else {
            posSystem.showToast('Error deleting employee', 'error');
        }
    }
}

function handleEmployeeFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const editingId = form.getAttribute('data-editing-id');

    // Get form values
    const name = document.getElementById('employee-name').value.trim();
    const email = document.getElementById('employee-email').value.trim();
    const role = document.getElementById('employee-role').value;
    const phone = document.getElementById('employee-phone').value.trim();
    const status = document.getElementById('employee-status').value;

    // Validation
    if (!name) {
        posSystem.showToast('Employee name is required', 'error');
        return;
    }

    if (!email) {
        posSystem.showToast('Email is required', 'error');
        return;
    }

    if (!role) {
        posSystem.showToast('Role is required', 'error');
        return;
    }

    if (!phone) {
        posSystem.showToast('Phone number is required', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        posSystem.showToast('Please enter a valid email address', 'error');
        return;
    }

    const employeeData = { name, email, role, phone, status };

    try {
        if (editingId) {
            // Update existing employee
            const success = dataManager.updateEmployee(parseInt(editingId), employeeData);
            if (success) {
                posSystem.showToast('Employee updated successfully!', 'success');
            } else {
                posSystem.showToast('Error updating employee', 'error');
                return;
            }
        } else {
            // Add new employee
            dataManager.addEmployee(employeeData);
            posSystem.showToast('Employee added successfully!', 'success');
        }

        closeEmployeeFormModal();
        loadEmployees();
    } catch (error) {
        posSystem.showToast('Error saving employee', 'error');
    }
}

// Initialize employee form event listener
document.addEventListener('DOMContentLoaded', function() {
    const employeeForm = document.getElementById('employee-form');
    if (employeeForm) {
        employeeForm.addEventListener('submit', handleEmployeeFormSubmit);
    }

    // Close employee modals when clicking outside
    window.addEventListener('click', function(event) {
        const employeeModal = document.getElementById('employee-modal');
        const employeeFormModal = document.getElementById('employee-form-modal');

        if (event.target === employeeModal) {
            closeEmployeeModal();
        }
        if (event.target === employeeFormModal) {
            closeEmployeeFormModal();
        }
    });
});
