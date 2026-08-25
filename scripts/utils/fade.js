function fadeIn(element, duration) {
    return new Promise((resolve) => {
        element.style.opacity = 0;
        element.style.display = "flex"; // Or your preferred display value
        
        let start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            element.style.opacity = Math.min(progress / duration, 1);
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                element.style.opacity = 1; // Ensure final state is full opacity
                resolve();
            }
        }
        window.requestAnimationFrame(step);
    });
}

function fadeOut(element, duration) {
    return new Promise((resolve) => {
        let start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            element.style.opacity = 1 - Math.min(progress / duration, 1);
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                element.style.opacity = 0;
                element.style.display = "none";
                resolve();
            }
        }
        window.requestAnimationFrame(step);
    });
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//fadeOut(#div, 500, function(){