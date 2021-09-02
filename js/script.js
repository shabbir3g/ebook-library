// Search book function 
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchTitle = document.getElementById('search-title');
    
    const searchText = searchField.value;
    searchTitle.innerHTML = `Search results for: ${searchText}`;
    toggleSpinner('block');
    booksToggleContainier('none');
    url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs));

    searchField.value = '';
}

// Notification Message Function 
const notification = ( indendifier, content) => {
    const notification = document.getElementById('notification');
    notification.innerHTML = `
        <div class="alert alert-${indendifier}">${content}</div>`
}

// Toggle spinner function 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Toggle Books Container function 
const booksToggleContainier = displayStyle => {
    document.getElementById('books-containier').style.display = displayStyle;
}

// Toggle Books Container function 
const displaySearchResult = books => {

    // Display Message Error handaling 
    if(books.length === 0){
        notification('danger', `Sorry! No results found`);
    }
    else{
        notification('success', `${books.length} Books Found On Search Results`);
    }

    const bookContainer = document.getElementById('display-books');
    bookContainer.textContent = "";

    // Data forEach Loop
    books.forEach(book => {

        // Data adding to HTML
        const div = document.createElement('div');
        bookImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        div.classList.add('col');
        div.innerHTML = ` 
        <div class="card h-100">
            <img style="height: 436px; object-fit: contain;" src="${book.cover_i ? bookImage: 'images/book-placeholder.png'}" class="card-img-top" alt="Book image">
            <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">
            <strong>Book's Author: </strong>${book.author_name? book.author_name[0] : '' } <br>
            <strong>Book's Publisher: </strong>${book.publisher? book.publisher[0]: ''} <br>
            <strong>First Publish Year: </strong>${book.first_publish_year? book.first_publish_year: ''} <br>
            </p>
            </div>
        </div>`;

        bookContainer.appendChild(div);
    });

    toggleSpinner('none');
    booksToggleContainier('block');
    
}