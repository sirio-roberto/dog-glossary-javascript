const contentDiv = document.getElementById("content");
const showDogBtn = document.getElementById("button-random-dog");
const showBreedBtn = document.getElementById("button-show-breed");
const showSubBreedBtn = document.getElementById("button-show-sub-breed");
const showAllBreedsBtn = document.getElementById("button-show-all");
const inputBreed = document.getElementById("input-breed");
const randomUrl = "https://dog.ceo/api/breeds/image/random";

showDogBtn.addEventListener("click", () => fetchImage(randomUrl));
showBreedBtn.addEventListener("click", () => {
  const breed = inputBreed.value.toLowerCase();
  const breedRandomUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
  return fetchImage(breedRandomUrl);
});
showSubBreedBtn.addEventListener("click", () => fetchSubBreedList());
showAllBreedsBtn.addEventListener("click", () => fetchAllBreedsList());

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

async function fetchSubBreedList(){
  try {
    const url = `https://dog.ceo/api/breed/${inputBreed.value.toLowerCase()}/list`;
    const response = await fetch(url);
    if (response.status >= 400) {
      let errorParagraph = document.createElement("p");
      errorParagraph.innerText = "Breed not found!";
      contentDiv.innerHTML = errorParagraph.outerHTML;
    } else {
      const data = await response.json();
      const breedArray = data.message;

      if (breedArray.length === 0) {
        let errorParagraph = document.createElement("p");
        errorParagraph.innerText = "No sub-breeds found!";
        contentDiv.innerHTML = errorParagraph.outerHTML;
      } else {
        const orderedList = document.createElement("ol");
        breedArray.forEach(breed => {
          const item = document.createElement("li");
          item.innerText = breed;
          orderedList.append(item);
        });
        contentDiv.innerHTML = orderedList.outerHTML;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchAllBreedsList(){
  try {
    const url = `https://dog.ceo/api/breeds/list/all`;
    const response = await fetch(url);
    const data = await response.json();
    const allBreedsObj = data.message;
    const keys = Object.keys(allBreedsObj);

    const orderedList = document.createElement("ol");
    keys.forEach(breed => {
      const item = document.createElement("li");
      item.innerText = breed;
      orderedList.append(item);

      if (allBreedsObj[breed].length > 0) {
        const subBreeds = allBreedsObj[breed];
        const uList = document.createElement("ul");
        subBreeds.forEach(sub => uList.insertAdjacentHTML("afterbegin", `<li>${sub}</li>`));
        item.append(uList);
      }
    });
    contentDiv.innerHTML = orderedList.outerHTML;

  } catch (error) {
    console.log(error);
  }
}