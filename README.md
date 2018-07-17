## A bot for people who are tired of other coworkers constantly closing god damn windows.

### How its build

1. A CO2 sensor MH-Z19 attached to Raspberry Pie 2 monitors CO2 concentration level and sends raw data in bytes.
    
    For the sensor data sheet and specifications, see 
    https://www.winsen-sensor.com/d/files/PDF/Infrared%20Gas%20Sensor/NDIR%20CO2%20SENSOR/MH-Z19%20CO2%20Ver1.0.pdf

2. CO2 leven is then calculated into ppm (parts per million) - a standard concentration unit

3. Based on standard researched healty CO2 concentration levels, the bot evaluates whether the CO2 level is too high. If this is the case, it sends a message in Slack asking to open the window.

    For healthy CO2 concentration levels, see
    https://www.kane.co.uk/knowledge-centre/what-are-safe-levels-of-co-and-co2-in-rooms

4. PROFIT

## Science, bitch!