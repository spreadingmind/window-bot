module.exports = {
  "helptext": ":point_right: To get current CO2 level and details about concentration, type `lvl`\n:point_right: To get live graph of CO2 concentration, type `graph`",
  "co2_levels": {
    "co2_low": {
      "details": "Good! This concentration is very low. Are you outside",
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
      "details": "Woo, too much CO2! Prepate for complaints of poor air and drowsiness.",
      "interval": [
        1000,
        2000
      ]
    },
    "co2_bad": {
      "details": "Man, too bad! Headaches, sleepiness and stagnant, stale, stuffy air. Poor concentration, loss of attention, increased heart rate and slight nausea may also be present.",
      "interval": [
        2000,
        5000
      ]
    },
    "co2_danger": {
      "details": "Dangerously high amount of CO2. This is workplace exposure limit in most jurisdictions.",
      "interval": [
        5000,
        40000
      ]
    }
  },
  "level_info": (lvl, details) => {return 'CO2 level is `' + `${lvl}` + '` ppm.\n' + `${details}`},
  "oops": "Oops, the bot is down or smth went wrong :-1:"
}