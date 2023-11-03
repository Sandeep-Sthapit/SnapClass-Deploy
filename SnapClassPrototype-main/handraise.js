import handIcon from "./assets/icons/hand.png";
import otherHandIcon from "./assets/icons/other-hand.png";


const HAND = {
    "code": handIcon,
    "other": otherHandIcon
}
const HANDS_TEXT = {
    "code": "code help",
    "other": "other help"
}

// checks if hand is raised or not, can be either code, none or other
function isHandRaised(hand) {
    if (hand == "none") {
        return false
    }
    return true
}

export {
    HAND,
    HANDS_TEXT,
    isHandRaised
}