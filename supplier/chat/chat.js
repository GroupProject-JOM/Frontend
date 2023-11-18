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

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";

    cTitle.textContent = data["sin"]["cTitle"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";

    cTitle.textContent = data["en"]["cTitle"];
    setGreeting();
  });

  var data = {
    sin: {
      cTitle: "ජයසිංහ ඔයිල් මිල්ස්",
    },
    en: {
      cTitle: "Jayasinghe Oil Mills",
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
        <p> ` + msg + ` </p>
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
})();
