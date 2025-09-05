// Role and permission management functions

// Access rights management functions
function manageRoles() {
    const modal = document.getElementById('roles-modal');
    if (modal) {
        modal.style.display = 'block';
        loadRoles();
    }
}

function closeRolesModal() {
    const modal = document.getElementById('roles-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showAddRoleForm() {
    const formModal = document.getElementById('role-form-modal');
    const formTitle = document.getElementById('role-form-title');
    const form = document.getElementById('role-form');

    if (formModal && formTitle && form) {
        formTitle.textContent = 'Add Role';
        form.reset();
        form.removeAttribute('data-editing-id');
        formModal.style.display = 'block';
    }
}

function closeRoleFormModal() {
    const modal = document.getElementById('role-form-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function loadRoles() {
    const roles = dataManager.getRoles();
    const rolesList = document.getElementById('roles-list');

    if (rolesList) {
        rolesList.innerHTML = roles.length > 0
            ? roles.map(role => `
                <div class="role-item">
                    <div class="role-info">
                        <h3>${role.name}</h3>
                        <p>${role.description}</p>
                    </div>
                    <div class="role-actions">
                        <button class="btn btn-edit" onclick="editRole(${role.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-delete" onclick="deleteRole(${role.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `).join('')
            : '<p>No roles found. Click "Add New Role" to create your first role.</p>';
    }
}

function editRole(id) {
    const roles = dataManager.getRoles();
    const role = roles.find(r => r.id === id);

    if (role) {
        const formModal = document.getElementById('role-form-modal');
        const formTitle = document.getElementById('role-form-title');
        const form = document.getElementById('role-form');
        const nameInput = document.getElementById('role-name');
        const descriptionInput = document.getElementById('role-description');

        if (formModal && formTitle && form && nameInput && descriptionInput) {
            formTitle.textContent = 'Edit Role';
            nameInput.value = role.name;
            descriptionInput.value = role.description;
            form.setAttribute('data-editing-id', id);
            formModal.style.display = 'block';
        }
    }
}

function deleteRole(id) {
    const roles = dataManager.getRoles();
    const role = roles.find(r => r.id === id);

    if (role && confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
        const success = dataManager.deleteRole(id);
        if (success) {
            posSystem.showToast('Role deleted successfully!', 'success');
            loadRoles();
        } else {
            posSystem.showToast('Error deleting role', 'error');
        }
    }
}

function handleRoleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const editingId = form.getAttribute('data-editing-id');
    const nameInput = document.getElementById('role-name');
    const descriptionInput = document.getElementById('role-description');

    if (!nameInput || !descriptionInput) return;

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();

    // Validation
    if (!name) {
        posSystem.showToast('Role name is required', 'error');
        return;
    }

    if (!description) {
        posSystem.showToast('Role description is required', 'error');
        return;
    }

    const roleData = { name, description };

    try {
        if (editingId) {
            // Update existing role
            const success = dataManager.updateRole(parseInt(editingId), roleData);
            if (success) {
                posSystem.showToast('Role updated successfully!', 'success');
            } else {
                posSystem.showToast('Error updating role', 'error');
                return;
            }
        } else {
            // Add new role
            dataManager.addRole(roleData);
            posSystem.showToast('Role added successfully!', 'success');
        }

        closeRoleFormModal();
        loadRoles();
    } catch (error) {
        posSystem.showToast('Error saving role', 'error');
    }
}

function setPermissions() {
    // Open a modal or section for setting permissions (basic implementation)
    const modal = document.getElementById('permissions-modal');
    if (modal) {
        modal.style.display = 'block';
        loadPermissions();
    } else {
        alert('Permissions modal not found. Please add the modal HTML.');
    }
}

// Close permissions modal
function closePermissionsModal() {
    const modal = document.getElementById('permissions-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Load permissions data
function loadPermissions() {
    const permissionsList = document.getElementById('permissions-list');
    if (permissionsList) {
        const permissions = dataManager.getPermissions();
        const roles = dataManager.getRoles();

        if (roles.length === 0) {
            permissionsList.innerHTML = '<p>No roles available. Please create roles first.</p>';
            return;
        }

        // Create permissions interface for each role
        permissionsList.innerHTML = roles.map(role => {
            const rolePermissions = dataManager.getPermissionsByRole(role.id);

            return `
                <div class="role-permissions">
                    <h4>${role.name}</h4>
                    <p class="role-description">${role.description}</p>
                    <div class="permissions-grid">
                        ${permissions.map(permission => `
                            <div class="permission-item">
                                <label class="permission-checkbox">
                                    <input type="checkbox"
                                           id="perm-${role.id}-${permission.id}"
                                           data-role-id="${role.id}"
                                           data-permission-id="${permission.id}"
                                           ${rolePermissions.includes(permission.id) ? 'checked' : ''}>
                                    <span class="checkmark"></span>
                                    <div class="permission-info">
                                        <strong>${permission.name}</strong>
                                        <small>${permission.description}</small>
                                    </div>
                                </label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Save permissions
function savePermissions() {
    const checkboxes = document.querySelectorAll('#permissions-list input[type="checkbox"]');
    const rolePermissionsMap = {};

    // Group permissions by role
    checkboxes.forEach(checkbox => {
        const roleId = parseInt(checkbox.getAttribute('data-role-id'));
        const permissionId = parseInt(checkbox.getAttribute('data-permission-id'));

        if (!rolePermissionsMap[roleId]) {
            rolePermissionsMap[roleId] = [];
        }

        if (checkbox.checked) {
            rolePermissionsMap[roleId].push(permissionId);
        }
    });

    // Save permissions for each role
    let successCount = 0;
    for (const [roleId, permissionIds] of Object.entries(rolePermissionsMap)) {
        const success = dataManager.updateRolePermissions(parseInt(roleId), permissionIds);
        if (success) {
            successCount++;
        }
    }

    if (successCount === Object.keys(rolePermissionsMap).length) {
        posSystem.showToast('Permissions updated successfully!', 'success');
        closePermissionsModal();
    } else {
        posSystem.showToast('Error updating some permissions', 'error');
    }
}

// Initialize permissions modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    const permissionsModal = document.getElementById('permissions-modal');
    if (permissionsModal) {
        permissionsModal.querySelector('.close').addEventListener('click', closePermissionsModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === permissionsModal) {
            closePermissionsModal();
        }
    });
});

// Initialize role form event listener
document.addEventListener('DOMContentLoaded', function() {
    const roleForm = document.getElementById('role-form');
    if (roleForm) {
        roleForm.addEventListener('submit', handleRoleFormSubmit);
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const rolesModal = document.getElementById('roles-modal');
        const roleFormModal = document.getElementById('role-form-modal');

        if (event.target === rolesModal) {
            closeRolesModal();
        }
        if (event.target === roleFormModal) {
            closeRoleFormModal();
        }
    });
});
