function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function getColorName(red, green, blue) {
  const res = await fetch(
    `https://api.color.pizza/v1/?values=${rgbToHex(
      red,
      green,
      blue
    )}&noduplicates=true`
  );
  const record = await res.json();
  return record.paletteTitle;
}

function generate(r, g, b) {
  genSvg.src = "content/gen.svg";
  fav.src = "content/fav.svg";

  var color = `rgb(${r}, ${g}, ${b})`;
  const ntc_match = ntc.name("#" + rgbToHex(r, g, b));

  function setOffline() {
    colorName.innerHTML = ntc_match[1];
    alertNet.style = "transform: translatey(0%); display:block";
    save();
  }

  background.style.backgroundColor = color;
  infoFrame.style.backgroundColor = `rgb(${r}, ${g}, ${b}, 0.3)`;
  favFrame.style.backgroundColor = `rgb(${r}, ${g}, ${b}, 0.3)`;
  rgbInput.innerHTML = `${r}, ${g}, ${b}`;
  hexInput.innerHTML = "#" + rgbToHex(r, g, b);
  related.href = "https://www.stocksy.com/color/" + rgbToHex(r, g, b);

  if (tinycolor(hexInput.innerHTML).isLight() === true) {
    holder.style.filter = "invert(0) blur(0px)";
    infoContent.style.filter = "invert(0) blur(0px)";
    favContent.style.filter = "invert(0) blur(0px)";
    favs.style.filter = "invert(0) blur(0px)";
  } else {
    holder.style.filter = "invert(1) blur(0px)";
    infoContent.style.filter = "invert(1) blur(0px)";
    favContent.style.filter = "invert(1) blur(0px)";
    favs.style.filter = "invert(1) blur(0px)";
  }

  chrome.storage.local.get({ favorites: [] }, (result) => {
    var currentColor = rgbInput.innerHTML;
    const favorites = result.favorites;
    if (favorites.includes(`${currentColor}`)) {
      fav.src = "content/favFilled.svg";
    }
  });

  colorPromise = getColorName(r, g, b);
  colorPromise
    .then((value) => {
      foundColorName = value;
      colorName.innerHTML = foundColorName;
      alertNet.style = "transform: translatey(-100%); display:none";
      save();
    })
    .catch((error) => setOffline());
}
function save() {
  let lastColor = {
    rgb: rgbInput.innerHTML,
    hex: hexInput.innerHTML,
    related: related.href,
    name: colorName.innerHTML,
    info: infoFrame.style.backgroundColor,
    bgColor: background.style.backgroundColor,
    filter: holder.style.filter.replace("blur(20px)", "blur(0px)"),
  };

  chrome.storage.local.set({ lastColor });
}
async function fetchData() {
  background = document.getElementById("color");
  button = document.getElementById("button");
  holder = document.getElementById("holder");
  rgbInput = document.getElementById("rgb");
  hexInput = document.getElementById("hex");
  genSvg = document.getElementById("gen");
  colorName = document.getElementById("colorName");
  related = document.getElementById("related");
  alertNet = document.getElementById("alertNet");
  infoFrame = document.getElementById("infoFrame");
  favFrame = document.getElementById("favFrame");
  infoContent = document.getElementById("infoContent");
  favContent = document.getElementById("favContent");

  chrome.storage.local.get("lastColor", (result) => {
    if (result.lastColor == undefined) {
      generate(getRandomInt(255), getRandomInt(255), getRandomInt(255));
    } else {
      background.style.backgroundColor = result.lastColor.bgColor;
      infoFrame.style.backgroundColor = result.lastColor.info;
      favFrame.style.backgroundColor = result.lastColor.info;
      rgbInput.innerHTML = result.lastColor.rgb;
      hexInput.innerHTML = result.lastColor.hex;
      colorName.innerHTML = result.lastColor.name;
      related.href = result.lastColor.related;
      holder.style.filter = result.lastColor.filter;
      infoContent.style.filter = result.lastColor.filter;
      favContent.style.filter = result.lastColor.filter;
      favs.style.filter = result.lastColor.filter;
    }
  });
  //fav icon
  chrome.storage.local.get({ favorites: [] }, (result) => {
    var currentColor = rgbInput.innerHTML;
    const favorites = result.favorites;
    if (favorites.includes(`${currentColor}`)) {
      fav.src = "content/favFilled.svg";
    }
  });
}
fetchData();

document.addEventListener("DOMContentLoaded", function () {
  var link = document.getElementById("button");
  link.addEventListener("click", function () {
    generate(getRandomInt(255), getRandomInt(255), getRandomInt(255));
  });
  var copyRGB = document.getElementById("copy-rgb");
  copyRGB.addEventListener("click", function () {
    copy("rgb");
  });
  var copyHEX = document.getElementById("copy-hex");
  copyHEX.addEventListener("click", function () {
    copy("hex");
  });
});

function copy(type) {
  if (type == "hex") {
    navigator.clipboard.writeText(hexInput.innerHTML);
  } else if (type == "rgb") {
    navigator.clipboard.writeText(rgbInput.innerHTML);
  }
  genSvg.src = "content/copied.svg";
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
