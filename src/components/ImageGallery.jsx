/* eslint-disable jsx-a11y/anchor-is-valid */
import { BsCardImage } from "react-icons/bs";
import { useState } from "react";
import { imagesData } from "../data/imagesData";

const ImageGallery = () => {
  const [images, setImages] = useState(imagesData);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(images[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
  };

  const handleDragOver = (index) => {
    const draggedOverItem = images[index];

    if (draggedItem === draggedOverItem) return;

    const imagesCopy = Array.from(images);
    const fromIndex = imagesCopy.indexOf(draggedItem);
    const toIndex = imagesCopy.indexOf(draggedOverItem);

    imagesCopy.splice(fromIndex, 1);
    imagesCopy.splice(toIndex, 0, draggedItem);

    setImages(imagesCopy);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const addImageHandler = () => {
    console.log("Add Image Clicked");
    //not plan to adding image this project, so i am ignore it
  };

  const handleCheckbox = (index) => {
    const selectedImage = images[index];
    const isImageSelected = selectedImages.some(
      (img) => img.image === selectedImage.image
    );

    let updatedImages;

    if (isImageSelected) {
      updatedImages = selectedImages.filter(
        (img) => img.image !== selectedImage.image
      );
    } else {
      updatedImages = [...selectedImages, selectedImage];
    }

    setSelectedImages(updatedImages);

    const imageContainers = document.querySelectorAll(".image-item-container");

    imageContainers.forEach((container, i) => {
      const image = container.querySelector("img");
      const isCurrentImageSelected = updatedImages.some(
        (img) => img.image === images[i].image
      );

      if (isCurrentImageSelected) {
        container.classList.add("clicked");
        image.style.filter = "blur(2.5px)";
      } else {
        container.classList.remove("clicked");
        image.style.filter = "none";
      }
    });
  };

  const deleteSelectedImages = () => {
    const updatedImages = images.filter(
      (img) => !selectedImages.some((selected) => selected.image === img.image)
    );

    const updatedSelectedImages = selectedImages.filter((selected) =>
      updatedImages.some((img) => img.image === selected.image)
    );
    setSelectedImages(updatedSelectedImages);

    const imageContainers = document.querySelectorAll(".image-item-container");

    imageContainers.forEach((container, i) => {
      const image = container.querySelector("img");
      const isCurrentImageSelected = updatedSelectedImages.some(
        (img) => img.image === images[i].image
      );

      if (isCurrentImageSelected) {
        container.classList.add("clicked");
        image.style.filter = "blur(5px)";
      } else {
        container.classList.remove("clicked");
        image.style.filter = "none";
      }
    });

    setImages(updatedImages);
  };

  return (
    <div className="image-container">
      <div className="header">
        {selectedImages.length === 0 ? (
          <div className="header-text">Gallery</div>
        ) : (
          <div className="flexContainer">
            <div className="header-text">
              <input
                type="checkbox"
                checked={true}
                className="header-checkbox"
              />
              {selectedImages.length} Files Selected
            </div>
            <div onClick={deleteSelectedImages}>
              <a href="#" className="header-text-Link">
                Delete File
              </a>
            </div>
          </div>
        )}
      </div>

      <hr />

      <div className="image-grid">
        {images.map((img, index) => (
          <div
            key={index}
            onDragOver={() => handleDragOver(index)}
            className={index < 1 ? "image-item-first" : "auto"}
          >
            <div
              className="image-item-container"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
            >
              <img src={img.image} alt={img.image} className="image-item" />
              <input
                type="checkbox"
                className="checkbox"
                checked={selectedImages.some(
                  (selected) => selected.image === img.image
                )}
                onClick={() => handleCheckbox(index)}
              />
            </div>
          </div>
        ))}
        <button
          key="addImage"
          onClick={addImageHandler}
          className="add-image-button"
        >
          <h2>
            <BsCardImage />
          </h2>
          <h3>Add Images</h3>
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
