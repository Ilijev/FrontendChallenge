const darkModeToggle = document.querySelector(".switch input");
const feedContainer = document.querySelector(".layout-container");
const darmModeSwitch = () => {
  document.body.classList.toggle("darkmode");
};

let postData;

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    postData = data;
    generatePostsHTML();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  function generatePostsHTML() {
    postData.forEach(post => {
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
          <p>${post.caption}</p>
        </div>
      `;
  
      postElement.innerHTML = postHTML;
      feedContainer.appendChild(postElement);
    });
  }

darkModeToggle.addEventListener("click", darmModeSwitch);
