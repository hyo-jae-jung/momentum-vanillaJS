const quotes = [
    {
        quote: "know youself",
        author: "Socrates",
    },
    {
        quote: "If you would be a real seeker after truth, it is necessary that at least once in your life you doubt, as far as possible, all things.",
        author: "Rene Descartes",
    },
    {
        quote: "Don't get a job, get a legacy",
        author: "Park",
    },
]


const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const toDaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = `quote : ${toDaysQuote.quote}.`;
author.innerText = `author : ${toDaysQuote.author}`;
