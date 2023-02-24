import * as Io  from 'socket.io-client'
import { environment } from 'src/environments/environment'

const socket = Io(environment.socketUrl, {
    // Send auth token on connection, you will need to DI the Auth service above
    // 'query': 'token=' + Auth.getToken()
    path: '/socket.io',
    transports: ['websocket'],
    secure: true,
  })

export default socket