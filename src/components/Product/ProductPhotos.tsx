import React, { FC, Fragment } from 'react'

interface ProductPhotosProps {
  images: string[]
  thumbnail: string
}

const imageStyle = { width: '100%' }
const imageClass = 'rounded-3 img-fluid'

const ProductPhotos: FC<ProductPhotosProps> = ({ images, thumbnail }) => (
  <div
    className="col-md-6"
    style={{ maxWidth: '40vw' }}
  >
    <div className="mb-3">
      <img
        src={thumbnail}
        alt="card 1"
        className={imageClass}
        style={imageStyle}
      />
    </div>

    <div className="d-flex">
      {
        images.map((image, ind) => (ind < images.length - 1
          ? (
              <div
                key={image}
                className="mr-1"
              >
                <img
                  src={image}
                  alt={`card ${ind}`}
                  style={imageStyle}
                  className={imageClass}
                />
              </div>
            )
          : <Fragment key={ind} />))
      }
    </div>
  </div>
)

export default ProductPhotos
