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

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
// Email sender 
function sendEmail() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

   Email.send({
    Host: "smtp.elasticemail.com",
    Username: "kambohdiv@gmail.com",
    Password: "4403B55893D3259568D1C4B9BDBFBEC236BC",
    To:'alihamzakamboh180@gmail.com',
    From: 'kambohdiv@gmail.com',
    Subject: "Thanks " +name,
    Body: "Hi,"+name + "&nbsp;"+" Thanks for joining ahkamboh 😊"+"<br>"+" Message:&nbsp;"+message+"<br>"+"Message from:&nbsp;"+email
  }).then(
     alert("Thanks "+name+" For joining Kamboh div 😊. We will send you responsive email Soon"));
}
// typed animation 
var typed = new Typed('.title', {
  strings: ['Web Developer', ' Coder ',' Poet ',' Youtuber '],
  loop: true,
  typeSpeed: 200,
  backSpeed:100 ,  
  startDelay:50 ,         
});

// ---------------------------------------
// poetry show function
function Poetry1() {
  document.querySelector('.poetry-1').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
function Poetry2() {
  document.querySelector('.poetry-2').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
function Poetry3() {
  document.querySelector('.poetry-3').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}

function Poetry4() {
  document.querySelector('.poetry-4').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
function Poetry5() {
  document.querySelector('.poetry-5').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
function Poetry6() {
  document.querySelector('.poetry-6').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
function Poetry7() {
  document.querySelector('.poetry-7').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
function Poetry8() {
  document.querySelector('.poetry-8').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
function Poetry9() {
  document.querySelector('.poetry-9').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
function Poetry10() {
  document.querySelector('.poetry-10').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
function Poetry11() {
  document.querySelector('.poetry-11').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
function Poetry12() {
  document.querySelector('.poetry-12').classList.toggle('Poetry-display');
  document.querySelector('html').classList.toggle('overflow');
}
//  Copy button Function for poetry 
function CopyP1() {
  // Get the text field
  let copyText = document.getElementById('copy-poetry-1');
  // For button
  let textChange = document.getElementById('btn-1')
  textChange.innerText = 'Copied'
  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  // For mobile devices
  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP2() {
  let copyText = document.getElementById('copy-poetry-2');
  let textChange = document.getElementById('btn-2')
  textChange.innerText = 'Copied'
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP3() {
  let copyText = document.getElementById('copy-poetry-3');
  let textChange = document.getElementById('btn-3')
  textChange.innerText = 'Copied'
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP4() {
  let copyText = document.getElementById('copy-poetry-4');
  let textChange = document.getElementById('btn-4')
  textChange.innerText = 'Copied'
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP5() {
  let copyText = document.getElementById('copy-poetry-5');
  let textChange = document.getElementById('btn-5')
  textChange.innerText = 'Copied'
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP6() {
  let copyText = document.getElementById('copy-poetry-6');
  let textChange = document.getElementById('btn-6')
  textChange.innerText = 'Copied'
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP7() {
  let copyText = document.getElementById('copy-poetry-7');
  let textChange = document.getElementById('btn-7')
  textChange.innerText = 'Copied'
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP8() {
  let copyText = document.getElementById('copy-poetry-8');
  let textChange = document.getElementById('btn-8')
  textChange.innerText = 'Copied'
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP9() {
  let copyText = document.getElementById('copy-poetry-9');
  let textChange = document.getElementById('btn-9')
  textChange.innerText = 'Copied'
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP10() {
  let copyText = document.getElementById('copy-poetry-10');
  let textChange = document.getElementById('btn-10')
  textChange.innerText = 'Copied'
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP11() {
  let copyText = document.getElementById('copy-poetry-11');
  let textChange = document.getElementById('btn-11')
  textChange.innerText = 'Copied'
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.innerHTML);
}
function CopyP12() {
  let copyText = document.getElementById('copy-poetry-12');
  let textChange = document.getElementById('btn-12')
  textChange.innerText = 'Copied'
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
