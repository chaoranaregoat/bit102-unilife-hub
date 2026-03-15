/* =========================================
   JS Interaction 1: Category Filter System
   For: life-guide.html
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Select all filter buttons and all content cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card-item');
    const noResultsMsg = document.getElementById('no-results');

    // 2. Add click event listener to each button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to clicked button
            button.classList.add('active');

            // Get the category value from data-filter attribute
            const filterValue = button.getAttribute('data-filter');

            let visibleCount = 0;

            // 3. Loop through all cards to show/hide
            cards.forEach(card => {
                if (filterValue === 'all') {
                    // Show all cards
                    card.style.display = 'block';
                    // Add animation class (optional, requires CSS)
                    card.classList.add('fade-in');
                    visibleCount++;
                } else {
                    // Check if the card has the specific category class
                    if (card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                }
            });

            // 4. Show "No Results" message if nothing matches
            if (visibleCount === 0) {
                noResultsMsg.classList.remove('d-none');
            } else {
                noResultsMsg.classList.add('d-none');
            }
        });
    });
});

/* 
   Note: We will add the Currency Converter logic (Interaction 2) 
   in the next step when we build tools.html 
*/
/* =========================================
   (Previous Code: Category Filter System is above...)
   ========================================= */


/* =========================================
   JS Interaction 2: Currency Converter
   For: tools.html
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we are on the tools page by looking for specific elements
    const convertBtn = document.getElementById('convert-btn');
    
    if (convertBtn) {
        const amountInput = document.getElementById('amount');
        const currencyType = document.getElementById('currency-type');
        const resultArea = document.getElementById('result-area');
        const resultValue = document.getElementById('result-value');
        const resultDetail = document.getElementById('result-detail');

        // Fixed Exchange Rate (For demonstration purposes as per assignment)
        // 1 CNY = 0.65 MYR (You can update this rate as needed)
        const RATE_CNY_TO_MYR = 0.57; 
        const RATE_MYR_TO_CNY = 1 / RATE_CNY_TO_MYR; // Approx 1.54

        convertBtn.addEventListener('click', function() {
            // 1. Get values
            const amount = parseFloat(amountInput.value);
            const type = currencyType.value;

            // 2. Validation
            if (isNaN(amount) || amount <= 0) {
                // Show Bootstrap validation style
                amountInput.classList.add('is-invalid');
                resultArea.classList.add('d-none'); // Hide result if invalid
                return;
            } else {
                amountInput.classList.remove('is-invalid');
            }

            // 3. Calculation Logic
            let finalAmount = 0;
            let detailText = "";

            if (type === 'cny-to-myr') {
                finalAmount = amount * RATE_CNY_TO_MYR;
                detailText = `${amount.toFixed(2)} CNY = ${finalAmount.toFixed(2)} MYR`;
            } else {
                finalAmount = amount * RATE_MYR_TO_CNY;
                detailText = `${amount.toFixed(2)} MYR = ${finalAmount.toFixed(2)} CNY`;
            }

            // 4. Display Result
            resultValue.textContent = finalAmount.toFixed(2);
            resultDetail.textContent = detailText;
            
            // Show the result area with a simple fade-in effect
            resultArea.classList.remove('d-none');
            resultArea.classList.add('fade-in');
        });

        // Clear error when user starts typing again
        amountInput.addEventListener('input', function() {
            if (this.value > 0) {
                this.classList.remove('is-invalid');
            }
        });
    }
});