// Parallax photo in hero

document.addEventListener("DOMContentLoaded", function() {
  const layer = document.querySelector('.hero-img');
  document.addEventListener('mousemove', (event) => {
  layer.style.transform = 'translate3d(' + ((event.clientX * 0.3) / 4) + 'px,' + ((event.clientY * 0.4) / 6) + 'px, 0px)';
  })
});

// Accordeon in price section

const accordeon = document.querySelectorAll('.accord-sect');

for(item of accordeon) {
  item.addEventListener('click', function(){
      if(this.classList.contains('active')) {
          this.classList.remove('active');
      } else {
          for(el of accordeon) {
              el.classList.remove('active');
          }
          this.classList.add('active');
      }
  })
};

document.querySelector('.accord-sect').click();