if (getCookie("jwt") == null || getCookie("jwt").length == 0)
  window.location.href = frontProxy + "/signin.html";

if (getPayload(getCookie("jwt")).page != "collector") {
  if (
    getPayload(getCookie("jwt")).page == null ||
    getPayload(getCookie("jwt")).page.length === 0
  ) {
    window.location.href = frontProxy + "/signin.html";
  } else {
    window.location.href = frontProxy + "/" + getPayload(getCookie("jwt")).page;
  }
}
