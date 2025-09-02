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
    createDynamicElement('text', { text: 'Certificate of', top: '150px', left: '371px', width: '380px', height: 'auto', fontFamily: 'Roboto', fontSize: '20px', color: 'var(--modern-blue)' });
    createDynamicElement('text', { text: 'Participation', top: '180px', left: '321px', width: '480px', height: 'auto', fontFamily: 'Montserrat', fontSize: '56px', color: 'var(--modern-dark)', fontWeight: 'bold' });
    createDynamicElement('text', { text: 'This certificate is hereby presented to', top: '300px', left: '271px', width: '580px', height: 'auto', fontFamily: 'Roboto', fontSize: '18px' });
    createDynamicElement('text', { text: '{{ Recipient\'s Name }}', top: '350px', left: '271px', width: '580px', height: 'auto', fontFamily: 'Montserrat', fontSize: '48px', color: 'var(--modern-dark)', fontWeight: 'bold' });
    createDynamicElement('text', { text: 'in recognition of their valuable participation in the', top: '430px', left: '271px', width: '580px', height: 'auto', fontFamily: 'Roboto', fontSize: '18px' });
    createDynamicElement('text', { text: 'Workshop or Event Name', top: '460px', left: '271px', width: '580px', height: 'auto', fontFamily: 'Roboto', fontSize: '22px', fontWeight: 'bold' });
    createDynamicElement('text', { text: 'held on {{ Date of Event }}', top: '490px', left: '271px', width: '580px', height: 'auto', fontFamily: 'Roboto', fontSize: '18px' });
    createDynamicElement('logo', { text: 'Logo', top: '50px', left: '50px', width: '100px', height: '100px' });
}
