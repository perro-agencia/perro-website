//Open close menu
const menu = document.querySelector('.menu');
    const toggle = document.querySelector('#toggle');
    const remove = document.querySelectorAll('.exit');

    toggle.addEventListener('click', () => {
      menu.classList.toggle('open-menu');
    })

    for (const exit of remove) {
      exit.addEventListener('click', () => {
      menu.classList.remove('open-menu');
    })
}

//Modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}