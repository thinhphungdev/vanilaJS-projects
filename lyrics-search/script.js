const apiURL = 'https://api.lyrics.ovh';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

// Event listeners
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) return alert('Please enter a search term');

  searchSongs(searchTerm);
});

async function searchSongs(searchTerm) {
  const response = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await response.json();

  showSongsData(data);
}

// FEATURES

// shows list of songs
function showSongsData(data) {}
