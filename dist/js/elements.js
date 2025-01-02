const getRequiredElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Element with selector "${selector}" not found`);
    }
    return element;
};
export const elements = {
    mainStart: getRequiredElement('.main__start'),
    bookSite: getRequiredElement('.book-site__container'),
    bookCover: getRequiredElement('.selected-book-cover'),
    bookDescription: getRequiredElement('.book-description'),
    audience: getRequiredElement('.audience'),
    published: getRequiredElement('.published'),
    pages: getRequiredElement('.pages'),
    publisher: getRequiredElement('.publisher'),
    backBtn: getRequiredElement('.btn-back'),
    bookList: getRequiredElement('.search-list'),
    searchDropdown: getRequiredElement('.search-dropdown'),
    searchInput: getRequiredElement('#search')
};
