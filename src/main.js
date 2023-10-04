const contentDiv = document.getElementById("content");
const showDogBtn = document.getElementById("button-random-dog");
const url = "https://dog.ceo/api/breeds/image/random";

showDogBtn.addEventListener("click", fetchImage);


async function fetchImage() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const imageUrl = data.message;
    let imgElement = document.createElement("img");
    imgElement.alt = "dog image";
    imgElement.id = "dog-img";
    imgElement.src = imageUrl;
    contentDiv.innerHTML = imgElement.outerHTML;
  } catch (error) {
    console.log("error when trying to fetch image");
  }
}