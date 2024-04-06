if (getCookie("refresh") == null || getCookie("refresh").length == 0)
  window.location.href = frontProxy + "/signin.html";

if (getPayload(getCookie("refresh")).page != "sales-manager") {
  if (
    getPayload(getCookie("refresh")).page == null ||
    getPayload(getCookie("refresh")).page.length === 0
  ) {
    window.location.href = frontProxy + "/signin.html";
  } else {
    window.location.href = frontProxy + "/" + getPayload(getCookie("refresh")).page;
  }
}
