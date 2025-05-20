// Admin panel JavaScript with Firebase integration
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const adminPanel = document.getElementById('admin-panel');
    const menuEditor = document.getElementById('menu-editor');
    const addItemBtn = document.getElementById('add-item-btn');
    const addItemForm = document.getElementById('add-item-form');
    const newItemForm = document.getElementById('new-item-form');
    const cancelAddBtn = document.getElementById('cancel-add');
    const saveChangesBtn = document.getElementById('save-changes-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Set up anonymous auth for admin authentication
    // This is a simple approach - for production, you should use more robust authentication
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            showAdminPanel();
        } else {
            // No user is signed in
            loginSection.classList.remove('hidden');
            adminPanel.classList.add('hidden');
        }
    });
    
    // Event Listeners
    loginForm.addEventListener('submit', handleLogin);
    addItemBtn.addEventListener('click', () => addItemForm.classList.remove('hidden'));
    cancelAddBtn.addEventListener('click', () => addItemForm.classList.add('hidden'));
    newItemForm.addEventListener('submit', handleNewItem);
    saveChangesBtn.addEventListener('click', saveChanges);
    logoutBtn.addEventListener('click', logout);
      // Functions
    async function handleLogin(e) {
        e.preventDefault();
        const password = document.getElementById('password').value;
        
        // For this simple application, we're using a hardcoded admin password
        // In production, you'd use Firebase Authentication with proper security
        const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password
        
        try {
            if (password === ADMIN_PASSWORD) {
                // Sign in anonymously with Firebase
                // In a production app, you'd use email/password or another authentication method
                await firebase.auth().signInAnonymously();
                showAdminPanel();
            } else {
                alert('Contraseña incorrecta');
            }
        } catch (error) {
            console.error('Error de autenticación:', error);
            alert('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
        }
    }
      function showAdminPanel() {
        loginSection.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loadMenuForEditing();
    }
    
    function loadMenuForEditing() {
        try {
            // Show loading indicator
            menuEditor.innerHTML = '<div class="loading">Cargando menú...</div>';
            
            // Listen for data from Firebase
            menuRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    renderMenuEditor(data);
                } else {
                    // If no menu data exists yet, initialize with empty structure
                    const emptyMenu = {
                        categorias: [
                            {
                                id: "sin-leche",
                                nombre: "Sin Leche",
                                items: []
                            },
                            {
                                id: "con-leche",
                                nombre: "Con Leche",
                                items: []
                            }
                        ]
                    };
                    renderMenuEditor(emptyMenu);
                }
            }, (error) => {
                console.error('Error loading menu data from Firebase:', error);
                menuEditor.innerHTML = `
                    <div class="error-message">
                        <p>No se pudo cargar el menú para editar. Por favor, inténtelo de nuevo.</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error al cargar el menú:', error);
            menuEditor.innerHTML = `
                <div class="error-message">
                    <p>No se pudo cargar el menú para editar. Por favor, inténtelo de nuevo.</p>
                </div>
            `;
        }
    }
    
    function renderMenuEditor(data) {
        menuEditor.innerHTML = '';
        
        // Store the menu data in a global variable for later use
        window.menuData = data;
        
        data.categorias.forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.className = 'category-editor';
            categorySection.innerHTML = `
                <h3 class="category-title">${category.nombre}</h3>
                <div class="editable-items" id="edit-category-${category.id}"></div>
            `;
            
            menuEditor.appendChild(categorySection);
            
            const categoryItemsContainer = document.getElementById(`edit-category-${category.id}`);
            
            category.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'editable-item';
                itemElement.dataset.id = item.id;
                itemElement.dataset.category = category.id;
                
                let descriptionHtml = '';
                if (item.descripcion) {
                    descriptionHtml = `<div class="item-description">${item.descripcion}</div>`;
                }                // Crear la estructura HTML mejorada para evitar superposiciones
                itemElement.innerHTML = `
                    <div class="item-content">
                        <div class="item-name">${item.nombre}</div>
                        ${descriptionHtml}
                    </div>
                    <div class="item-price">
                        <span>Precio:</span> 
                        <input type="number" class="item-price-input" 
                               value="${item.precio}" 
                               step="0.01" min="0" 
                               data-id="${item.id}" 
                               data-category="${category.id}"> €
                        <button class="btn-update update-price" data-id="${item.id}" data-category="${category.id}">Actualizar</button>
                    </div>
                    <div class="item-controls">
                        <button class="delete-item" data-id="${item.id}" data-category="${category.id}">Eliminar</button>
                    </div>
                `;
                
                categoryItemsContainer.appendChild(itemElement);
            });
        });
        
        // Add event listeners to delete buttons, price inputs, and update buttons
        document.querySelectorAll('.delete-item').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                    const itemId = this.dataset.id;
                    const categoryId = this.dataset.category;
                    deleteItem(itemId, categoryId);
                }
            });
        });
        
        document.querySelectorAll('.item-price-input').forEach(input => {
            input.addEventListener('change', function() {
                const itemId = this.dataset.id;
                const categoryId = this.dataset.category;
                const newPrice = parseFloat(this.value);
                updateItemPrice(itemId, categoryId, newPrice);
            });
        });
        
        document.querySelectorAll('.update-price').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                const categoryId = this.dataset.category;
                const input = document.querySelector(`.item-price-input[data-id="${itemId}"][data-category="${categoryId}"]`);
                const newPrice = parseFloat(input.value);
                updateItemPrice(itemId, categoryId, newPrice);
                alert('Precio actualizado. No olvide guardar los cambios.');
            });
        });
    }
    
    function updateItemPrice(itemId, categoryId, newPrice) {
        // Find the category and item in the menu data
        const category = window.menuData.categorias.find(cat => cat.id === categoryId);
        if (category) {
            const item = category.items.find(item => item.id === itemId);
            if (item) {
                item.precio = newPrice;
                console.log(`Precio actualizado: ${item.nombre} - ${newPrice}€`);
            }
        }
    }
    
    function deleteItem(itemId, categoryId) {
        // Find the category in the menu data
        const category = window.menuData.categorias.find(cat => cat.id === categoryId);
        if (category) {
            // Remove the item from the category
            const itemIndex = category.items.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                category.items.splice(itemIndex, 1);
                console.log(`Producto eliminado: ${itemId}`);
                
                // Refresh the UI
                renderMenuEditor(window.menuData);
            }
        }
    }
    
    function handleNewItem(e) {
        e.preventDefault();
        
        const categoryId = document.getElementById('item-category').value;
        const name = document.getElementById('item-name').value;
        const description = document.getElementById('item-description').value;
        const price = parseFloat(document.getElementById('item-price').value);
        
        // Create a unique ID for the new item
        const itemId = `${categoryId}-${Date.now()}`;
        
        // Find the category in the menu data
        const category = window.menuData.categorias.find(cat => cat.id === categoryId);
        if (category) {
            // Add the new item to the category
            category.items.push({
                id: itemId,
                nombre: name,
                descripcion: description,
                precio: price
            });
            
            console.log(`Nuevo producto añadido: ${name}`);
            
            // Reset form and hide it
            newItemForm.reset();
            addItemForm.classList.add('hidden');
            
            // Refresh the UI
            renderMenuEditor(window.menuData);
        }
    }
      async function saveChanges() {
        try {
            // Check if user is authenticated
            const user = firebase.auth().currentUser;
            
            if (!user) {
                throw new Error('No tiene permiso para realizar esta acción. Por favor, inicie sesión de nuevo.');
            }
            
            // Save the updated menu data to Firebase
            await menuRef.set(window.menuData);
            
            alert('Cambios guardados correctamente');
            
            // No need to reload, Firebase will trigger the value listener
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
            alert(`Error al guardar los cambios: ${error.message}`);
            
            // If unauthorized, redirect to login
            if (error.message.includes('No tiene permiso')) {
                logout();
            }
        }
    }
    
    function logout() {
        // Sign out of Firebase
        firebase.auth().signOut().then(() => {
            // Sign-out successful
            loginSection.classList.remove('hidden');
            adminPanel.classList.add('hidden');
            document.getElementById('password').value = '';
        }).catch((error) => {
            // An error happened
            console.error('Error during logout:', error);
        });
    }
});
