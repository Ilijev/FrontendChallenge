const darkModeToggle = document.querySelector(".switch input");
const feedContainer = document.querySelector(".layout-container");
const loadMoreButton = document.querySelector(".load-more")
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
    renderCards(0, cardsPerLoad)
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  function renderCards(startIndex, endIndex) {
     for (let i = startIndex; i < endIndex; i++) {
        const post = postData[i];
    
      const postElement = document.createElement('div');
      postElement.className = 'post';
  
      const postHTML = `
        <div class="post-header">
          <img class="avatar" src="${post.avatar}" alt="Avatar">
          <div class="post-info">
            <h3 class="name">${post.name}</h3>
            <p class="date">${post.date}</p>
          </div>
        </div>
        <img class="post-image" src="${post.image}" alt="Post Image">
        <div class="post-caption">
          <p class="line-clamp">${post.caption}</p>
        </div>
      `;
  
      postElement.innerHTML = postHTML;
      feedContainer.appendChild(postElement);
    };
  }

  loadMoreButton.addEventListener('click', () => {
    const remainingCards = postData.length - loadedCards;
    if (remainingCards > 0) {
        const cardsToLoad = Math.min(remainingCards, cardsPerLoad);
        renderCards(loadedCards, loadedCards + cardsToLoad);
        loadedCards += cardsToLoad;
    }
    if (loadedCards === postData.length) {
        loadMoreButton.style.display = 'none';
    }
});


darkModeToggle.addEventListener("click", darmModeSwitch);
