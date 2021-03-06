import React, { Component } from "react";

class Carousel extends Component {
  state = {
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  handlIndexClick = e => {
    this.setState({
      active: +e.target.dataset.index
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => {
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              data-index={index}
              onClick={this.handlIndexClick}
              className={index == active ? "active" : ""}
              alt="animal thumbnail"
            />;
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
