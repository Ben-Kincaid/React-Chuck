import React from "react";
import RadioBtns from "./RadioBtns";
import NewJokeBtn from "./NewJokeBtn";


function JokeControls(props) {
    var handleJoke = props.handleJoke;
    var processing = props.processing;
    var handleCatState = props.handleCatState;

    return (
        <div className = "chuck-hud-container" >
            <NewJokeBtn 
                handleJoke={() => handleJoke}
            />

            <RadioBtns
                processing={processing} // pass the processing indicator to disable clicking while loading
                handleJoke={() => handleJoke()} // the function used to request a joke
                handleCatState={handleCatState}
            />
        </div>
    )
}

export default JokeControls;


