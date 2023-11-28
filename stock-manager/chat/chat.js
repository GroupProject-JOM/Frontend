(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    catcher = body.querySelector(".catcher"),
    allChat = body.querySelector(".all-chats"),
    chat = body.querySelector(".chat-content"),
    sent = body.querySelector(".sent"),
    received = body.querySelector(".received"),
    form = body.querySelector(".form"),
    message = body.querySelector(".message"),
    bottom = body.querySelector(".msg-bottom"),
    sentIcon = body.querySelector(".sent-icon");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    message.placeholder = data["sin"]["message"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    message.placeholder = data["en"]["message"];
    setGreeting();
  });

  var data = {
    sin: {
      message: "පණිවිඩයක් ටයිප් කරන්න",
    },
    en: {
      message: "Type a message",
    },
  };

  loadChatList();

  if (getCookie("id") != null) loadChat();
  else bottom.style.display = "none";

  const senderId = getCookie("user");

  sentIcon.addEventListener("click", (e) => {
    if (getCookie("id") != null) send();
    else Command: toastr["error"]("Select user");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (getCookie("id") != null) send();
    else Command: toastr["error"]("Select user");
  });

  function send() {
    if (
      typeof message.value === "string" &&
      message.value.trim().length === 0
    ) {
      Command: toastr["error"]("Message cannot be empty");
    } else {
      socket.send(`${senderId}:${message.value}:${getCookie("id")}`);

      chat.innerHTML +=
        `<div class="sent">
              <div class="sent-msg">
                  <p>` +
        message.value +
        `</p>
              </div>
          </div>`;
    }
    chat.scrollTop = chat.scrollHeight;
    const chats = document.querySelectorAll(".single-chat");
    chats.forEach((c) => {
      if (c.id == getCookie("id"))
        c.childNodes[1].childNodes[1].textContent = "You: " + message.value;
    });
    message.value = null;
  }

  function receive(msg) {
    log(msg)
    chat.innerHTML +=
      `<div class="received">
        <div class="received-msg">
          <p> ` +
      msg +
      ` </p>
        </div>
      </div>`;
    chat.scrollTop = chat.scrollHeight;
    const chats = document.querySelectorAll(".single-chat");
    chats.forEach((c) => {
      if (c.id == getCookie("id"))
        c.childNodes[1].childNodes[1].textContent = msg;
    });
  }

  // web socket
  const socket = new WebSocket(
    "ws://127.0.0.1:8090/JOM_war_exploded/chat/" + getCookie("user")
  );

  socket.onmessage = function (event) {
    if (
      getCookie("id") != null &&
      getCookie("id") == event.data[event.data.length - 1]
    ) {
      let msg = event.data.substring(0, event.data.length - 1);
      receive(msg);
    }
    loadChatList();
  };

  socket.onclose = function (event) {
    console.log("WebSocket closed:", event);
    Command: toastr["error"]("WebSocket closed");
  };

  socket.onerror = function (error) {
    console.error("WebSocket error:", error);
    Command: toastr["error"]("WebSocket error");
  };

  //load chat
  function loadChat() {
    fetch(
      backProxy + "/chat?user=" + getCookie("user") + "&to=" + getCookie("id"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            let arr = data.messages;
            arr.forEach(data_to_table);

            function data_to_table(item) {
              if (item.sender == getCookie("user")) {
                chat.innerHTML +=
                  `<div class="sent">
                      <div class="sent-msg">
                        <p>` +
                  item.content +
                  `</p>
                      </div>
                    </div>`;

                const chats = document.querySelectorAll(".single-chat");
                chats.forEach((c) => {
                  if (c.id == getCookie("id"))
                    c.childNodes[1].childNodes[1].textContent =
                      "You:" + item.content;
                });
              } else {
                receive(item.content);
              }
            }
            chat.scrollTop = chat.scrollHeight;
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            if (lang == "sin") Command: toastr["info"]("පණිවිඩ නැත");
            else Command: toastr["info"]("No Messages");
          });
        } else if (response.status === 401) {
          response.json().then((data) => {
            console.log(data.message);
          });
          if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
          else Command: toastr["error"]("Invalid User");
        } else {
          console.error("Error:", response.status);
          Command: toastr["error"](response.status, "Error");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Command: toastr["error"](error);
      });
  }

  //load chat list
  function loadChatList() {
    allChat.innerHTML = null;
    var formData = {
      user: getCookie("user"),
    };

    fetch(backProxy + "/chat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            let arr = data.list;
            arr.forEach(data_to_table);

            function data_to_table(item) {
              if (item.sender == item.receiver) {
                allChat.innerHTML +=
                  `<div class="single-chat" id=` +
                  item.sender +
                  `>` +
                  `<div class="profile-photo">` +
                  `<span class="profile-icon"> <i class="fa-solid fa-user"></i>` +
                  `</span>` +
                  `</div>` +
                  `<div class="single-chat-content">` +
                  `<p class="supplier-name">` +
                  item.fist_name +
                  ` ` +
                  item.last_name +
                  `</p>` +
                  `<p class="last-text">` +
                  item.content +
                  `</p>` +
                  `</div>` +
                  `</div>`;
                return;
              }
              if (item.receiver == 3) {
                if (item.seen == 0) {
                  allChat.innerHTML +=
                    `<div class="single-chat" id=` +
                    item.sender +
                    `>` +
                    `<div class="profile-photo">` +
                    `<span class="profile-icon"> <i class="fa-solid fa-user"></i>` +
                    `</span>` +
                    `</div>` +
                    `<div class="single-chat-content">` +
                    `<p class="supplier-name">` +
                    item.fist_name +
                    ` ` +
                    item.last_name +
                    `</p>` +
                    `<p class="last-text">` +
                    item.content +
                    `</p>` +
                    `<div class="unseen"></div>` +
                    `</div>` +
                    `</div>`;
                } else {
                  allChat.innerHTML +=
                    `<div class="single-chat" id=` +
                    item.sender +
                    `>` +
                    `<div class="profile-photo">` +
                    `<span class="profile-icon"> <i class="fa-solid fa-user"></i>` +
                    `</span>` +
                    `</div>` +
                    `<div class="single-chat-content">` +
                    `<p class="supplier-name">` +
                    item.fist_name +
                    ` ` +
                    item.last_name +
                    `</p>` +
                    `<p class="last-text">` +
                    item.content +
                    `</p>` +
                    `</div>` +
                    `</div>`;
                }
              } else {
                allChat.innerHTML +=
                  `<div class="single-chat" id=` +
                  item.receiver +
                  `>` +
                  `<div class="profile-photo">` +
                  `<span class="profile-icon"> <i class="fa-solid fa-user"></i>` +
                  `</span>` +
                  `</div>` +
                  `<div class="single-chat-content">` +
                  `<p class="supplier-name">` +
                  item.fist_name +
                  ` ` +
                  item.last_name +
                  `</p>` +
                  `<p class="last-text">You: ` +
                  item.content +
                  `</p>` +
                  `</div>` +
                  `</div>`;
              }
            }

            const chats = document.querySelectorAll(".single-chat");
            chats.forEach((c) => {
              c.addEventListener("click", () => {
                document.cookie = "id=" + c.id + "; path=/";
                catcher.textContent = c.childNodes[1].childNodes[0].textContent;
                chat.innerHTML = null;
                bottom.style.display = "block";
                loadChat();
                chat.style.display = "block";
                if (c.getElementsByTagName("*").length == 7)
                  c.children[1].children[2].remove();
                seen();
              });
            });
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            if (lang == "sin")
              Command: toastr["info"]("කතාබස් ලැයිස්තුවක් නැත");
            else Command: toastr["info"]("No chat list");
          });
        } else if (response.status === 401) {
          response.json().then((data) => {
            console.log(data.message);
          });
          if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
          else Command: toastr["error"]("Invalid User");
        } else {
          console.error("Error:", response.status);
          Command: toastr["error"](response.status, "Error");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Command: toastr["error"](error);
      });
  }

  function seen() {
    fetch(
      backProxy + "/seen?user=" + getCookie("user") + "&id=" + getCookie("id"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            log(data.messages);
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            log(data.messages);
          });
        } else if (response.status === 401) {
          response.json().then((data) => {
            console.log(data.message);
          });
        } else {
          console.error("Error:", response.status);
          Command: toastr["error"](response.status, "Error");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Command: toastr["error"](error);
      });
  }
})();
