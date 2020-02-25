import React, { Component } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import Modal from "./Modal";
import { navigate } from "@reach/router";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends Component {
  state = { loading: true, showMoal: false };
  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url: animal.url,
        animal: animal.type,
        name: animal.name,
        breed: animal.breeds.primary,
        media: animal.photos,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        loading: false
      });
    });
  }

  adopt = () => {
    navigate(this.state.url);
  };
  toggleModal = () => {
    this.setState({ showMoal: !this.state.showMoal });
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading ...</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showMoal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => {
              return (
                <button
                  style={{ backgroundColor: theme }}
                  onClick={this.toggleModal}
                >
                  Adopt {name}
                </button>
              );
            }}
          </ThemeContext.Consumer>

          <p>{description}</p>

          {showMoal ? (
            <Modal>
              <div>
                <h1>
                  Would you like to adopt {name} ?
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>Shame on you!</button>
                  </div>
                </h1>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function RenderDetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
