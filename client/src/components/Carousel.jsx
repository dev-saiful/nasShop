
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Carousel({ items }) {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide mx-auto rounded-lg"
      style={{
        width: '70%',
        maxWidth: '800px',
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
      }}
    >
      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Carousel Inner */}
      <div className="carousel-inner bg-slate-100 rounded-xl border-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{
              paddingTop: '75%',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
            }}
          >
            <img
              src={item.image}
              className="d-block w-100 h-100 object-contain rounded-2xl absolute top-0 left-0"
              alt={item.name}
            />
            {/* <div className="carousel-caption d-none d-md-block text-gray-700">
              <h5>{item.name}</h5>
            </div> */}
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        className="carousel-control-prev p-1 sm:p-3 h-fit w-fit bg-black rounded-full ml-2"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next p-1 sm:p-3 h-fit w-fit bg-black rounded-full mr-2"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
