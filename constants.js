module.exports = {
  "helptext": ":point_right: To get current CO2 level and details about concentration, type `lvl`\n:point_right: To get live graph of CO2 concentration, type `graph` or `stream`",
  "co2_levels": {
    "co2_low": {
      "details": "Good! This concentration is very low. Are you outside?",
      "interval": [
        0,
        350
      ]
    },
    "co2_ok": {
      "details": "Great! This concentration is typical of occupied indoor spaces with good air exchange",
      "interval": [
        350,
        1000
      ]
    },
    "co2_poor": {
      "details": "Woo, too much CO2! Prepate for complaints of poor air and drowsiness.\n*Open the window*!",
      "interval": [
        1000,
        2000
      ]
    },
    "co2_bad": {
      "details": "Man, too bad! Headaches, sleepiness and stagnant, stale, stuffy air. Poor concentration, loss of attention, increased heart rate and slight nausea may also be present.\n *Open the window!*",
      "interval": [
        2000,
        5000
      ]
    },
    "co2_danger": {
      "details": "Dangerously high amount of CO2. This is a workplace exposure limit in most jurisdictions.\n *Go out and sue your boss!*",
      "interval": [
        5000,
        40000
      ]
    }
  },
  "level_info": (lvl, details) => 'CO2 level is `' + `${lvl}` + '` ppm.\n' + `${details}`,
  "oops": "Oops, the bot is down or smth went wrong :-1:",
  "graphText": (url) => `See live stream here :point_right: ${url}`,
  "greeting": "Hey mate :wink:",
  "user_greetings": ['hi', 'hey', 'Hi', 'Hey', 'Yo', 'yo', 'ping'],
  "sorry": "Sorry bro, I don't get you. Type `help` to view commands."
}
