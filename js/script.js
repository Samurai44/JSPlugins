var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true
});


// carosuel made with mustache templates

var mainCarousel = document.getElementsByClassName('main-carousel').innerHTML;
var sliderCell = document.getElementById('slider-cell').innerHTML;

Mustache.parse(sliderCell);

var listItems = '';

for (var i = 0; i < sliderData.length; i++){
  console.log(sliderData);
  listItems += Mustache.render(sliderCell, sliderData[i]);
}

mainCarousel.insertAdjacentHTML('beforeend', listItems);


//Initialize flkty carosuel plugin

var flkty = new Flickity( '.main-carousel', {
  // options
  hash: true,
});

// Add progress bar for the carousel

var progressBar = document.querySelector('.progress-bar');

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

// Add reset button to return to first picture

var buttonGroup = document.querySelector('.button-group');
var buttons = buttonGroup.querySelectorAll('.buttonReset');
buttons = fizzyUIUtils.makeArray( buttons );

buttonGroup.addEventListener( 'click', function( event ) {
  // filter for button clicks
  if ( !matchesSelector( event.target, '.buttonReset' ) ) {
    return;
  }
  var index = buttons.indexOf( event.target );
  flkty.select( index );
});
