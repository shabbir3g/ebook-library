const searchBook = () => {

    const searchField = document.getElementById('search-field');

    
    const searchText = searchField.value;
    toggleSpinner('block');
    booksToogleContainier('none');
    url = `http://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs));

    searchField.value = '';
}

const notification = ( indendifier, content) => {
    const notification = document.getElementById('notification');
    
    notification.innerHTML = `
        <div class="alert alert-${indendifier}">${content}</div>`
}

const toggleSpinner = displayStyle => {

    document.getElementById('spinner').style.display = displayStyle;

}

const booksToogleContainier = displayStyle => {

    document.getElementById('books-containier').style.display = displayStyle;

}


const displaySearchResult = (books) => {

    if(books.length === 0){
        notification('danger', 'No Search Results Found');
        
       
    
    }else{
        notification('success', `${books.length} Books Found On Search Results`);
      
    }
    
    
    const bookContainer = document.getElementById('display-books');
    bookContainer.textContent = "";
    books.forEach(book => {
        
        const div = document.createElement('div');
        bookImage = `https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg`;
        div.classList.add('col');
        div.innerHTML = ` 
        <div class="card h-100">
            <img src="${book.cover_i ? bookImage: 'images/book-placeholder.png'}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">
            <strong>Book's Author: </strong>${book.author_name? book.author_name[0] : '' } <br>
            <strong>Book's Publisher: </strong>${book.publisher? book.publisher[0]: ''} <br>
            <strong>First Publish Year: </strong>${book.first_publish_year? book.first_publish_year: ''} <br>
            </p>
            </div>
            <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
        `;
        bookContainer.appendChild(div);
        console.log(book);

      
    
    
    });

    toggleSpinner('none');
    booksToogleContainier('block');
    
}

