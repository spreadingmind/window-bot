#!/usr/bin/env python
import serial, time, sys, struct
port = '/dev/ttyAMA0'


def calculatePPM(bytesData):
    highLevel = struct.unpack('B', bytesData[2])[0]*256
    lowLevel = struct.unpack('B', bytesData[3])[0]
    concentration = highLevel+lowLevel
    return concentration

def run():
    try:
        with serial.Serial(port=port, baudrate=9600, timeout=10.0) as ser:
            print ('PORT OPEN: ', ser.is_open) 
            while True:
                ser.write('\xff\x01\x86\x00\x00\x00\x00\x00\x79')
                time.sleep(1)
                bytesData = ser.read(9)
                concentration = calculatePPM(bytesData)
                print('Concentration is %s ppm '% concentration)
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