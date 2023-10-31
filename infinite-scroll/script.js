const postContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');
const filter = document.getElementById('filter');

const limit = 5;
const page = 1;

// INIT
showPosts();

// SERVICE
async function getPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// DOM related function
async function showPosts() {
  const posts = await getPost();

  postContainer.innerHTML = '';

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
