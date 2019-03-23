// carosuel made with mustache templates

var mainCarousel = document.querySelector('.main-carousel');
var sliderCell = document.getElementById('slider-cell').innerHTML;

Mustache.parse(sliderCell);

var listItems = '';

for (var i = 0; i < sliderData.length; i++){
  console.log(sliderData);
  listItems += Mustache.render(sliderCell, sliderData[i]);
}
console.log('mainCarousel', mainCarousel);
mainCarousel.insertAdjacentHTML('beforeend', listItems);


//Initialize flkty carosuel plugin
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  //hash: true
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

var hashHrefs = document.querySelectorAll('.hashtags > a');

for (i = 0; i < hashHrefs.length; ++i) {
  hashHrefs[i].addEventListener('click', function (event) {
    event.preventDefault();

    var hrefAttr = event.target.getAttribute('href');
    var slide = document.querySelector(hrefAttr);
    var index = Array.from(slide.parentNode.children).indexOf(slide)

    console.log('index', index);

    flkty.select( index );
  });
}
