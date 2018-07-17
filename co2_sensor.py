#!/usr/bin/env python
import serial, time, sys, struct
port = '/dev/ttyAMA0'


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
                concentration = calculatePPM(bytesData)
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
