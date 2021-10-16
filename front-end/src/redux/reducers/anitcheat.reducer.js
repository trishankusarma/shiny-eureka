import {Cheat} from "../constants";

const initialState = {
  antiCheatActive:false,
  message:""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // room details
    case Cheat.CHEAT_DETECTED:
      state = {
        ...state,
        antiCheatActive: true,
        message:payload
      };
      break;

    case Cheat.NOT_CHEATING:
      state = {
        ...state,
        antiCheatActive: false,
        message:""
      };
      break;
    }
    
    return state;
}