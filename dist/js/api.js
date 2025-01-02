var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBooks } from "./script.js";
const url = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
export let validBooks;
export const apiData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP-fel! Status: ${response.status}`);
        }
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});
export const createBookArray = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield apiData();
        if (!Array.isArray(books)) {
            throw new Error("API-data är inte en array!");
        }
        validBooks = books;
        createBooks(validBooks);
    }
    catch (error) {
        console.error("Något gick fel:", error);
    }
});
