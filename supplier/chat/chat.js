(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    cTitle = body.querySelector(".chat-title"),
    chat = body.querySelector(".chat-content"),
    sent = body.querySelector(".sent"),
    received = body.querySelector(".received"),
    form = body.querySelector(".form"),
    message = body.querySelector(".message"),
    sentIcon = body.querySelector(".sent-icon");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    cTitle.textContent = data["sin"]["cTitle"];
    message.placeholder = data["sin"]["message"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    cTitle.textContent = data["en"]["cTitle"];
    message.placeholder = data["en"]["message"];
    setGreeting();
  });

  var data = {
    sin: {
      cTitle: "ජයසිංහ ඔයිල් මිල්ස්",
      message: "පණිවිඩයක් ටයිප් කරන්න",
    },
    en: {
      cTitle: "Jayasinghe Oil Mills",
      message: "Type a message",
    },
  };

  const senderId = getCookie("user");

  sentIcon.addEventListener("click", (e) => {
    send();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    send();
  });

  function send() {
    if (
      typeof message.value === "string" &&
      message.value.trim().length === 0
    ) {
      Command: toastr["error"]("Message cannot be empty");
    } else {
      socket.send(`${senderId}:${message.value}`);

      chat.innerHTML +=
        `<div class="sent">
            <div class="sent-msg">
                <p>` +
        message.value +
        `</p>
            </div>
        </div>`;
    }
    message.value = null;
  }

  function receive(msg) {
    chat.innerHTML +=
      `<div class="received">
      <div class="received-msg">
        <p> ` +
      msg +
      ` </p>
      </div>
    </div>`;
  }

  // web socket
  const socket = new WebSocket(
    "ws://127.0.0.1:8090/JOM_war_exploded/chat/" + getCookie("user")
  );

  socket.onmessage = function (event) {
    receive(event.data);
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
  fetch(backProxy + "/chat?user=" + getCookie("user"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          let arr = data.messages;
          arr.forEach(data_to_table);

          function data_to_table(item) {
            log(item);
            if (item.sender == getCookie("user")) {
              chat.innerHTML +=
                `<div class="sent">
                    <div class="sent-msg">
                      <p>` + item.content + `</p>
                    </div>
                  </div>`;
            }else{
              receive(item.content)
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
})();
