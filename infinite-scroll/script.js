const postContainer = document.getElementById('posts-container');
const loader = document.querySelector('.loader');
const filter = document.getElementById('filter');

const limit = 5;
let page = 1;
let throttleTimer;

// INIT
// showPosts();

// SERVICE
async function getPost() {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// HELPER
function throttle(callback, time) {
  if (throttleTimer) return;
  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}

// DOM related function
async function showPosts() {
  const posts = await getPost();

  posts.forEach((post) => {
    const postElHTML = `
      <div class="post">
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
    </div>
    `;

    postContainer.insertAdjacentHTML('beforeend', postElHTML);
  });

  // ALTERNATIVE
  //   posts.forEach((post) => {
  //     const postEl = document.createElement('div');
  //     postEl.classList.add('post');
  //     postEl.innerHTML = `
  //     <div class="number">${post.id}</div>
  //     <div class="post-info">
  //       <h2 class="post-title">${post.title}</h2>
  //       <p class="post-body">${post.body}</p>
  //     </div>
  //     `;

  //     postContainer.appendChild(postEl);
  //   });
}

function filterPost(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').textContent.toUpperCase();
    const body = post.querySelector('.post-body').textContent.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// Show loader & fetch more posts
function showLoading() {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 600);
}

// Show loading when scroll to bottom
function handleInfiniteScroll() {
  throttle(() => {
    const endOfPage =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (endOfPage) {
      showLoading();
    }
  }, 800);
}

window.addEventListener('scroll', handleInfiniteScroll);
filter.addEventListener('input', filterPost);
window.onload = function () {
  showPosts();
};
