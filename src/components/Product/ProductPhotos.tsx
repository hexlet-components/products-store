import React, { FC, Fragment, useState } from 'react';

interface ProductPhotosProps {
    images: string[];
    thumbnail: string;
}

const imageClass = 'rounded-3 main-img';

const ProductPhotos: FC<ProductPhotosProps> = ({ images, thumbnail }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(thumbnail);

  return (
    <div className='d-flex flex-column align-items-center product-info-wrapper gap-3'>
        <div className='mb-3 main-img-wrapper'>
            <img src={selectedPhoto} alt='card 1' className={imageClass} />
        </div>
        <div className='d-flex gap-2 align-items-center' >
            {
                images.map((image, ind) => (ind < images.length - 1 ? (
                    <div key={image} className='img-preview-wrapper' role='button' onClick={() => setSelectedPhoto(image)}>
                        <img
                            src={image}
                            alt={`card ${ind}`}
                            className='main-img rounded-3'
                        />
                    </div>
                ) : <Fragment key={ind}></Fragment>))
            }
        </div>
    </div>
  );
};

export default ProductPhotos;
