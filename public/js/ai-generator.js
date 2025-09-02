// --- AI BACKGROUND GENERATION ---

const aiPromptInput = document.getElementById('ai-prompt-input');
const aiGenerateBtn = document.getElementById('ai-generate-btn');

aiGenerateBtn.addEventListener('click', async () => {
    const userPrompt = aiPromptInput.value.trim();
    if (!userPrompt) {
        alert('Please enter a description for the background design.');
        return;
    }

    if (userPrompt.length > 500) {
        alert('Please keep your description under 500 characters.');
        return;
    }

    aiGenerateBtn.textContent = 'Generating...';
    aiGenerateBtn.classList.add('loading');
    aiGenerateBtn.disabled = true;

    try {
        const response = await fetch('/api/generate-background', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ prompt: userPrompt })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Server Error: ${response.status}`);
        }

        if (result.success && result.code) {
            const canvas = document.getElementById('background-canvas');
            const ctx = canvas.getContext('2d');
            
            // Create and execute the AI-generated drawing function
            const newDrawFunction = new Function('ctx', 'width', 'height', result.code);
            newDrawFunction(ctx, canvas.width, canvas.height);
            
            // Update the global drawBackground function
            drawBackground = () => newDrawFunction(ctx, canvas.width, canvas.height);
            
            console.log('Background generated successfully at:', result.timestamp);
        } else {
            throw new Error('Invalid response from AI service.');
        }
    } catch (error) {
        console.error("AI Generation Failed:", error);
        
        // Show user-friendly error messages
        let errorMessage = 'Failed to generate the background. ';
        if (error.message.includes('rate limit') || error.message.includes('limit exceeded')) {
            errorMessage += 'You have reached the AI generation limit. Please try again later.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            errorMessage += 'Please check your internet connection and try again.';
        } else {
            errorMessage += 'Please try again with a different description.';
        }
        
        alert(errorMessage);
    } finally {
        aiGenerateBtn.textContent = '✨ Generate Background';
        aiGenerateBtn.classList.remove('loading');
        aiGenerateBtn.disabled = false;
    }
});
