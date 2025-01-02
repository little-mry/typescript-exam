const getRequiredElement = <T extends HTMLElement>(selector: string): T => {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Element with selector "${selector}" not found`);
    }
    return element as T;
};

export const elements = {
    mainStart: getRequiredElement<HTMLElement>('.main__start'),
    bookSite: getRequiredElement<HTMLElement>('.book-site__container'),
    bookCover: getRequiredElement<HTMLElement>('.selected-book-cover'),
    bookDescription: getRequiredElement<HTMLElement>('.book-description'),
    audience: getRequiredElement<HTMLElement>('.audience'),
    published: getRequiredElement<HTMLElement>('.published'),
    pages: getRequiredElement<HTMLElement>('.pages'),
    publisher: getRequiredElement<HTMLElement>('.publisher'),
    backBtn: getRequiredElement<HTMLButtonElement>('.btn-back'),
    bookList: getRequiredElement<HTMLElement>('.search-list'),
    searchDropdown: getRequiredElement<HTMLElement>('.search-dropdown'),
    searchInput : getRequiredElement<HTMLInputElement>('#search') 
};
