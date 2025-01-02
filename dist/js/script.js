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
import { searchEvent, inputEvent } from "./eventlisteners.js";
import { elements } from "./elements.js";
let bookCovers;
apiData();
createBookArray();
searchEvent;
inputEvent;
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
        bookCovers.style.background = `linear-gradient(208.29deg, rgba(255, 255, 255, 0.35),${book.color}`;
        if (elements.mainStart)
            elements.mainStart.appendChild(bookCovers);
        bookCovers.addEventListener('click', () => {
            elements.bookSite.classList.remove('hidden');
            showSelectedBook(book);
        });
    });
});
const showSelectedBook = (selectedBook) => {
    if (elements.backBtn && !elements.backBtn.dataset.listenerAdded) {
        elements.backBtn.addEventListener('click', () => {
            elements.bookSite.classList.add('hidden');
        });
        elements.backBtn.dataset.listenerAdded = 'true';
    }
    elements.bookCover.style.background = `linear-gradient(208.29deg, rgba(255, 255, 255, 0.5), ${selectedBook.color}`;
    const safeTitle = sanitizeHTML(selectedBook.title);
    const safeAuthor = sanitizeHTML(selectedBook.author);
    const safePlot = sanitizeHTML(selectedBook.plot);
    elements.bookCover.innerHTML =
        `<div class="line"></div>
    <section class="book-cover__info">
    <h2 class="book-title book-title--black">${safeTitle}</h2>
    <h3 class="book-author book-author--black">${safeAuthor}</h3>
    </section>`;
    elements.bookDescription.innerHTML =
        `<h2 class="book-title ">${safeTitle}</h2>
    <h3 class="book-author ">${safeAuthor}</h3>
    <p class="book-plot">${safePlot}</p>
    `;
    elements.audience.textContent = selectedBook.audience;
    elements.published.textContent = selectedBook.year.toString();
    elements.publisher.textContent = selectedBook.publisher;
    if (selectedBook.pages === null) {
        elements.pages.textContent = 'Ingen info';
    }
    else {
        elements.pages.textContent = selectedBook.pages.toString();
    }
};
export const searchBook = () => {
    if (elements.bookList)
        elements.bookList.replaceChildren();
    const searchTerm = elements.searchInput.value.toLowerCase();
    if (!searchTerm) {
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
                elements.bookSite.classList.remove('hidden');
                showSelectedBook(book);
                if (elements.searchDropdown)
                    elements.searchDropdown.style.visibility = 'hidden';
                elements.searchInput.value = '';
            });
            if (elements.bookList)
                elements.bookList.appendChild(listItem);
        });
    }
    else {
        const noMatch = document.createElement('li');
        noMatch.classList.add('search-list__item');
        noMatch.textContent = 'Inga matchande böcker hittades';
        if (elements.bookList)
            elements.bookList.append(noMatch);
    }
    if (elements.searchDropdown)
        elements.searchDropdown.style.visibility = 'visible';
};
