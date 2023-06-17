const darkModeToggle = document.querySelector(".switch input");
const feedContainer = document.querySelector(".layout-container");
const loadMoreButton = document.querySelector(".load-more");
const darmModeSwitch = () => {
  document.body.classList.toggle("darkmode");
};

let postData;
let loadedCards = 4;
const cardsPerLoad = 4;
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    postData = data;
    renderCards(0, cardsPerLoad);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function renderCards(startIndex, endIndex) {
  for (let i = startIndex; i < endIndex; i++) {
    const post = postData[i];

    const postElement = document.createElement("div");
    postElement.className = "post";

    const postHTML = `
        <div class="post-header">
          <img class="avatar" src="${post.profile_image}" alt="Avatar">
          <div class="post-info">
            <h3 class="name">${post.name}</h3>
            <p class="date">${post.date}</p>
          </div>
        </div>
        <img class="post-image" src="${post.image}" alt="Post Image">
        <div class="post-caption">
            <small><i class="fa-regular fa-heart"></i>${post.likes}</small>
          <p class="line-clamp">${post.caption}</p>
        </div>
      `;

    postElement.innerHTML = postHTML;
    feedContainer.appendChild(postElement);
  }
}
function handleImgClick(e) {
  const target = e.target;

  // Check if the clicked element has a specific class or selector
  if (target.classList.contains("post-image")) {
    // Perform your desired action here
    const imageURL = target.getAttribute("src");
    // console.log(imageURL)
    openModal(imageURL);
  }
}
function openModal(imageURL) {
  const modal = document.createElement("dialog");
  modal.classList.add("modal");

  const modalImage = document.createElement("img");
  modalImage.setAttribute("src", imageURL);

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", () => modal.close());
  
  
  modal.appendChild(modalImage);
  modal.appendChild(closeButton);
  
  document.body.appendChild(modal);
  modal.showModal();
}

loadMoreButton.addEventListener("click", () => {
  const remainingCards = postData.length - loadedCards;
  if (remainingCards > 0) {
    const cardsToLoad = Math.min(remainingCards, cardsPerLoad);
    renderCards(loadedCards, loadedCards + cardsToLoad);
    loadedCards += cardsToLoad;
  }
  if (loadedCards === postData.length) {
    loadMoreButton.style.display = "none";
  }
});

feedContainer.addEventListener("click", handleImgClick);
darkModeToggle.addEventListener("click", darmModeSwitch);
