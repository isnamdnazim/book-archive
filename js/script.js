// take the search value and fetch the API
const searchBook = () => {
    const searchBook = document.getElementById('search-field');
    const noData = document.getElementById('no-data');
    const searchText = searchBook.value;
    searchBook.value = '';

    spinner('block');
    showSearchResultNumber('none');
    showSearchResult('none');

    // showing a alert when user will search with empty string
    if (searchText === '') {
        // error massage("Search with a name, please!");
        noData.textContent = '';
        noData.innerText = "Please Search With a Name";
        spinner('none');
    }
    else {
        noData.textContent = '';
        //fetch the API
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data))
    }
};


// showing search result in cards.
const displaySearchResult = data => {
    const totalBooks = document.getElementById('total-number-of-books');
    const searchResult = document.getElementById('search-result');
    totalBooks.textContent = '';

    // Showing the how many books are showing in the page after searching
    const TotalBookDiv = document.createElement('div');
    TotalBookDiv.innerHTML = `
    <div class="container border rounded mb-5
    ">
    <h4 class="mt-5 text-uppercase text-center text-dark">Total <span class="text-success"> ${data.numFound}</span> Books Found By Search.</h4>
    <h5 class="text-dark  text-center">First <span class="text-success"> ${data.docs.length}</span> Books Showing in this page.</h5>
    </div> 
    `;
    totalBooks.appendChild(TotalBookDiv)

    if (data.numFound === 0) {
        const noData = document.getElementById('no-data');
        noData.textContent = '';
        noData.innerText = "No Result Found";
        spinner('none');

    }
    searchResult.textContent = '';
    // displaying the book information that are searched by the user
    const dataFound = data.docs;
    dataFound.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-thumbnail image-hight-weight rounded" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Book Name: ${book.title}</h5>
                        <p class="card-text">Author Name: <b>${book.author_name}</b> </p>
                        <p class="card-text">Book Publisher: <i>${book.publisher}</i></p>
                        <p class="card-text">First Publication Year: ${book.first_publish_year}</p>
                    </div>
                </div>
        `;

        searchResult.appendChild(div)
        showSearchResultNumber('block');
        showSearchResult('flex');
        spinner('none');
    });




};

// spinner toggol
const spinner = displayType => {
    document.getElementById('spinner').style.display = displayType;
};

// showing total search result number toggol
const showSearchResultNumber = displayType => {
    document.getElementById('total-number-of-books').style.display = displayType;
};

// showing search result toggol
const showSearchResult = displayType => {
    document.getElementById('search-result').style.display = displayType;
};