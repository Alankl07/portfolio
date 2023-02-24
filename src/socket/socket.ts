import { io } from "socket.io-client";
import { environment } from 'src/environments/environment'

const socket = io(environment.socketUrl, {
    transports: ['websocket'] 
})

export default socket 