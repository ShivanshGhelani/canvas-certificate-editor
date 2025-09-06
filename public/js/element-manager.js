// --- DYNAMIC ELEMENT CREATION AND MANAGEMENT ---

// Event listeners for adding elements
addLogoBtn.addEventListener('click', () => createDynamicElement('logo'));
addTextBtn.addEventListener('click', () => createDynamicElement('text'));

function createDynamicElement(type, options = {}) {
    elementCounter++;
    const elId = `element_${elementCounter}`;
    const newEl = document.createElement('div');
    newEl.id = elId;
    newEl.className = 'dynamic-element';
    
    const content = options.text || (type === 'logo' ? `Logo ${elementCounter}` : 'Editable Text');
    newEl.innerHTML = `<span>${content}</span><div class="resize-handle"></div><button class="remove-btn">&times;</button>`;
    
    if (type === 'logo') {
        newEl.style.width = options.width || '100px';
        newEl.style.height = options.height || '100px';
        newEl.dataset.type = 'logo';
    } else {
        newEl.dataset.type = 'text';
        newEl.style.width = options.width || '400px';
        newEl.style.height = options.height || 'auto';
        newEl.style.fontFamily = options.fontFamily || 'Roboto';
        newEl.style.fontSize = options.fontSize || '24px';
        newEl.style.color = options.color || '#34495e';
        newEl.style.textAlign = options.textAlign || 'center';
        newEl.style.fontWeight = options.fontWeight || 'normal';
        newEl.style.fontStyle = options.fontStyle || 'normal';
        newEl.style.textDecoration = options.textDecoration || 'none';
        newEl.style.textShadow = options.textShadow || 'none';
    }
    
    newEl.style.top = options.top || '100px';
    newEl.style.left = options.left || '100px';
    
    makeInteractive(newEl, type);
    dynamicElementsContainer.appendChild(newEl);
    return newEl;
}

function loadDefaultTemplate() {
    // Clear any existing elements first
    const container = document.getElementById('dynamic-elements-container');
    if (container) {
        container.innerHTML = '';
    }
    
    // The ornate background is now handled by core.js drawBackground function
    // No need to call loadOrnateAcademicBackground here
    
    // Positions scaled for A4 portrait (2480×3508px at 300 DPI)
    // Create Certificate of Achievement design optimized for portrait
    
    createDynamicElement('text', { 
        text: 'CERTIFICATE', 
        top: '600px',   
        left: '240px',  
        width: '2000px', 
        height: 'auto', 
        fontFamily: 'Cinzel', 
        fontSize: '120px', 
        color: '#2c3e50', 
        fontWeight: 'bold',
        textAlign: 'center'
    });
    
    createDynamicElement('text', { 
        text: 'OF ACHIEVEMENT', 
        top: '750px',   
        left: '240px',
        width: '2000px', 
        height: 'auto', 
        fontFamily: 'Cinzel', 
        fontSize: '80px', 
        color: '#2c3e50', 
        fontWeight: 'normal',
        textAlign: 'center'
    });
    
    createDynamicElement('text', { 
        text: 'This is to certify that', 
        top: '1200px',  
        left: '240px',  
        width: '2000px', 
        height: 'auto', 
        fontFamily: 'Lora', 
        fontSize: '50px',
        color: '#34495e',
        textAlign: 'center'
    });
    
    createDynamicElement('text', { 
        text: "{{ Recipient's Name }}", 
        top: '1400px',  
        left: '240px',  
        width: '2000px', 
        height: 'auto', 
        fontFamily: 'Playfair Display', 
        fontSize: '140px', 
        color: '#2a6df4', 
        fontWeight: 'bold',
        textAlign: 'center'
    });
    
    createDynamicElement('text', { 
        text: 'has successfully completed the requirements for', 
        top: '1650px',  
        left: '240px',  
        width: '2000px', 
        height: 'auto', 
        fontFamily: 'Lora', 
        fontSize: '45px',
        color: '#34495e',
        textAlign: 'center'
    });
    
    createDynamicElement('text', { 
        text: 'Course/Program Name', 
        top: '1800px',  
        left: '240px',  
        width: '2000px', 
        height: 'auto', 
        fontFamily: 'Cinzel', 
        fontSize: '60px', 
        color: '#2c3e50',
        fontWeight: 'bold',
        textAlign: 'center'
    });
    
    createDynamicElement('text', { 
        text: 'Awarded on {{ Date }}', 
        top: '1980px',  
        left: '240px',  
        width: '2000px', 
        height: 'auto', 
        fontFamily: 'Lora', 
        fontSize: '40px',
        color: '#34495e',
        textAlign: 'center'
    });
    
    // Add decorative logo space
    createDynamicElement('logo', { 
        text: 'Logo', 
        top: '900px',   
        left: '1090px',  
        width: '300px', 
        height: '300px' 
    });
}

// Function to load ornate academic background
function loadOrnateAcademicBackground() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ornate golden border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 20;
    
    // Outer border
    ctx.strokeRect(100, 80, canvas.width - 200, canvas.height - 160);
    
    // Inner decorative border
    ctx.strokeStyle = '#b8860b';
    ctx.lineWidth = 8;
    ctx.strokeRect(140, 120, canvas.width - 280, canvas.height - 240);
    
    // Corner decorations
    const cornerSize = 150;
    ctx.fillStyle = '#d4af37';
    
    // Top corners
    ctx.fillRect(80, 60, cornerSize, cornerSize);
    ctx.fillRect(canvas.width - 230, 60, cornerSize, cornerSize);
    
    // Bottom corners  
    ctx.fillRect(80, canvas.height - 210, cornerSize, cornerSize);
    ctx.fillRect(canvas.width - 230, canvas.height - 210, cornerSize, cornerSize);
    
    // Clear corner centers
    ctx.fillStyle = '#ffffff';
    const centerSize = 100;
    const centerOffset = 25;
    
    ctx.fillRect(80 + centerOffset, 60 + centerOffset, centerSize, centerSize);
    ctx.fillRect(canvas.width - 230 + centerOffset, 60 + centerOffset, centerSize, centerSize);
    ctx.fillRect(80 + centerOffset, canvas.height - 210 + centerOffset, centerSize, centerSize);
    ctx.fillRect(canvas.width - 230 + centerOffset, canvas.height - 210 + centerOffset, centerSize, centerSize);
}
