'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedNav = this;
    const targetPage = this.innerHTML.toLowerCase();

    // Remove active from all nav links
    navigationLinks.forEach(link => link.classList.remove("active"));
    
    // Add active to clicked nav link
    clickedNav.classList.add("active");

    // Show/hide pages
    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
      }
    }

    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('tab', targetPage);
    url.searchParams.delete('post');
    window.history.pushState({}, '', url);
  });
}
// Email sender 
// Email function moved to inline script in contact form (redirects to Gmail)


// typed animation 
var typed = new Typed('.title', {
  strings: ['Software Engineer', 'AI Systems Architect'],
  loop: true,
  typeSpeed: 50,
  backSpeed: 30,  
  startDelay: 500,
  backDelay: 2500,
  loopCount: Infinity,
  smartBackspace: false,
  fadeOut: false,
  showCursor: false,
});

// ---------------------------------------
//  all these  used to open the Poetry
function Poetry(x) {
  document.querySelector(`.poetry-${x}`).classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
//  all these  used to Copy Poetry
function CopyP(x) {
  let copyText = document.getElementById(`copy-poetry-${x}`);
  let textChange = document.getElementById(`btn-${x}`);
  textChange.innerText = 'Copied';
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
// To block inspect element on browser
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }

  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

let profileCard = document.querySelector(".profile-card");
let html = document.querySelector("html");
document.querySelector(".avatar-box").addEventListener("click", () => {
    profileCard.style.display = "grid";
    html.style.overflow = "hidden";
});
profileCard.addEventListener("click", () => {
    profileCard.style.display = "none";
    html.style.overflow = "visible";
});