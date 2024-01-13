let lightBTN = document.querySelector(".btn-light");
let darktBTN = document.querySelector('.btn-dark');
let acBTN = document.querySelector('.btn-ac');

var theme = window.localStorage.getItem('data-theme');
if(theme) document.documentElement.setAttribute('data-theme', theme);

lightBTN.addEventListener('click', function() {
  if(theme !== `light`) {
    document.documentElement.setAttribute('data-theme', 'light');
    window.localStorage.setItem('data-theme', 'light');
  }
});

darktBTN.addEventListener('click', function() {
  if(theme !== `dark`) {
    document.documentElement.setAttribute('data-theme', 'dark');
    window.localStorage.setItem('data-theme', 'dark');
  }
});

acBTN.addEventListener('click', function() {
  if(theme !== `ac`) {
    document.documentElement.setAttribute('data-theme', 'ac');
    window.localStorage.setItem('data-theme', 'ac');
  }
});