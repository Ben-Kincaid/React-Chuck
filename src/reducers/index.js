export default (state, action)  => {
	    switch(action.type) {
			case "SET_JOKE":
				return {
					...state,
					joke: action.joke
				}
			case "SET_CAT":
				return {
					...state, 
					category: action.category
				}
			case "SET_LOAD":
				return {
					...state,
					loadStatus: action.loadStatus
				}
			default: 
				return state;
		}	
}