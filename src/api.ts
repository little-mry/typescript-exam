import { Book } from "./interface.js";
import { createBooks } from "./script.js";

const url: string = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"
export let validBooks: Book[];

export const apiData = async(): Promise< Book[] | undefined > =>  {
    try {
        
        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error(`HTTP-fel! Status: ${response.status}`);
        }
            const data: Book[] = await response.json()
            
            return data

        } catch (error) { 
            console.error("Error fetching data:", error);
            throw error;
    }
    
}

export const createBookArray = async () => {
        try {
            
            const books: unknown = await apiData();
    
            if (!Array.isArray(books)) {
                throw new Error("API-data är inte en array!");
            }
    
            validBooks = books as Book[] 
            console.log('valid books: ', validBooks);
            
            createBooks(validBooks)
                
            } catch (error) {
                console.error("Något gick fel:", error);
            }
}