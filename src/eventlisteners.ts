import { searchBook } from "./script.js";
import { elements } from "./elements.js";

export const searchEvent = document.addEventListener('click', (event) => {
    if (elements.searchDropdown && event.target instanceof Node && !elements.searchDropdown.contains(event.target)) {
        elements.searchDropdown.style.visibility = 'hidden';
        elements.searchInput.value = '';
    }
});

export const inputEvent = elements.searchInput?.addEventListener('input', () => {
        searchBook()
})