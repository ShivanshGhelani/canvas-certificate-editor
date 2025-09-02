// --- LEGACY COMPATIBILITY AND MAIN INITIALIZATION ---

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Certificate Editor initialized with modular architecture');
    
    // Initialize the certificate editor
    initializeCertificateEditor();
});

/**
 * Main initialization function
 */
function initializeCertificateEditor() {
    console.log('Initializing Certificate Editor...');
    
    // Initialize core components
    if (typeof drawBackground === 'function') {
        drawBackground();
    }
    
    // Setup text elements interaction
    setupTextElements();
    
    // Setup file upload handlers
    setupFileUploads();
    
    // Setup toolbar buttons
    setupToolbarButtons();
    
    // Setup text and logo buttons
    setupTextButtons();
    setupLogoButton();
    
    console.log('Certificate Editor ready!');
}

/**
 * Setup text elements to be interactive
 */
function setupTextElements() {
    const textElements = document.querySelectorAll('.dynamic-element[data-type="text"]');
    
    textElements.forEach(element => {
        makeElementInteractive(element);
    });
}

/**
 * Make an element interactive with all capabilities
 * @param {HTMLElement} element - Element to make interactive
 */
function makeElementInteractive(element) {
    // Add selection capability
    element.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.ElementSelection) {
            window.ElementSelection.select(element);
        }
    });
    
    // Make draggable
    if (window.DragAndDrop) {
        window.DragAndDrop.makeElementDraggable(element);
    }
    
    // Make resizable
    if (window.ElementResize) {
        window.ElementResize.makeElementResizable(element);
    }
    
    // Add element control styles
    element.style.cursor = 'grab';
    element.style.position = 'absolute';
    
    // Add hover effects
    element.addEventListener('mouseenter', () => {
        if (!window.ElementSelection || !window.ElementSelection.isSelected(element)) {
            element.style.outline = '1px dashed rgba(0, 123, 255, 0.5)';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (!window.ElementSelection || !window.ElementSelection.isSelected(element)) {
            element.style.outline = 'none';
        }
    });
}

/**
 * Setup file upload handlers
 */
function setupFileUploads() {
    // Logo upload handlers
    const logoButtons = ['upload-logo-btn-1', 'upload-logo-btn-2', 'upload-logo-btn-3'];
    logoButtons.forEach((buttonId, index) => {
        const button = document.getElementById(buttonId);
        const input = document.getElementById(`upload-logo-${index + 1}`);
        
        if (button && input) {
            button.addEventListener('click', () => input.click());
        }
    });
    
    // Signature upload handlers
    const sigButtons = ['upload-sig-btn-1', 'upload-sig-btn-2', 'upload-sig-btn-3'];
    sigButtons.forEach((buttonId, index) => {
        const button = document.getElementById(buttonId);
        const input = document.getElementById(`upload-sig-${index + 1}`);
        
        if (button && input) {
            button.addEventListener('click', () => input.click());
        }
    });
}

/**
 * Setup toolbar button handlers
 */
function setupToolbarButtons() {
    // Text addition buttons
    setupTextButtons();
    
    // Logo addition button
    setupLogoButton();
    
    // Template buttons
    setupTemplateButtons();
    
    // PDF download button
    const downloadBtn = document.getElementById('download-pdf');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (window.PDFExport) {
                window.PDFExport.exportToPDF();
            }
        });
    }
    
    // AI generation button
    const aiBtn = document.getElementById('ai-generate-btn');
    const aiInput = document.getElementById('ai-prompt-input');
    if (aiBtn && aiInput) {
        aiBtn.addEventListener('click', () => {
            const prompt = aiInput.value.trim();
            if (prompt && window.AIGenerator) {
                window.AIGenerator.generateBackground(prompt);
            }
        });
        
        // Allow Enter key in AI input
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                aiBtn.click();
            }
        });
    }
}

/**
 * Setup text addition buttons
 */
function setupTextButtons() {
    // Remove event listener setup for add-text-btn since TopBar handles it
    // const addTextBtn = document.getElementById('add-text-btn');
    // if (addTextBtn && !addTextBtn.hasAttribute('data-listener-added')) {
    //     addTextBtn.addEventListener('click', () => {
    //         addTextElement('add-text-btn');
    //     });
    //     addTextBtn.setAttribute('data-listener-added', 'true');
    // }
    
    // Handle specific text type buttons (if they exist)
    const textButtons = [
        'add-student-name',
        'add-course-name', 
        'add-completion-date',
        'add-instructor-name',
        'add-institution-name',
        'add-custom-text'
    ];
    
    textButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button && !button.hasAttribute('data-listener-added')) {
            button.addEventListener('click', () => {
                addTextElement(buttonId);
            });
            button.setAttribute('data-listener-added', 'true');
        }
    });
}

