import React, { Component } from "react";
import Navbar from "./components/navbar/navbar";
import Container from "./components/container/container";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import images from "./images";

class ClickyGame extends Component {
  state = {
    score: 0,
    topScore: 0,

    // stores the class value to assign to navMessage based on a good or bad click
    navMsgColor: "",

    // contains intro, success, and failure message
    navMessage: 'Click an image to begin!',

    // contains an array of image urls
    allCharacters: this.shuffleArray(),

    // will track  each clicked element.
    wasClicked: [],

    // shakes the container on an incorrect guess if set to true
    shake: false
  };

  // binds the current this context to checkClicked to have access to the current state
  // when passed down to the Character component
  clickEvent = this.checkClicked.bind(this);

  // used to shuffle the array of images when the DOM loads, and when an image is clicked
  shuffleArray() {
    // creates a copy of the current characters array to modify it by value, and not by reference
    const newArr = images.slice();

    // will store the shuffled array
    const shuffleArr = [];

    // each loop through an index gets spliced from newArr, reducing its length
    // gets a random index based off the current length of newArr
    // splices the value from newArr, and pushes it to shuffleArr
    while (newArr.length > 0) {
      shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
    }

    return shuffleArr;
  }

  checkClicked(clickedElem) {
    // creates a copy of the wasClicked array to modify it by value, and not by reference. wasClicked stores all previous clicked images
    const prevState = this.state.wasClicked.slice();

    // shuffles the images
    const shuffled = this.shuffleArray();

    // tracks score
    let score = this.state.score;
    let topScore = this.state.topScore;

    // if the clicked item is not in wasClicked, then it hasn't been clicked and the score is increased
    if (!this.state.wasClicked.includes(clickedElem)) {
      // if score and highScore are the same, then there is a new highScore value
      if (score === topScore) {
        score++;
        topScore++;

        // if they are not equal, then only increase the score value
      } else {
        score++;
      }

      // adds the clicked item to wasClicked to track that it has been clicked
      prevState.push(clickedElem);
    }

    // resets the current score if the same element was clicked twice
    if (this.state.wasClicked.includes(clickedElem)) {
      let score = 0;
      return this.setState({
        score: score,
        highScore: topScore,
        navMsgColor: 'incorrect',
        navMessage: 'Incorrect guess!',
        allCharacters: shuffled,
        wasClicked: [],
        shake: true
      });
    }

    // if this runs, then the same element has not been clicked twice and the score is increased
    this.setState({
      score: score,
      highScore: topScore,
      navMsgColor: 'correct',
      navMessage: 'You Guessed Correctly!',
      allCharacters: shuffled,
      wasClicked: prevState,
      shake: false
    });

    // removes the green correct indicator on a successful click after .5s to re-render the class on each success
    return setTimeout(() => this.setState({ navMsgColor: "" }), 500);
  }

  // renders score to the navbar.
  // passes the randomized state.allCharacters array to Container to create a Character component for each image.
  // passes the this.checkClicked down to container to pass to each Character component to be used for the click event.
  render() {
    const state = this.state;
    return (
      <div>
        <Navbar
          score={state.score}
          topScore={state.topScore}
          navMessage={state.navMessage}
          navMsgColor={state.navMsgColor}
        />
        <Header />
        <Container
          shake={state.shake}
          characters={state.allCharacters}
          clickEvent={this.clickEvent}
        />
        <Footer />
      </div>
    );
  }
}

export default ClickyGame;