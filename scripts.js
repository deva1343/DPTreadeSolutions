// Search functionality
document.getElementById('search-bar').addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase();
    if (searchQuery.length > 2) {
        searchHSCode(searchQuery);
    }
});

function searchHSCode(query) {
    // This is a dummy function, replace it with real API or data fetch
    const results = [
        { hsCode: '123456', description: 'Electronic Goods', category: 'Electronics', tariff: '5%' },
        { hsCode: '234567', description: 'Clothing', category: 'Textiles', tariff: '10%' },
        { hsCode: '345678', description: 'Machinery Parts', category: 'Machinery', tariff: '7%' },
    ];

    const filteredResults = results.filter(item => item.description.toLowerCase().includes(query));
    
    // Display results
    const resultsContainer = document.getElementById('results-list');
    resultsContainer.innerHTML = '';
    filteredResults.forEach(item => {
        const resultCard = document.createElement('div');
        resultCard.classList.add('bg-gray-700', 'p-4', 'rounded', 'mb-4');
        resultCard.innerHTML = `
            <h3 class="font-semibold">HS Code: ${item.hsCode}</h3>
            <p>${item.description}</p>
            <p>Category: ${item.category}</p>
            <p>Tariff: ${item.tariff}</p>
        `;
        resultsContainer.appendChild(resultCard);
    });
}

// FAQ Accordion functionality
document.querySelectorAll('.faq-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.classList.toggle('hidden');
    });
});
