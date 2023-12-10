if (getCookie("jwt") == null || getCookie("jwt").length == 0)
  window.location.href = frontProxy + "/signin.html";