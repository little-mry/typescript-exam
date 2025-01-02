import { apiData, createBookArray, validBooks } from "./api.js";
import { Book } from "./interface.js";
import { searchEvent, inputEvent } from "./eventlisteners.js";




apiData()
createBookArray()
searchEvent
inputEvent

function sanitizeHTML(input: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = input;
    return tempDiv.innerHTML;
}

export const createBooks = async(validBooks: Book[]) => {
        validBooks.forEach(book => {
           bookCovers  = document.createElement('article')
           bookCovers.classList.add('book-cover__container')

           const safeTitle = sanitizeHTML(book.title);
           const safeAuthor = sanitizeHTML(book.author);


            bookCovers.innerHTML =   `<div class="line"> </div>
            <section class="book-cover__info">
                <h2 class="book-title">${safeTitle}</h2>
                <h3 class="book-author">${safeAuthor}</h3>
            </section>`

            bookCovers.style.background = `${book.color}`
            if(mainStart) mainStart.appendChild(bookCovers)
            
            bookCovers.addEventListener('click', () => {
                bookSite.classList.remove('hidden')
                showSelectedBook(book)
            })
                
        });        
}


const showSelectedBook = (selectedBook: Book) => {
    if (backBtn && !backBtn.dataset.listenerAdded) {
        backBtn.addEventListener('click', () => {
            bookSite.classList.add('hidden');
        });
        backBtn.dataset.listenerAdded = 'true'; 
    }
    
    const safeTitle = sanitizeHTML(selectedBook.title);
    const safeAuthor = sanitizeHTML(selectedBook.author);
    const safePlot = sanitizeHTML(selectedBook.plot);


    bookCover.innerHTML = 
    `<div class="line"></div>
    <section class="book-cover__info">
    <h2 class="book-title book-title--black">${safeTitle}</h2>
    <h3 class="book-author book-author--black">${safeAuthor}</h3>
    </section>`

    bookDescription.innerHTML = 
    `<h2 class="book-title ">${safeTitle}</h2>
    <h3 class="book-author ">${safeAuthor}</h3>
    <p class="book-plot">${safePlot}</p>
    `
    audience.textContent = selectedBook.audience
    published.textContent = selectedBook.year.toString()
    publisher.textContent = selectedBook.publisher
    if (selectedBook.pages === null) 
        {pages.textContent = 'Ingen info'
    } else {
        pages.textContent = selectedBook.pages.toString()
    } 
    
}



export const searchBook = () => {
    if (bookList) bookList.replaceChildren()
    const searchTerm = searchInput.value.toLowerCase()

    if(!searchTerm) {
        console.log('sökfältet är tomt');
        return
    }
    
    const bookMatch: Book[] = validBooks.filter(book => {
        const authorLower = book.author.toLowerCase()
        const titleLower = book.title.toLowerCase()

        return (authorLower.includes(searchTerm) || titleLower.includes(searchTerm))
    })

    if (bookMatch.length > 0) {
        bookMatch.forEach(book => {
            const listItem: HTMLElement = document.createElement('li')
            listItem.classList.add('search-list__item')
            listItem.textContent = `${book.title} av ${book.author}`

            listItem.addEventListener('click', () => {
                bookSite.classList.remove('hidden')
                showSelectedBook(book)
                 if(searchDropdown) searchDropdown.style.visibility = 'hidden'
                searchInput.value = ''
            })

            if(bookList) bookList.appendChild(listItem)

        });


    } else {
        const noMatch: HTMLElement = document.createElement('li')
        noMatch.classList.add('search-list__item')
        noMatch.textContent = 'Inga matchande böcker hittades'

        if (bookList) bookList.append(noMatch)
    }

    if(searchDropdown) searchDropdown.style.visibility = 'visible'

    
}

