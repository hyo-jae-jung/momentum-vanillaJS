const images = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "blackholexray.png",
    "uranus_lg.jpeg",
    "potw2119a.jpg",
    "sunrise.jpg",
    "halloween_sun.jpg"
];

const chosenImage = images[Math.floor(Math.random() * images.length)]

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

document.body.prepend(bgImage);
bgImage.classList.add("bgImage")