const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const ticketPrice = movieSelect.value;
  const totalSelectedSeats = selectedSeats.length;
  const totalPrice = ticketPrice * totalSelectedSeats;

  // get all index of current selected seats and store to localstorage
  const seatsIdx = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIdx));

  count.textContent = totalSelectedSeats;
  total.textContent = totalPrice;
}

// get data from local storage and populate the UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIdx = JSON.parse(localStorage.getItem('selectedMovieIdx'));

  if (selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });

    count.textContent = selectedSeats.length;
  }

  if (selectedMovieIdx) {
    movieSelect.options.selectedIndex = selectedMovieIdx;
  }
}

// update total ticket and total price when new seats are selected
container.addEventListener('click', function (e) {
  e.stopPropagation();

  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// update total ticket and total price when new movie is selected
movieSelect.addEventListener('change', function (e) {
  updateSelectedCount();
  // store movie data to local storage
  setMovieData(e.target.selectedIndex, e.target.value);
});

// Initial count and total set
updateSelectedCount();

// Helper
function setMovieData(idx, price) {
  localStorage.setItem('selectedMovieIdx', idx);
  localStorage.setItem('selectedMovieTicketPrice', price);
}
