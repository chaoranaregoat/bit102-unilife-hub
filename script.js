/* JS Interaction 1: Category Filter System.
   For: life-guide.html..*/

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card-item');
    const noResultsMsg = document.getElementById('no-results');

    if (filterButtons.length > 0) {
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                let visibleCount = 0;

                cards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                        visibleCount++;
                    } else {
                        if (card.classList.contains(filterValue)) {
                            card.style.display = 'block';
                            visibleCount++;
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });

                if (visibleCount === 0) {
                    noResultsMsg.classList.remove('d-none');
                } else {
                    noResultsMsg.classList.add('d-none');
                }
            });
        });

       
        const hash = window.location.hash.substring(1); 
        if (hash) {
            const targetBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
            if (targetBtn) {
                targetBtn.click();
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }
        }
    }
});

/*JS Interaction 2: Currency Converter.
   For:tools.html. */

document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convert-btn');
    
    if (convertBtn) {
        const amountInput = document.getElementById('amount');
        const currencyType = document.getElementById('currency-type');
        const resultArea = document.getElementById('result-area');
        const resultValue = document.getElementById('result-value');
        const resultDetail = document.getElementById('result-detail');

        const RATE_CNY_TO_MYR = 0.57; 
        const RATE_MYR_TO_CNY = 1 / RATE_CNY_TO_MYR; 

        convertBtn.addEventListener('click', function() {
            const amount = parseFloat(amountInput.value);
            const type = currencyType.value;

            if (isNaN(amount) || amount <= 0) {
                amountInput.classList.add('is-invalid');
                resultArea.classList.add('d-none'); 
                return;
            } else {
                amountInput.classList.remove('is-invalid');
            }

            let finalAmount = 0;
            let detailText = "";

            if (type === 'cny-to-myr') {
                finalAmount = amount * RATE_CNY_TO_MYR;
                detailText = `${amount.toFixed(2)} CNY = ${finalAmount.toFixed(2)} MYR`;
            } else {
                finalAmount = amount * RATE_MYR_TO_CNY;
                detailText = `${amount.toFixed(2)} MYR = ${finalAmount.toFixed(2)} CNY`;
            }

            resultValue.textContent = finalAmount.toFixed(2);
            resultDetail.textContent = detailText;
            
            resultArea.classList.remove('d-none');
            resultArea.classList.add('fade-in');
        });

        amountInput.addEventListener('input', function() {
            if (this.value > 0) {
                this.classList.remove('is-invalid');
            }
        });
    }
});