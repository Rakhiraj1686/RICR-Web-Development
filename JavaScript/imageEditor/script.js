let b = 1,
  c = 1,
  s = 0,
  g = 0,
  i = 0;

const img = document.getElementById("image");
console.log(img.src);

if (img.src === "http://127.0.0.1:5500/JavaScript/imageEditor/index.html") {
  document.getElementById("image").style.display = "none";
}

function uploadImage() {
  const file = document.getElementById("upload").files[0];
  const fileURL = URL.createObjectURL(file);

  document.getElementById("image").src = fileURL;
  document.getElementById("image").style.display = "block";
  document.getElementById("uploadLabel").style.display = "none";
  applyFilter();
}

function applyFilter() {
  document.getElementById("image").style.filter = `brightness(${b}) 
                                                   contrast(${c}) 
                                                   grayscale(${g}%)  
                                                   invert(${s}%) 
                                                   sepia(${i}%)`;
}

function changeBrightness() {
  const value = document.getElementById("Brightness").value;
  b = (value * 2) / 100;
  applyFilter();
}

function changeContrast() {
  const value = document.getElementById("Contrast").value;
  c = (value * 2) / 100;
  applyFilter();
}

function changegrayScale() {
  const value = document.getElementById("grayScale").value;
  g = value;
  applyFilter();
}

function changeSepia() {
  const value = document.getElementById("Sepia").value;
  s = value;
  applyFilter();
}

// function changegraySaturate() {
//   const value = document.getElementById("Saturate").value;
//   document.getElementById("image").style.filter = `saturate(${
//     (value * 2) / 100
//   })`;
//   applyFilter();
// }

// function changeHuerotate() {
//   const value = document.getElementById("Hue-rotate").value;
//   document.getElementById("image").style.filter = `hue-rotate(${
//     (value * 2) / 100
//   })`;
//   applyFilter();
// }

// function changeBlur() {
//   const value = document.getElementById("Blur").value;
//   document.getElementById("image").style.filter = `blur(${(value * 2) / 100})`;
//   applyFilter();
// }

function changeInvert() {
  const value = document.getElementById("Invert").value;
  i = value;
  applyFilter();
}

function reset() {
      b = 1; 
      c = 1; 
      g = 0;
      s = 0; 
      i = 0;

  applyFilter();
  document.getElementById("Brightness").value = 50;
  document.getElementById("Contrast").value = 50;
  document.getElementById("grayScale").value = 0;
  document.getElementById("Sepia").value = 0;
  document.getElementById("Invert").value = 0;
}

function download() {
  if (img.src === "http://127.0.0.1:5500/JavaScript/imageEditor/index.html") {
    alert("please upload the image first");
    return;
  }

  if (!img.complete) {
    alert("Image  Upload is in progress, Please Wait.......");
    return;
  }

  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");

  canvas.width = img.naturalWidth;
  canvas.height = img.naturatHeight;

  const filter = getComputedStyle(img).filter;

  ctx.filter = filter === "none" ? "none" : filter;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL("image/png");

  const anchorTag = document.createElement("a");

  anchorTag.href = dataURL;

  anchorTag.download = "editedImage.png";

  document.body.appendChild(anchorTag);
  anchorTag.click();
  document.body.removeChild(anchorTag);
}
