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
function showSongsData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
        .join('')}
    </ul>
  `;

  if (!data.prev && !data.next) {
    more.innerHTML = '';
  }

  more.innerHTML = `
  ${
    data.prev
      ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
      : ''
  }
  ${
    data.next
      ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
      : ''
  }
`;
}

// get more songs
async function getMoreSongs(url) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await response.json();

  showSongsData(data);
}

// GET LYRICS Button click handler

result.addEventListener('click', (event) => {
  const clickEl = event.target;

  if (clickEl.tagName !== 'BUTTON') return;

  const artist = event.target.dataset.artist;
  const songTitle = event.target.dataset.songtitle;

  getLyrics(artist, songTitle);
});

async function getLyrics(artist, songTitle) {
  try {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
    `;
  } catch (error) {
    result.innerHTML = error;
  }

  more.innerHTML = '';
}
