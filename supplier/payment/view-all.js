(() =>{
    const body = document.querySelector("body"),
        sin = body.querySelector(".sin"),
        en = body.querySelector(".en"),
        sTitle = body.querySelector(".supply-title"),
        sText = body.querySelector(".supply-text"),
        th1 = body.querySelector(".th1"),
        th2 = body.querySelector(".th2"),
        tbody = body.querySelector(".tbody"),
        btn = body.querySelector(".form-button");


    sin.addEventListener("click", () => {
        sin.classList.add("active");
        en.classList.remove("active");

        document.documentElement.setAttribute("lang", "sin");
        sessionStorage.setItem("lang", "sin");

        sTitle.textContent = data["sin"]["sTitle"];
        sText.innerHTML = data["sin"]["sText"];
        th1.textContent = data["sin"]["th1"];
        th2.textContent = data["sin"]["th2"];
        btn.textContent = data["sin"]["btn"];
    });

    en.addEventListener("click", () => {
        en.classList.add("active");
        sin.classList.remove("active");

        document.documentElement.setAttribute("lang", "en");
        sessionStorage.setItem("lang", "en");

        sTitle.textContent = data["en"]["sTitle"];
        sText.innerHTML = data["en"]["sText"];
        th1.textContent = data["en"]["th1"];
        th2.textContent = data["en"]["th2"];
        btn.textContent = data["en"]["btn"];
    });

    var data = {
        sin:{
            sTitle: "ඔබගේ බැංකු ගිණුම්",
            sText: "ඔබගේ බැංකු ගිණුම් විස්තර බලන්න සහ සංස්කරණය කරන්න",
            th1: "ගිණුම් අංකය",
            th2: "බැංකුව",
            btn: "අලුතින් එකතු කරන්න",
        },
        en: {
            sTitle: "Your Bank Accounts",
            sText: "View and Edit the your bank account details",
            th1: "Account No",
            th2: "Bank",
            btn: "Add New",
        },

    };
    
})();
