function showFav() {
  genFav();
  favFrame.classList.add("open");
  favFrame.classList.remove("closed");
  holder.style.filter = holder.style.filter.replace("blur(0px)", "blur(20px)");
}
function hideFav() {
  favFrame.classList.add("closed");
  favFrame.classList.remove("open");
  holder.style.filter = holder.style.filter.replace("blur(20px)", "blur(0px)");
}

document.addEventListener("DOMContentLoaded", function () {
  var fav = document.getElementById("fav");
  var favFrame = document.getElementById("favFrame");
  var favOpen = document.getElementById("favOpen");
  var favClose = document.getElementById("favClose");

  favOpen.addEventListener("click", function () {
    showFav();
  });
  favClose.addEventListener("click", function () {
    hideFav();
  });

  fav.addEventListener("click", function () {
    chrome.storage.local.get({ favorites: [] }, (result) => {
      var currentColor = rgbInput.innerHTML;
      const favorites = result.favorites;
      if (favorites.includes(`${currentColor}`)) {
        fav.src = "content/fav.svg";
        //unfav
        for (var i = 0; i < favorites.length; i++) {
          if (favorites[i] === `${currentColor}`) {
            favorites.splice(i, 1);
          }
        }
      } else {
        fav.src = "content/favFilled.svg";
        favorites.push(`${currentColor}`);
      }
      chrome.storage.local.set({ favorites: favorites });
    });
  });
});

function genFav() {
  var colorDiv = document.getElementById("favSample");
  var favs = document.getElementById("favs");
  var child = favs.lastElementChild;
  while (child) {
    favs.removeChild(child);
    child = favs.lastElementChild;
  }
  chrome.storage.local.get({ favorites: [] }, (result) => {
    const favoriteKeys = result.favorites;
    for (var i = 0; i < favoriteKeys.length; i++) {
      var divClone = colorDiv.cloneNode(true);
      divClone.addEventListener("click", function () {
        clickFavColor(this);
      });
      favs.appendChild(divClone);
      divClone.style.backgroundColor = `rgb(${favoriteKeys[i]})`;
    }
  });
}
function clickFavColor(div) {
  var SelectedFavColor = div.style.backgroundColor.replace(")", "").split(",");
  r = parseInt(SelectedFavColor[0].substring(4).replace(" ", ""));
  g = parseInt(SelectedFavColor[1].substring(1).replace(" ", ""));
  b = parseInt(SelectedFavColor[2].substring(1).replace(" ", ""));
  generate(r, g, b);
  filterHolder = holder.style.filter;
  holder.style.filter = filterHolder.replace("blur(0px)", "blur(20px)");
}
