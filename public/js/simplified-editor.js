// --- SIMPLIFIED CERTIFICATE EDITOR ---

// Simple element creation without complex resize handles
function createSimpleTextElement(text = 'Editable Text') {
    const element = document.createElement('div');
    element.className = 'dynamic-element';
    element.dataset.type = 'text';
    element.contentEditable = 'true';
    element.textContent = text;
    
    // Simple styling
    element.style.cssText = `
        position: absolute;
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        color: #34495e;
        background: transparent;
        border: 2px solid transparent;
        outline: none;
        cursor: text;
        padding: 4px;
        z-index: 10;
        user-select: text;
    `;
    
    // Add selection on click
    element.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement(element);
    });
    
    // Make draggable
    makeElementDraggable(element);
    
    return element;
}

function createSimpleLogoElement(imageSrc) {
    const element = document.createElement('img');
    element.className = 'dynamic-element';
    element.dataset.type = 'logo';
    element.src = imageSrc;
    
    // Simple styling
    element.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        object-fit: contain;
        cursor: move;
        border: 2px solid transparent;
        z-index: 10;
    `;
    
    // Add selection on click
    element.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement(element);
    });
    
    // Make draggable
    makeElementDraggable(element);
    
    return element;
}

function selectElement(element) {
    // Clear previous selections
    document.querySelectorAll('.dynamic-element').forEach(el => {
        el.style.border = '2px solid transparent';
        el.classList.remove('selected');
    });
    
    // Select current element
    element.style.border = '2px solid #007bff';
    element.classList.add('selected');
    window.selectedElement = element;
    
    // Show delete button
    showDeleteButton(element);
}

function showDeleteButton(element) {
    // Remove existing delete button
    const existingBtn = document.querySelector('.delete-btn');
    if (existingBtn) existingBtn.remove();
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.style.cssText = `
        position: absolute;
        top: -10px;
        right: -10px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #dc3545;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        element.remove();
        deleteBtn.remove();
        window.selectedElement = null;
    });
    
    element.appendChild(deleteBtn);
}

function makeElementDraggable(element) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    element.addEventListener('mousedown', (e) => {
        // Don't drag if clicking on content editable text or delete button
        if (e.target.classList.contains('delete-btn') || 
            (element.contentEditable && e.target === element)) {
            return;
        }
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = element.getBoundingClientRect();
        const container = document.getElementById('certificate-wrapper');
        const containerRect = container.getBoundingClientRect();
        
        startLeft = rect.left - containerRect.left;
        startTop = rect.top - containerRect.top;
        
        element.style.cursor = 'grabbing';
        
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            element.style.left = (startLeft + deltaX) + 'px';
            element.style.top = (startTop + deltaY) + 'px';
        };
        
        const handleMouseUp = () => {
            isDragging = false;
            element.style.cursor = element.dataset.type === 'text' ? 'text' : 'move';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        e.preventDefault();
    });
}

// Setup simple add text button
function setupSimpleAddText() {
    const addTextBtn = document.getElementById('add-text-btn');
    if (addTextBtn) {
        addTextBtn.addEventListener('click', () => {
            const element = createSimpleTextElement('Editable Text');
            const container = document.getElementById('dynamic-elements-container');
            
            // Position in center
            element.style.left = '50%';
            element.style.top = '50%';
            element.style.transform = 'translate(-50%, -50%)';
            
            container.appendChild(element);
            selectElement(element);
        });
    }
}

// Setup simple add logo button
function setupSimpleAddLogo() {
    const addLogoBtn = document.getElementById('add-logo-btn');
    const logoInput = document.getElementById('upload-logo-dynamic');
    
    if (addLogoBtn && logoInput) {
        addLogoBtn.addEventListener('click', () => {
            logoInput.click();
        });
        
        logoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const element = createSimpleLogoElement(e.target.result);
                    const container = document.getElementById('dynamic-elements-container');
                    
                    // Position in center
                    element.style.left = '50%';
                    element.style.top = '50%';
                    element.style.transform = 'translate(-50%, -50%)';
                    
                    container.appendChild(element);
                    selectElement(element);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Clear selection when clicking empty area
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dynamic-element') && !e.target.closest('.delete-btn')) {
        document.querySelectorAll('.dynamic-element').forEach(el => {
            el.style.border = '2px solid transparent';
            el.classList.remove('selected');
        });
        
        // Remove delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => btn.remove());
        window.selectedElement = null;
    }
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupSimpleAddText();
    setupSimpleAddLogo();
});

console.log('Simplified editor loaded');
