const contentDiv = document.getElementById("content");
const showDogBtn = document.getElementById("button-random-dog");

showDogBtn.addEventListener("click", async () => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  if (response.ok) {
    const data = await response.json();
    if (data.status === "success") {
      const imageUrl = data.message;
      let imgElement = document.getElementById("dog-img");
      if (imgElement === null) {
        imgElement = document.createElement("img");
        imgElement.setAttribute("alt", "dog image");
        imgElement.setAttribute("id", "dog-img");
        contentDiv.appendChild(imgElement);
      }
      imgElement.setAttribute("src", imageUrl);
    }
  }
})