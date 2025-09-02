// --- PDF DOWNLOAD FUNCTIONALITY ---

async function downloadCertificatePDF() {
    // Hide selection indicators before generating PDF
    if (selectedElement) {
        selectedElement.classList.remove('selected');
        selectedElement = null;
        propertiesPanel.style.display = 'none';
    }
    
    // Wait for UI updates to render
    await new Promise(r => setTimeout(r, 100));

    const foregroundElement = document.getElementById('certificate-foreground');
    const backgroundCanvas = document.getElementById('background-canvas');
    
    // Temporarily disable contenteditable to clean up the PDF
    const editableElements = foregroundElement.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(el => el.setAttribute('contenteditable', 'false'));

    try {
        // Capture the foreground content
        const foregroundCanvas = await html2canvas(foregroundElement, { 
            scale: 3, 
            backgroundColor: null, 
            useCORS: true 
        });
        
        // Get background and foreground as data URLs
        const backgroundDataUrl = backgroundCanvas.toDataURL('image/jpeg', 0.9);
        const foregroundDataUrl = foregroundCanvas.toDataURL('image/png');
        
        // Create PDF document (A4 landscape)
        const doc = new jsPDF({ 
            orientation: 'landscape', 
            unit: 'mm', 
            format: [297, 210] 
        });
        
        // Add background layer
        doc.addImage(backgroundDataUrl, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
        
        // Add foreground layer
        doc.addImage(foregroundDataUrl, 'PNG', 0, 0, 297, 210, undefined, 'FAST');
        
        // Generate filename with timestamp
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `Certificate-of-Participation-${timestamp}.pdf`;
        
        // Save the PDF
        doc.save(filename);
        
        console.log('PDF generated successfully:', filename);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
    } finally {
        // Restore contenteditable attributes
        editableElements.forEach(el => el.setAttribute('contenteditable', 'true'));
    }
}

// Alternative download methods
async function downloadAsImage(format = 'png') {
    // Hide selection indicators
    if (selectedElement) {
        selectedElement.classList.remove('selected');
        selectedElement = null;
        propertiesPanel.style.display = 'none';
    }
    
    await new Promise(r => setTimeout(r, 100));

    const certificateWrapper = document.getElementById('certificate-wrapper');
    
    try {
        const canvas = await html2canvas(certificateWrapper, { 
            scale: 3,
            useCORS: true,
            backgroundColor: '#ffffff'
        });
        
        const dataUrl = canvas.toDataURL(`image/${format}`, 0.9);
        
        // Create download link
        const link = document.createElement('a');
        link.download = `certificate.${format}`;
        link.href = dataUrl;
        link.click();
        
        console.log(`${format.toUpperCase()} image downloaded successfully`);
        
    } catch (error) {
        console.error(`Error generating ${format.toUpperCase()}:`, error);
        alert(`Failed to generate ${format.toUpperCase()} image. Please try again.`);
    }
}

// Export functions for use in other modules
window.downloadFunctions = {
    downloadCertificatePDF,
    downloadAsImage
};

// Event listener for the main download button
document.getElementById('download-pdf').addEventListener('click', downloadCertificatePDF);
