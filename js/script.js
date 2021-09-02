// take the search value and fetch the API
const searchBook = () => {
    const searchBook = document.getElementById('search-field');
    const searchText = searchBook.value;
    searchBook.value = '';

    spinner('block');
    showSearchResultNumber('none');
    showSearchResult('none');

    // showing a alert when user will search with empty string
    if (searchText === '') {
        alert("Search with a name, please!");
        spinner('none');
    }
    else {
        //fetch the API
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.docs))
    }
};


//
const displaySearchResult = books => {
    console.log(books.length);
    const totalBooksShowing = books.length;
    const totalBooks = document.getElementById('total-number-of-books');
    const searchResult = document.getElementById('search-result');
    totalBooks.textContent = '';

    // Showing the how many books are showing in the page after searching
    const TotalBookDiv = document.createElement('div');
    TotalBookDiv.innerHTML = `
    <h4 class="mb-5 mt-5 text-uppercase text-center rounded">Total ${totalBooksShowing} Books Showing</h4>
    `;
    totalBooks.appendChild(TotalBookDiv);

    searchResult.textContent = '';

    // displaying the book information that are searched by the user
    books.forEach(book => {
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
        searchResult.appendChild(div);
        showSearchResultNumber('block');
        showSearchResult('flex');
        spinner('none');
    });



};

// spinner toggol
const spinner = displayType => {
    document.getElementById('spinner').style.display = displayType;
}

// showing total search result number toggol
const showSearchResultNumber = displayType => {
    document.getElementById('total-number-of-books').style.display = displayType;
}

// showing search result toggol
const showSearchResult = displayType => {
    document.getElementById('search-result').style.display = displayType;
}





fetch('http://openlibrary.org/search.json?q=javascript')
    .then(response => response.json())
    .then(data => console.log(data))