// --- IMAGE PROCESSING UTILITIES ---

function removeWhiteBackground(imageSrc, tolerance = 20) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const r0 = data[0], g0 = data[1], b0 = data[2];
            for (let i = 0; i < data.length; i += 4) {
                const diff = Math.sqrt(Math.pow(data[i] - r0, 2) + Math.pow(data[i+1] - g0, 2) + Math.pow(data[i+2] - b0, 2));
                if (diff < tolerance) data[i + 3] = 0;
            }
            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = imageSrc;
    });
}

function handleImageUpload(inputId, placeholderId) {
    const input = document.getElementById(inputId);
    input.addEventListener('change', function(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                removeWhiteBackground(e.target.result).then(transparentSrc => {
                    const placeholder = document.getElementById(placeholderId);
                    placeholder.innerHTML = `<img src="${transparentSrc}" alt="Uploaded content">`;
                    placeholder.classList.add('has-image');
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    });
}

function triggerLogoUpload(logoElement) {
    dynamicLogoInput.onchange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                removeWhiteBackground(e.target.result).then(transparentSrc => {
                    logoElement.innerHTML = `<img src="${transparentSrc}" alt="Uploaded logo"><div class="resize-handle"></div><button class="remove-btn">&times;</button>`;
                    logoElement.classList.add('has-image');
                    makeInteractive(logoElement, 'logo');
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    dynamicLogoInput.click();
}
