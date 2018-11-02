#!/usr/bin/env python
import serial, time, sys
import asyncio
import websockets

#port = '/dev/ttyAMA0'
port = '/dev/ttyS0'
websocket_port = 'ws://localhost:8765'

async def pushPPMValue(value):
    async with websockets.connect(websocket_port) as websocket:
        await websocket.send(value)

def calculatePPM(bytesData):
    concentration = bytesData[2]*256 + bytesData[3]
    return concentration

def run():
    try:
        with serial.Serial(port=port, baudrate=9600, timeout=10.0) as ser:
            print ('PORT OPENED: ', ser.is_open)
            if not ser.is_open:
                print ('Check if CO2 sensor is connected. Exiting')
                sys.exit()
            while True:
                ser.write(u'\xff\x01\x86\x00\x00\x00\x00\x00\x79'.encode('latin-1'))
                time.sleep(1)
                bytesData = ser.read(9)
                print (bytesData)
                concentration = calculatePPM(bytesData)
                asyncio.get_event_loop().run_until_complete(pushPPMValue(str(concentration)))
                print('Concentration is %s ppm ' % concentration)
                time.sleep(2)
    except Exception as e:
        print (e)
        sys.exit()
    except KeyboardInterrupt as e:
        with serial.Serial(port, baudrate=9600, timeout=10.0) as ser:
            ser.close()
            sys.exit()

if __name__ == '__main__':    
    run()

