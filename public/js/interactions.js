// --- INTERACTIVE ELEMENT FUNCTIONALITY ---

function makeInteractive(element, type) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.addEventListener('mousedown', dragMouseDown);
    element.addEventListener('dblclick', handleDoubleClick);
    element.querySelector('.remove-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (selectedElement === element) {
            selectedElement = null;
            propertiesPanel.style.display = 'none';
        }
        element.remove();
    });

    function dragMouseDown(e) {
        if (e.target.classList.contains('resize-handle') || e.target.classList.contains('remove-btn')) return;
        
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

        selectElement(element);
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
        if(selectedElement === element) updatePropertiesPanelPosition();
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function handleDoubleClick() {
        if (type === 'logo') {
            triggerLogoUpload(element);
        } else if (type === 'text') {
            element.setAttribute('contenteditable', 'true');
            element.querySelector('span').focus();
        }
    }
    
    if (type === 'text') {
        element.addEventListener('blur', () => {
            element.setAttribute('contenteditable', 'false');
        }, true);
    }

    const resizer = element.querySelector('.resize-handle');
    if (resizer) resizer.onmousedown = initResize;

    function initResize(e) {
        e.preventDefault();
        e.stopPropagation();
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
    }

    function resize(e) {
        element.style.width = (e.clientX - element.getBoundingClientRect().left) + 'px';
        element.style.height = (e.clientY - element.getBoundingClientRect().top) + 'px';
        if(selectedElement === element) updatePropertiesPanelPosition();
    }

    function stopResize() {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
    }
}

function selectElement(element) {
    if (selectedElement) selectedElement.classList.remove('selected');
    
    selectedElement = element;
    selectedElement.classList.add('selected');

    propertiesPanel.style.display = 'flex';
    document.getElementById('text-props').style.display = selectedElement.dataset.type === 'text' ? 'block' : 'none';
    if (selectedElement.dataset.type === 'text') {
        updatePropertiesPanel();
    }
    updatePropertiesPanelPosition();
}

function updatePropertiesPanelPosition() {
    if (!selectedElement) return;
    const elRect = selectedElement.getBoundingClientRect();
    const panel = propertiesPanel;
    const panelRect = panel.getBoundingClientRect();
    const spaceBelow = window.innerHeight - elRect.bottom;
    
    let top, left;

    // Position Vertically
    if (spaceBelow < panelRect.height && elRect.top > panelRect.height) {
        // Flip to top
        top = elRect.top - panelRect.height - 10;
    } else {
        // Position below
        top = elRect.bottom + 10;
    }

    // Position Horizontally
    left = elRect.left;
    if (left + panelRect.width > window.innerWidth) {
        left = window.innerWidth - panelRect.width - 10;
    }

    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
}

// Global event listener for deselecting elements
document.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.dynamic-element') && !e.target.closest('#properties-panel')) {
        if (selectedElement) {
            selectedElement.classList.remove('selected');
            if (selectedElement.getAttribute('contenteditable') === 'true') {
                selectedElement.setAttribute('contenteditable', 'false');
            }
        }
        selectedElement = null;
        propertiesPanel.style.display = 'none';
    }
});
