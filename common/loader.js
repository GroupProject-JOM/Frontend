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
  $(".loader-wrapper").toggle();
});

// load manifest and append meta tags
const meta = document.querySelector("head");
fetch("https://jom-dev.duckdns.org/common/meta.html")
  .then((res) => res.text())
  .then((data) => {
    meta.innerHTML += data;
  });
