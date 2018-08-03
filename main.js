const API_URL = "https://pixabay.com/api";
const API_KEY = '';
const form = document.querySelector("form");
const input = document.querySelector("input");
const loadingImage = document.querySelector("#loadingImage");
const imageSection = document.querySelector(".images");

loadingImage.style.display = 'none';
form.addEventListener("submit", formSubmitted);

function searchStart() {
    loadingImage.style.display = '';
    imageSection.innerHTML = '';
}

function formSubmitted(event) {
    event.preventDefault();
    const searchTerm = input.value;

    searchStart();
    search(searchTerm)
        .then(displayImages)
        .then(() => {
            loadingImage.style.display = 'none';
        });
}

function search(searchTerm) {
    const url = `${API_URL}?key=${API_KEY}&q=${searchTerm}&image_type=photo`;
    return fetch(url)
        .then(response => response.json())
        .then(result => {
            return result.hits;
        });
}

function displayImages(images) {
    images.forEach(image => {
        const imageElement = document.createElement("img");
        imageElement.src = image.webformatURL;
        imageElement.title =  image.tags;
        imageSection.appendChild(imageElement);
    })
}
