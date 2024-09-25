const dataUrl = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';
const itemsPerPage = 10;
let currentPage = 1;
let data = [];

// Fetch data from the provided URL
fetch(dataUrl)
  .then(response => response.json())
  .then(fetchedData => {
    data = fetchedData;
    displayItems(currentPage);
  })
  .catch(error => console.error('Error fetching data:', error));

function displayItems(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data.slice(startIndex, endIndex);

    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '<ul>' + itemsToDisplay.map(item => `<li>ID: ${item.id} - Name: ${item.name} - Email: ${item.email}</li>`).join('') + '</ul>';

    displayPagination(page);
}

function displayPagination(page) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';

    // Previous Button
    const prevButton = document.createElement('a');
    prevButton.className = 'prev-next page-link';
    prevButton.href = '#';
    prevButton.textContent = 'Previous';
    prevButton.onclick = function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayItems(currentPage);
        }
    };
    paginationControls.appendChild(prevButton);

    // Page Links
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('div');
        pageItem.className = 'page-item' + (i === page ? ' active' : '');
        
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.onclick = function (e) {
            e.preventDefault();
            currentPage = i;
            displayItems(currentPage);
        };

        pageItem.appendChild(pageLink);
        paginationControls.appendChild(pageItem);
    }

    // Next Button
    const nextButton = document.createElement('a');
    nextButton.className = 'prev-next page-link';
    nextButton.href = '#';
    nextButton.textContent = 'Next';
    nextButton.onclick = function (e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            displayItems(currentPage);
        }
    };
    paginationControls.appendChild(nextButton);
}
