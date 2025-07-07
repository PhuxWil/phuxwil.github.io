const mainContent = document.getElementById('hero-text-content');

function typewriterEffect(element, text, speed = 1) { // Default speed is now 0
    let i = 0;
    const textToType = text || "";
    element.textContent = ''; 

    function type() {
        if (i < textToType.length) {
            element.textContent += textToType.charAt(i);
            i++;
            // Characters will appear very rapidly due to speed being 0
            setTimeout(type, speed); 
        }
    }
    type(); 
}

function startTextAnimations() {
    
    const animatedElementsNodeList = mainContent.querySelectorAll('[data-animate-text-target]');
    let animatedElementsArray = Array.from(animatedElementsNodeList);

    // Sort elements by their vertical position on the page (top-to-bottom)
    animatedElementsArray.sort((a, b) => {
        const topA = a.getBoundingClientRect().top;
        const topB = b.getBoundingClientRect().top;
        return topA - topB;
    });

    animatedElementsArray.forEach((el, index) => {
        const textToType = el.dataset.originalText;
        if (typeof textToType === 'string') {
            typewriterEffect(el, textToType, 20); 
        } else {
            console.warn("Element found for animation, but 'data-original-text' is missing or not a string:", el);
        }
    });
}

window.addEventListener('load', () => {
    console.log('Page content fully loaded, preparing text animations.');

    const mainContent = document.getElementById('hero-text-content');
    if (!mainContent) {
        console.error("Error: Could not find element with ID 'hero-text-content'. Animations will not run.");
        return;
    }

    const elementsToAnimate = mainContent.querySelectorAll('[data-animate-text-target]');
    elementsToAnimate.forEach(el => {
        el.dataset.originalText = el.textContent ? el.textContent.trim() : "";
        el.textContent = ''; 
    });

    startTextAnimations();
})