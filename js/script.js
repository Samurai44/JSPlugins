// carosuel made with mustache templates
var mainCarousel = document.querySelector('.main-carousel');
var sliderCell = document.getElementById('slider-cell').innerHTML;

Mustache.parse(sliderCell);

var listItems = '';

for (var i = 0; i < sliderData.length; i++) {
    console.log(sliderData);
    listItems += Mustache.render(sliderCell, sliderData[i]);
}
console.log('mainCarousel', mainCarousel);
mainCarousel.insertAdjacentHTML('beforeend', listItems);


//Initialize flkty carosuel plugin
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true,
    hash: true
});

// Add progress bar for the carousel

var progressBar = document.querySelector('.progress-bar');

flkty.on('scroll', function(progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});

// Add reset button to return to first picture

var buttonGroup = document.querySelector('.button-group');
var buttons = buttonGroup.querySelectorAll('.buttonReset');
buttons = fizzyUIUtils.makeArray(buttons);

buttonGroup.addEventListener('click', function(event) {
    // filter for button clicks
    if (!matchesSelector(event.target, '.buttonReset')) {
        return;
    }
    var index = buttons.indexOf(event.target);
    flkty.select(index);
});

var hashHrefs = document.querySelectorAll('.hashtags > a');

for (i = 0; i < hashHrefs.length; ++i) {
    hashHrefs[i].addEventListener('click', function(event) {
        event.preventDefault();

        var hrefAttr = event.target.getAttribute('href');
        var slide = document.querySelector(hrefAttr);
        var index = Array.from(slide.parentNode.children).indexOf(slide)

        console.log('index', index);

        flkty.select(index);
    });
}

// Add MAP

window.initMap = function() {
    // The location of first slide
    var hintertux = {
        lat: 47.109750,
        lng: 11.680365
    };
    // The map, centered at the slide
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: hintertux
        });
    // Markers positioned at all places
    for (var j = 0; j < sliderData.length; j++) {
        console.log('slidedata', sliderData);

        var marker = new google.maps.Marker({
            index: sliderData[j].no,
            position: sliderData[j].coords,
            map: map,
        });
        // Connect carousel with click on markers


        marker.addListener('click', (function(event) {

            var index = this.index;

            flkty.select(index);
        }).bind(marker))
    }

    // Center map on active slide


    flkty.on('change', function(position) {

        position = sliderData[position].coords;
        map.panTo(position)
    })

};
