const constants = require('./constants.js');

module.exports = {
  getDetailsByValue: (value) => {
    let result;
    const levels = constants.co2_levels;
    Object.keys(levels).forEach((level) => {
      if (value >= levels[level].interval[0] && value < levels[level].interval[1]) {
        result = levels[level].details;
      }
    });
    return result;
  },
  checkForGreetingMessage: (text) => {
    if (!text) {
      return false;
    }
    return (text && constants.user_greetings.indexOf(text) !== -1 || 
             constants.user_greetings.some((greet) => {
            return text.startsWith(greet);
      })
    ) 
  },
};
