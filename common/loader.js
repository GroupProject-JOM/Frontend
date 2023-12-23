//back to top
let backToTop = document.querySelector(".back-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
}

backToTop.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

window.addEventListener("load", () => {
  // const loader = document.querySelector(".loader-wrapper");
  // loader.style.display = "none";
  // loader.toggle();
  $(".loader-wrapper").toggle();
});
