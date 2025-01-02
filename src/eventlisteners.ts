import { searchBook } from "./script.js";

const searchDropdown: HTMLElement | null = document.querySelector('.search-dropdown')
const searchInput : HTMLInputElement = document.querySelector('#search') as HTMLInputElement

export const searchEvent = document.addEventListener('click', (event) => {
    if (searchDropdown && event.target instanceof Node && !searchDropdown.contains(event.target)) {
        searchDropdown.style.visibility = 'hidden';
        searchInput.value = '';
    }
});


export const inputEvent = searchInput?.addEventListener('input', () => {
        searchBook()

})