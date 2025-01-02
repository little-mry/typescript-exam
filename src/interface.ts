export interface Book {
    forEach(arg0: (book: any) => void): unknown
    id: number
    title: string
    author: string
    publisher: string
    year: number
    pages: number | null
    plot: string
    audience: string
    color: string
}
