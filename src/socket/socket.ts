import * as Io  from 'socket.io-client'
import { environment } from 'src/environments/environment'

const socket = Io(environment.socketUrl)

export default socket