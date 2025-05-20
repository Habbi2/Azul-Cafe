// Main JavaScript for menu display
document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display menu
    fetchMenu();
});

async function fetchMenu() {
    try {
        // Use the serverless function to get the menu data
        const response = await fetch('/api/get-menu');
        if (!response.ok) {
            throw new Error('No se pudo cargar el menú');
        }
        
        const data = await response.json();
        renderMenu(data);
    } catch (error) {
        console.error('Error al cargar el menú:', error);
        document.getElementById('menu-container').innerHTML = `
            <div class="error-message">
                <p>Lo sentimos, no se pudo cargar el menú. Por favor, inténtelo de nuevo más tarde.</p>
            </div>
        `;
    }
}

function renderMenu(data) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';
    
    // Remove the loading message
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
    
    // Group categories for layout
    const categories = data.categorias;
    const leftColumnCategories = [];
    const rightColumnCategories = [];
    
    // Distribute categories between left and right columns
    categories.forEach((category, index) => {
        if (index % 2 === 0) {
            leftColumnCategories.push(category);
        } else {
            rightColumnCategories.push(category);
        }
    });
    
    // Create a container for the columns
    const columnsContainer = document.createElement('div');
    columnsContainer.className = 'menu-columns';
    columnsContainer.style.display = 'grid';
    columnsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    columnsContainer.style.gap = '30px';
    menuContainer.appendChild(columnsContainer);
    
    // Create left column
    const leftColumn = document.createElement('div');
    leftColumn.className = 'menu-column';
    columnsContainer.appendChild(leftColumn);
    
    // Create right column
    const rightColumn = document.createElement('div');
    rightColumn.className = 'menu-column';
    columnsContainer.appendChild(rightColumn);
    
    // Render left column categories
    leftColumnCategories.forEach(category => {
        renderCategorySection(category, leftColumn);
    });
    
    // Render right column categories
    rightColumnCategories.forEach(category => {
        renderCategorySection(category, rightColumn);
    });
}

function renderCategorySection(category, columnElement) {
    const categorySection = document.createElement('div');
    categorySection.className = 'category';
    categorySection.innerHTML = `
        <h2 class="category-title">${category.nombre}</h2>
        <div class="menu-items" id="category-${category.id}"></div>
    `;
    
    columnElement.appendChild(categorySection);
      const categoryItemsContainer = document.getElementById(`category-${category.id}`);
        
    category.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        
        let descriptionHtml = '';
        if (item.descripcion) {
            descriptionHtml = `<p class="item-description">${item.descripcion}</p>`;
        }
        
        itemElement.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.nombre}</div>
                ${descriptionHtml}
            </div>
            <div class="item-price">${formatPrice(item.precio)}</div>
        `;
        
        categoryItemsContainer.appendChild(itemElement);
    });
}

function formatPrice(price) {
    return `${price.toFixed(2)} $`;
}
