import asyncio
import websockets

async def pullPPMValue(websocket, path):
    value = await websocket.recv()
    await websocket.send(value)
    print('CO2 concentration: ', value)

start_server = websockets.serve(pullPPMValue, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
