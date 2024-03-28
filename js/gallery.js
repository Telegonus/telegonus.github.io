document.addEventListener('DOMContentLoaded', function() {
    var galleryImages = document.querySelectorAll('#gallery img');
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    
    galleryImages.forEach(function(img) {
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src; // Set clicked image source to lightbox image
        });
    });
    
    // Hide lightbox when clicked
    lightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
});
