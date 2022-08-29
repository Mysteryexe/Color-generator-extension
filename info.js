function showInfo() {
  infoFrame.classList.add("open");
  infoFrame.classList.remove("closed");
  holder.style.filter = holder.style.filter.replace("blur(0px)", "blur(20px)");
}
function hideInfo() {
  infoFrame.classList.add("closed");
  infoFrame.classList.remove("open");
  holder.style.filter = holder.style.filter.replace("blur(20px)", "blur(0px)");
}

document.addEventListener("DOMContentLoaded", function () {
  var infoFrame = document.getElementById("infoFrame");
  var infoOpen = document.getElementById("infoOpen");
  var infoClose = document.getElementById("infoClose");

  infoOpen.addEventListener("click", function () {
    showInfo();
  });
  infoClose.addEventListener("click", function () {
    hideInfo();
  });
});
