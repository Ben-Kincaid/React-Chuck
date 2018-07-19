import React from "react";

import JokeScreen from "./JokeScreen";

import JokeControls from "./JokeControls";

import {store} from "../store"
import {setJoke, setCategory, setLoad} from "../actions";







// Chuck component - generates markup for the Random Chuck Norris Joke Generator Modal. 
export default class Chuck extends React.Component {

    //constructor for the Chuck component - used to call our props on extended React Component class and set our 
    //state/other methods used throughout the class.
    constructor(props) {
        super(props);

        //this is a categories object used in render function to dynamically generate the radio button markup.
        //the key is the displayed string, while the value is the string used for Chuck Norris API
       

        //initialize state. Joke is used to store current joke, category is to store current set category, and 
        // loadStatus provides classes added to the text <h3> to add CSS animation to fade in/out
     
        this.processing = false;

        
    }


    //Called when component is added to the DOM - we call the getJoke method to initially pull a joke.
    componentDidMount() {
        this.getJoke();
    }
    
  
    //Method for calling the API, parsing the data and setting the applications state to reflect changes in DON
    getJoke() {
       
        if(this.processing === false) {

        
            this.processing = true;
        
            //start request for joke from chucknorris API
            var request = new XMLHttpRequest();

            //set request URL - if the states category is "all", call specific endpoint. Otherwise, concat category
            // to the API endpoint.
            var requestURL = store.getState().category === "all" ?
                `https://api.chucknorris.io/jokes/random` :
                `https://api.chucknorris.io/jokes/random?category=${store.getState().category}`;

            //Set joke state to "loading.." to indicate data is being pulled
            // Also, set loadStatus to "loading" to set the class of the text, allowing for CSS interactions
            this.dispatchJoke('Loading...');
            this.dispatchLoad('loading');
         

        
            // open a GET request to the previously set URL
            request.open("GET", requestURL, true);

            // Handle the request when it loads succesfully
            request.onload = function () {
                // if the request status does not indicate an error/issue...
                if (request.status >= 200 && request.status < 400) {
                    // parse the response to use the data object
                    var resp = JSON.parse(request.responseText);
                    
                    //set the loadstatus state to indicate that the text needs to begin fading out. 
                    this.dispatchLoad('loading fadeout');
                

                    //set a timeout which matches the length of css transition to again change the css class back to "done"
                    //and to restore styling. 
                    setTimeout(() => {

                        //to limit text size on mobile devices, add a mobile-specific class ".long" if it is over 120 
                        // characters long - in CSS, we will shrink font-size for elements with this class
                        var curClass;
                        if(resp.value.length <= 90) {
                            curClass = "done"  
                        } else if(150 > resp.value.length > 90) {
                            curClass = "done long";
                            
                        } else if (200 >= resp.value.length >= 150) {
                            curClass = "done longer";
                        } else {
                            curClass = "done longest"    
                        }

                        //finally, set the state of the joke to the previous response, and set class depending on length
                        this.dispatchJoke(resp.value);
                        this.dispatchLoad(curClass);
                        
                    
                        
                    }, 200)
                    this.processing = false;
                } else {
                    //we were able to reach the server, but was unsuccesful in getting a request back
                    alert('An issue occurred grabbing data from the Chuck Norris API. Please try again');
                  
                }
                
            }.bind(this); //Make sure to bind the onload function to 'this' so we 
                        //can reference the class methods(i.e. this.setState())

            //Handle the request if it throws an error
            request.onerror = function (err) {
                alert('An issue occurred grabbing data from the Chuck Norris API. Please try again. ERROR CODE ' + request.status);
            };


            //Send the request to receive the data and handle it as described above
            request.send();

            
        } else {
            return;
        }
    }

    dispatchLoad(status) {
        store.dispatch(setLoad(status));
    }
    dispatchCategory(cat) {
        store.dispatch(setCategory(cat));
    }
    dispatchJoke(text) {
        store.dispatch(setJoke(text));
    }
    //render the component.
    render() {
       // create the checkbox containers and their content dynamically from this.categories object
       
        return (
           
            <div className="chuck-container">


                
                <JokeScreen
                    text={() => store.getState().joke}
                    loadClass = {() => store.getState().loadStatus}
                />
             
                
                <JokeControls 
                    handleJoke={() => this.getJoke()}
                    processing={() => this.processing}
                    handleCatState={(cat) => this.dispatchCategory(cat)}
                />
               

               
                    
                
            </div>
        );
    }
}

