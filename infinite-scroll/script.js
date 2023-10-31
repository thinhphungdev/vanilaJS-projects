const postContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');
const filter = document.getElementById('filter');

const limit = 5;
const page = 1;

// SERVICE
async function fetchPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}
