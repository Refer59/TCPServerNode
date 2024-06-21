import 'dotenv/config'
import app from './app.js'
import SocketService from './Services/SocketService.js'

app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en el puerto ${process.env.PORT}`);
})

const serverTCP = SocketService.getInstance(parseInt(process.env.SERVER_TCP_PORT || '8080'))
serverTCP.start()