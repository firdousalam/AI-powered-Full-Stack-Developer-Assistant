console.log("✅ DevPilot Content Script Loaded");
function getSelectedText(): string {
    return window.getSelection()?.toString() || "";
}

const button = document.createElement("button");

button.innerText = "🤖 Ask AI";

button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";

button.style.padding = "12px 18px";

button.style.background = "#2563eb";
button.style.color = "#ffffff";

button.style.border = "none";
button.style.borderRadius = "10px";

button.style.cursor = "pointer";

button.style.zIndex = "999999";

if (!document.getElementById("devpilot-floating-button")) {

    button.id = "devpilot-floating-button";

    document.body.appendChild(button);

}
button.addEventListener("click", () => {

    const text = getSelectedText();

    if (!text) {

        alert("Please select some text.");

        return;

    }

    chrome.runtime.sendMessage({

        type: "SELECTED_TEXT",

        text

    });

});
button.addEventListener("mouseenter", () => {

    button.style.transform = "scale(1.1)";

});

button.addEventListener("mouseleave", () => {

    button.style.transform = "scale(1)";

});