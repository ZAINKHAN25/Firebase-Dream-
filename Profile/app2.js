function bgmovewalafoo(id) {
    var divofid = document.querySelector(`.${id}`);
    divofid.classList.add('removebgcolor');
  }
  
function autobackgroundfoo(id) {
    var divofid = document.querySelector(`.${id}`);
    divofid.classList.remove('removebgcolor');
}

function toggleNavbar() {
    var dropdown = document.querySelector('.navbar .alagchezen');
    dropdown.style.display = dropdown.style.display === 'none' ? 'flex' : 'none';
}