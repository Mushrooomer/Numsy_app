document.addEventListener('DOMContentLoaded', function() {
    const binaryInput = document.getElementById('binaryInput');
    const convertButton = document.getElementById('convertButton');
    const clearButton = document.getElementById('clearButton');
    const result = document.getElementById('result');

    function isValidBinary(binary) {
        return /^[01]+$/.test(binary);
    }

    function binaryToDecimal(binary) {
        let decimal = 0;
        let power = 0;

        for (let i = binary.length - 1; i >= 0; i--) {
            if (binary[i] === '1') {
                decimal += Math.pow(2, power);
            }
            power++;
        }

        return decimal;
    }

    function convert() {
        try {
            const binary = binaryInput.value.trim();
            
            if (!binary) {
                throw new Error('Please enter a binary number');
            }

            if (!isValidBinary(binary)) {
                throw new Error('Invalid binary number! Use only 0s and 1s');
            }

            const decimal = binaryToDecimal(binary);
            result.textContent = `Decimal: ${decimal}`;
            result.style.color = '#333';

        } catch (error) {
            result.textContent = error.message;
            result.style.color = '#dc3545';
        }
    }

    function clear() {
        binaryInput.value = '';
        result.textContent = '';
    }

    convertButton.addEventListener('click', convert);
    clearButton.addEventListener('click', clear);

    // Allow conversion when pressing Enter
    binaryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convert();
        }
    });

    // Add conversion history functionality
    let conversionHistory = [];

    function addToHistory(binary, decimal, success) {
        const time = new Date().toLocaleTimeString();
        const entry = {
            time,
            binary,
            decimal,
            success
        };
        
        conversionHistory.unshift(entry);
        if (conversionHistory.length > 10) conversionHistory.pop(); // Keep last 10 entries
        updateHistoryDisplay();
    }

    function updateHistoryDisplay() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = conversionHistory.map(entry => `
            <li class="history-item">
                ${entry.time} - ${entry.success ? 
                    `Binary: ${entry.binary} → Decimal: ${entry.decimal}` : 
                    `Failed: ${entry.binary}`}
            </li>
        `).join('');
    }

    // Update the event listener to include history
    document.getElementById('convertButton').addEventListener('click', function() {
        const resultElement = document.getElementById('result');
        
        try {
            const binaryInput = document.getElementById('binaryInput').value.trim();
            
            if (!binaryInput) {
                throw new Error('Please enter a binary number');
            }
            
            if (!isValidBinary(binaryInput)) {
                throw new Error('Invalid binary input - use only 0s and 1s');
            }
            
            const decimal = binaryToDecimal(binaryInput);
            resultElement.textContent = `Decimal: ${decimal}`;
            resultElement.style.color = '#28a745';
            
            // Add successful conversion to history
            addToHistory(binaryInput, decimal, true);
            
        } catch (error) {
            resultElement.textContent = error.message;
            resultElement.style.color = '#dc3545';
            
            // Add failed conversion to history
            addToHistory(document.getElementById('binaryInput').value, null, false);
        }
    });

    // Update clear button to also clear history
    document.getElementById('clearButton').addEventListener('click', function() {
        document.getElementById('binaryInput').value = '';
        document.getElementById('result').textContent = '';
        conversionHistory = [];
        updateHistoryDisplay();
    });
}); 