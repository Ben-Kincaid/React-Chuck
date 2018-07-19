import React from "react";




function RadioBtns(props) {
    var stateHandler = props.handleCatState;
    var processing = props.processing;
    var handleJoke = props.handleJoke;

    var categories = {
        all: "all",
        politics: "political",
        sports: "sport",
        science: "science",
        movies: "movie"
    }

    var checkboxes = generateMarkup(categories, stateHandler, handleJoke, processing);




    return (
        <div className="hud-bottom">
            {checkboxes}
        </div>
    )
}

function generateMarkup(categories, stateHandler, handleJoke, processing) {
    
    var markup = Object.keys(categories).map((key, index) => {

        //check if it is first iteration - if so, set flag to enable it to be checked by default
        var checked;
        if (index === 0) {
            checked = true;
        } else {
            checked = false;
        }



        //return the generated markup
        // we create a simple div that contains a radio button and label. Radio input has onChange attribute
        // which says to fire this.setCategory when it is changed, or clicked. setCategory then takes the value of
        // the clicked checkbox and uses that to set the states 'category' which is then used in API endpoint.
        return (
            <div className="checkbox-container" key={index}>

                <input
                    onChange={(event) => {
                        console.log('CHANGED!');
                        if (processing() === false ) {
                            stateHandler(event.currentTarget.value);
                            handleJoke();
                           
                        } else {
                            event.preventDefault();
                            
                            return;
                        }
                    }}
                    type="radio"
                    value={categories[key]}
                    name="category"

                    defaultChecked={checked}
                />
                <label htmlFor="category">{key}</label>
            </div>

        )
    })

    return markup;
}


export default RadioBtns;
