export default function articleValidatorFunction ({title, author, text, published}){
    if (!title) throw new Error("Title can't be empty");
    if (typeof title !== 'string') throw new Error("Title must be string");
    
    if (!author) throw new Error("Author can't be empty");
    if (typeof author !== 'string') throw new Error("Author must be string");

    if (!text) throw new Error("Text can't be empty");
    if (typeof text !== 'string') throw new Error("Text must be string");

    if (!published) throw new Error("Published can't be empty");
    if (typeof published !== 'boolean') throw new Error("Published must be boolean");

    return{
        getTitle: () => title,
        getAuthor: () => author,
        getText: () => text,
        getPublished: () => published
    }
}