"use strict";

// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";
// Internal imports, e.g:
import { initSelect2 } from '../components/init_select2';
import { loader } from '../components/loader';

document.addEventListener('turbolinks:load', () => {
  initSelect2();
  if (document.querySelector("#scroll-container")) {
    document.querySelector("html").classList.add("scroll-home");
  } else {
    document.querySelector("html").classList.remove("scroll-home");
  };
  loader();
});

//////////////////// ADDING / REMOVING ACTION ICON FROM NAVBAR (AMIN) ////////////////////:

// INITIALISING THE VARIABLE WHICH WILL STORE THE HTML CODE OF THE ACTION NAV ITEM
let li_icon;

// WHEN THE APP LOAD, CHECK IF SIZE <= 565 px.
// IF YES, REMOVES THE ACTION ICON FROM THE DROPDOWN LIST IN THE NAVBAR.
// IF NO, JUST STORES THE HTML CODE OF THE ACTION BUTTON (SO HOME FOR INDIV / CONTRACT FOR COMPANIES)

window.addEventListener("load", () => {
  li_icon = document.querySelector(".li-icon");

  if (document.documentElement.clientWidth <= 565) {
    li_icon.parentNode.removeChild(li_icon);
  }
});

// FUNCTION THAT WILL ADD / REMOVE THE ACTION BUTTON DEPENDING ON THE "clientWidth" SIZE.

const displayIconNavItem = () => {
  const navbarUlElem = document.querySelector(".navbar-nav");
  if (document.documentElement.clientWidth <= 565) {
    // REMOVES THE ACTION ICON NAV ITEM ELEMENT FROM DOM TREE
    li_icon.parentNode.removeChild(li_icon);
  } else if (document.documentElement.clientWidth > 565) {
    // ADD THE ACTION ICON NAV ITEM ELEMENT TO DOM TREE
    document.querySelector(".li-icon") ? "" : navbarUlElem.insertBefore(li_icon, navbarUlElem.children[1]);
  }
};

// EVENT LISTENER CHECKING THE SIZE OF THE CLENT WIDTH AND CALLING "displayIconNavItem" EVERYTIME WINDOW IS RESIZED
window.onresize = displayIconNavItem


///////////////////// ALERT POPUPS WINDOWS (YILUN)

$(".alert").fadeOut(4000);
import "controllers"
