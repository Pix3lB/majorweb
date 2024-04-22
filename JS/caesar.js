function animateCipher() {
    const inputText = document.getElementById('inputText').value;
    const shiftValue = parseInt(document.getElementById('shift').value);
    visualizeCipher(inputText, shiftValue);
}

function animateDecipher() {
    const inputText = document.getElementById('inputText').value;
    const shiftValue = parseInt(document.getElementById('shift').value);
    visualizeDecipher(inputText, shiftValue);
}

function visualizeCipher(text, shift) {
    const visualization = document.getElementById('visualization');

    visualization.innerHTML = '';


    const intermediateSteps = [];

    for (let step = 0; step <= Math.abs(shift); step++) {
        intermediateSteps.push(caesarCipher(text, (shift < 0 ? -1 : 1) * step));
    }


    intermediateSteps.forEach((stepText, index) => {
        setTimeout(() => {
            visualization.innerHTML = '';

            const animatedText = document.createElement('span');
            animatedText.className = 'animated-text';
            animatedText.innerText = stepText;


            animatedText.style.animation = index === 0 ? 'fadeInSlow 0.8s forwards' : 'fadeIn 0.5s forwards';

            visualization.appendChild(animatedText);

            if (index === intermediateSteps.length - 1) {
                visualization.innerHTML = '';
                const finalResult = document.createElement('span');
                finalResult.innerText = stepText;
                visualization.appendChild(finalResult);
            }
        }, index * 800); 
    });
}

function visualizeDecipher(text, shift) {
    visualizeCipher(text, -shift);
}

function caesarCipher(text, shift) {
    return text.replace(/[a-zA-Z]/g, function (char) {
        const charCode = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const shiftAmount = (charCode - (isUpperCase ? 65 : 97) + shift) % 26;
        return String.fromCharCode((shiftAmount + 26) % 26 + (isUpperCase ? 65 : 97));
    });
}
