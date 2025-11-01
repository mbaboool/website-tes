
import React from 'react';
import '../../3d-images-gallery/src/style.css';

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h1>Galeri</h1>
      <div className="container">
        <div id="carousel">
          <figure><img src="https://via.placeholder.com/186x116/1" alt="" /></figure>
          <figure><img src="https://via.placeholder.com/186x116/2" alt="" /></figure>
          <figure><img src="https://via.placeholder.com/186x116/3" alt="" /></figure>
          <figure><img src="https://via.placeholder.com/186x116/4" alt="" /></figure>
          <figure><img src="https://via.placeholder.com/186x116/5" alt="" /></figure>
          <figure><img src="https://via.placeholder.com/186x116/6" alt="" /></figure>
          <figure><img src="https://via.placeholder.com/186x116/7" alt="" /></figure>
          <figure><img src="https://via.placeholder.com/186x116/8" alt="" /></figure>
          <figure><img src="https://via.placeholder.com/186x116/9" alt="" /></figure>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
