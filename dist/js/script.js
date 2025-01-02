var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiData, createBookArray, validBooks } from "./api.js";
let bookCovers;
const searchInput = document.querySelector('#search');
const bookSite = document.querySelector('.book-site__container');
const mainStart = document.querySelector('.main__start');
const bookCover = document.querySelector('.selected-book-cover');
const bookDescription = document.querySelector('.book-description');
const audience = document.querySelector('.audience');
const published = document.querySelector('.published');
const pages = document.querySelector('.pages');
const publisher = document.querySelector('.publisher');
const backBtn = document.querySelector('.btn-back');
const bookList = document.querySelector('.search-list');
const searchDropdown = document.querySelector('.search-dropdown');
apiData();
createBookArray();
function sanitizeHTML(input) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = input;
    return tempDiv.innerHTML;
}
export const createBooks = (validBooks) => __awaiter(void 0, void 0, void 0, function* () {
    validBooks.forEach(book => {
        bookCovers = document.createElement('article');
        bookCovers.classList.add('book-cover__container');
        const safeTitle = sanitizeHTML(book.title);
        const safeAuthor = sanitizeHTML(book.author);
        bookCovers.innerHTML = `<div class="line"> </div>
            <section class="book-cover__info">
                <h2 class="book-title">${safeTitle}</h2>
                <h3 class="book-author">${safeAuthor}</h3>
            </section>`;
        bookCovers.style.background = `${book.color}`;
        if (mainStart)
            mainStart.appendChild(bookCovers);
        bookCovers.addEventListener('click', () => {
            bookSite.classList.remove('hidden');
            showSelectedBook(book);
        });
    });
});
const showSelectedBook = (selectedBook) => {
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            bookSite.classList.add('hidden');
        });
    }
    const safeTitle = sanitizeHTML(selectedBook.title);
    const safeAuthor = sanitizeHTML(selectedBook.author);
    const safePlot = sanitizeHTML(selectedBook.plot);
    bookCover.innerHTML =
        `<div class="line"></div>
    <section class="book-cover__info">
    <h2 class="book-title book-title--black">${safeTitle}</h2>
    <h3 class="book-author book-author--black">${safeAuthor}</h3>
    </section>`;
    bookDescription.innerHTML =
        `<h2 class="book-title ">${safeTitle}</h2>
    <h3 class="book-author ">${safeAuthor}</h3>
    <p class="book-plot">${safePlot}</p>
    `;
    audience.textContent = selectedBook.audience;
    published.textContent = selectedBook.year.toString();
    publisher.textContent = selectedBook.publisher;
    if (selectedBook.pages === null) {
        pages.textContent = 'Ingen info';
    }
    else {
        pages.textContent = selectedBook.pages.toString();
    }
};
const searchBook = () => {
    if (bookList)
        bookList.replaceChildren();
    const searchTerm = searchInput.value.toLowerCase();
    if (!searchTerm) {
        console.log('sökfältet är tomt');
        return;
    }
    const bookMatch = validBooks.filter(book => {
        const authorLower = book.author.toLowerCase();
        const titleLower = book.title.toLowerCase();
        return (authorLower.includes(searchTerm) || titleLower.includes(searchTerm));
    });
    if (bookMatch.length > 0) {
        bookMatch.forEach(book => {
            const listItem = document.createElement('li');
            listItem.classList.add('search-list__item');
            listItem.textContent = `${book.title} av ${book.author}`;
            listItem.addEventListener('click', () => {
                bookSite.classList.remove('hidden');
                showSelectedBook(book);
                if (searchDropdown)
                    searchDropdown.style.visibility = 'hidden';
                searchInput.value = '';
            });
            if (bookList)
                bookList.appendChild(listItem);
        });
    }
    else {
        const noMatch = document.createElement('li');
        noMatch.classList.add('search-list__item');
        noMatch.textContent = 'Inga matchande böcker hittades';
        if (bookList)
            bookList.append(noMatch);
    }
    if (searchDropdown)
        searchDropdown.style.visibility = 'visible';
    document.addEventListener('click', (event) => {
        if (searchDropdown && event.target instanceof Node && !searchDropdown.contains(event.target)) {
            searchDropdown.style.visibility = 'hidden';
            searchInput.value = '';
        }
    });
};
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('input', () => {
    searchBook();
});
