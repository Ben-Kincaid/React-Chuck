import React from "react";


function JokeScreen(props) {
    var loadClass = props.loadClass;
    var text = props.text;

    return (
        <div className="chuck-joke-container">
            <h3 className={loadClass()}>{text()}</h3>
        </div>
    )
}

export default JokeScreen;
