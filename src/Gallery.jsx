import React, { useState } from 'react';

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1682687982502-1529b3b33f85',
    'https://images.unsplash.com/photo-1682687219356-e820ca126c92',
    'https://images.unsplash.com/photo-1682687220199-d0124f48f95b'
  ];

  const changeImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="gallery-container text-center">
            <h1 className="mb-4">Image Gallery</h1>
            <div className="position-relative">
              <img
                src={images[currentImage]}
                alt={`Gallery image ${currentImage + 1}`}
                className="gallery-image img-fluid shadow-lg"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
              <div className="image-counter badge bg-dark position-absolute bottom-0 end-0 m-3">
                {currentImage + 1} / {images.length}
              </div>
            </div>
            <button
              onClick={changeImage}
              className="btn btn-primary btn-lg mt-4 px-5"
            >
              Next Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 