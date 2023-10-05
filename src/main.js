const contentDiv = document.getElementById("content");
const showDogBtn = document.getElementById("button-random-dog");
const showBreedBtn = document.getElementById("button-show-breed");
const inputBreed = document.getElementById("input-breed");
const randomUrl = "https://dog.ceo/api/breeds/image/random";

showDogBtn.addEventListener("click", () => fetchImage(randomUrl));
showBreedBtn.addEventListener("click", () => {
  const breed = inputBreed.value.toLowerCase();
  const breedRandomUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
  return fetchImage(breedRandomUrl);
});

async function fetchImage(url) {
  try {
    const response = await fetch(url);
    if (response.status >= 400) {
      let errorParagraph = document.createElement("p");
      errorParagraph.innerText = "Breed not found!";
      contentDiv.innerHTML = errorParagraph.outerHTML;
    } else {
      const data = await response.json();
      const imageUrl = data.message;
      let imgElement = document.createElement("img");
      imgElement.alt = "dog image";
      imgElement.id = "dog-img";
      imgElement.src = imageUrl;
      contentDiv.innerHTML = imgElement.outerHTML;
    }
  } catch (error) {
    console.log(error);
  }
}