import React from "react";
import Intro from "./Intro";
import Choices from "./Choices";
import gambarPalang from "../../images/palang.png";
import gambarHistory from "../../images/history.png";
import css from "./homepage.module.css";
import gambarRegistered from "../../images/registered.png";

const intro = {
  judul: "Welcome!",
  isi: "This is the main page of the parking security website. You can see all the data from this site. Here you can see the activity history of the parking space, register and delete vehicles into and from the parking space, and see whichever vehicles are registered into the parking space.",
};

const choices = {
  first: {
    judul: "Registered Vehicle",
    isi: "In this section you will see the list of vehicles that has been registered, and can get into the parking space.",
  },
  second: {
    judul: "History",
    isi: "This section will show you the access history of the parking space. Who enters and exits and at what time.",
  },
};

class Homepage extends React.Component {
  render() {
    return (
      <div className={css.homepageContainer}>
        <Intro tulisan={intro} gambarPalang={gambarPalang} />
        <Choices
          tulisan={choices}
          gambarHistory={gambarHistory}
          gambarRegistered={gambarRegistered}
        />
      </div>
    );
  }
}

export default Homepage;
