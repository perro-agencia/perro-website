
// Movimiento de botones
document.querySelector('.perro-boton').onmousemove = (e) => {
    
	const x = e.pageX - e.target.offsetLeft
	const y = e.pageY - e.target.offsetTop

	e.target.style.setProperty('--x', `${ x }px`)
	e.target.style.setProperty('--y', `${ y }px`)
	
}

// Preloader
var loader = document.getElementById("preloader");

window.addEventListener("load", function() {
  loader.style.display = "none";
})