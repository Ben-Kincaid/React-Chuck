import React from "react";


function NewJokeBtn(props) {
    var getJoke = props.handleJoke();
    return (
        <div className="hud-top">
            <button onClick={() => getJoke()}>New Joke</button>
        </div>
    )
}


export default NewJokeBtn;
