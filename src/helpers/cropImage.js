export const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", error => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
  });

export const resizedImage = image => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  if (image.width > image.height) {
    if (image.width > 397) {
      image.height *= 397 / image.width;
      image.width = 397;
    }
  } else {
    if (image.height > 397) {
      image.width *= 397 / image.height;
      image.height = 397;
    }
  }

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const dataurl = canvas.toDataURL("image/jpeg", 1);
  return dataurl;
};

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
const getCroppedImage = async (imageSrc, pixelCrop) => {
  let image = await createImage(imageSrc);

  image = await createImage(resizedImage(image));


  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, image.width, image.height);

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  return canvas.toDataURL("image/jpeg", 1);
  // As a blob
  //   return new Promise((resolve, reject) => {
  //     canvas.toBlob(file => {
  //       resolve(URL.createObjectURL(file));
  //     }, "image/jpeg");
  //   });
};

export default getCroppedImage;