/**
 * Setup logo addition button
 */
function setupLogoButton() {
    const addLogoBtn = document.getElementById('add-logo-btn');
    const logoInput = document.getElementById('upload-logo-dynamic');
    
    if (addLogoBtn && logoInput && !addLogoBtn.hasAttribute('data-listener-added')) {
        addLogoBtn.addEventListener('click', () => {
            logoInput.click();
        });
        addLogoBtn.setAttribute('data-listener-added', 'true');
        
        logoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                addLogoElement(file);
            }
        });
    }
}

/**
 * Setup template buttons
 */
function setupTemplateButtons() {
    const templateButtons = document.querySelectorAll('[data-template]');
    
    templateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const templateName = button.dataset.template;
            if (window.TemplateManager) {
                window.TemplateManager.loadTemplate(templateName);
            }
        });
    });
}

/**
 * Add a text element to the canvas
 * @param {string} type - Type of text element to add
 */
function addTextElement(type) {
    const textMappings = {
        'add-text-btn': 'New Text',
        'add-student-name': 'Student Name',
        'add-course-name': 'Course Name',
        'add-completion-date': 'Completion Date',
        'add-instructor-name': 'Instructor Name',
        'add-institution-name': 'Institution Name',
        'add-custom-text': 'Custom Text'
    };
    
    const text = textMappings[type] || 'New Text';
    const element = createTextElement(text);
    
    // Position in center of canvas
    const canvas = document.getElementById('certificate-wrapper');
    const canvasRect = canvas.getBoundingClientRect();
    
    element.style.left = `${canvasRect.width / 2 - 100}px`;
    element.style.top = `${canvasRect.height / 2 - 20}px`;
    
    const container = document.getElementById('dynamic-elements-container');
    container.appendChild(element);
    makeElementInteractive(element);
    
    // Select the new element
    if (window.ElementSelection) {
        window.ElementSelection.select(element);
    }
}

/**
 * Add a logo element to the canvas
 * @param {File} file - Image file to add as logo
 */
function addLogoElement(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const element = createLogoElement(e.target.result);
        
        // Position in center of canvas
        const canvas = document.getElementById('certificate-wrapper');
        const canvasRect = canvas.getBoundingClientRect();
        
        element.style.left = `${canvasRect.width / 2 - 50}px`;
        element.style.top = `${canvasRect.height / 2 - 50}px`;
        
        const container = document.getElementById('dynamic-elements-container');
        container.appendChild(element);
        makeElementInteractive(element);
        
        // Select the new element
        if (window.ElementSelection) {
            window.ElementSelection.select(element);
        }
    };
    
    reader.readAsDataURL(file);
}

/**
 * Create a text element
 * @param {string} text - Text content
 * @returns {HTMLElement} - Created text element
 */
function createTextElement(text) {
    const element = document.createElement('div');
    element.className = 'dynamic-element';
    element.dataset.type = 'text';
    element.contentEditable = 'true';
    element.textContent = text;
    
    // Default styling
    element.style.cssText = `
        position: absolute;
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        color: #34495e;
        background: transparent;
        border: none;
        outline: none;
        cursor: grab;
        white-space: nowrap;
        user-select: text;
        z-index: 10;
        display: block;
        text-align: center;
        min-width: 100px;
        min-height: 24px;
    `;
    
    // Prevent default drag behavior
    element.addEventListener('dragstart', (e) => e.preventDefault());
    
    return element;
}

/**
 * Create a logo element
 * @param {string} imageSrc - Image source URL
 * @returns {HTMLElement} - Created logo element
 */
function createLogoElement(imageSrc) {
    const element = document.createElement('img');
    element.className = 'dynamic-element';
    element.dataset.type = 'logo';
    element.src = imageSrc;
    
    // Default styling
    element.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        object-fit: contain;
        cursor: grab;
        z-index: 10;
        border-radius: 4px;
    `;
    
    // Prevent default drag behavior
    element.addEventListener('dragstart', (e) => e.preventDefault());
    
    return element;
}

// Legacy function mappings for backward compatibility (prevent duplicates)
if (!window.makeInteractive) {
    window.makeInteractive = makeElementInteractive;
}
if (!window.addTextElement) {
    window.addTextElement = addTextElement;
}
if (!window.addLogoElement) {
    window.addLogoElement = addLogoElement;
}
if (!window.createTextElement) {
    window.createTextElement = createTextElement;
}
if (!window.createLogoElement) {
    window.createLogoElement = createLogoElement;
}
if (!window.makeElementInteractive) {
    window.makeElementInteractive = makeElementInteractive;
}
window.createTextElement = createTextElement;
window.createLogoElement = createLogoElement;
