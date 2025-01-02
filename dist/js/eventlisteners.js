var _a;
import { searchBook } from "./script.js";
import { elements } from "./elements.js";
export const searchEvent = document.addEventListener('click', (event) => {
    if (elements.searchDropdown && event.target instanceof Node && !elements.searchDropdown.contains(event.target)) {
        elements.searchDropdown.style.visibility = 'hidden';
        elements.searchInput.value = '';
    }
});
export const inputEvent = (_a = elements.searchInput) === null || _a === void 0 ? void 0 : _a.addEventListener('input', () => {
    searchBook();
});
