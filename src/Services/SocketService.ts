import { Socket, Server } from 'net'
import Measure from '../Models/measureModel.js'

class SocketService {
    public static instance: SocketService
    private port: number
    private server: Server

    private constructor(port: number) {
        this.port = port
        this.server = new Server()
        this.server.on('connection', this.HandleConnection)
    }

    public static getInstance(port?: number): SocketService {
        if (!SocketService.instance) {
            if (!port)
                throw new Error('Aun no existe una instancia de servidor TCP Socket, proporcione un puerto por el cual iniciarla')
            SocketService.instance = new SocketService(port)
        }
        return SocketService.instance
    }

    public start() {
        this.server.listen(this.port, () => {
            console.log(`Server TCP Socket corriendo en el puerto: ${this.port}`)
        })
    }

    public stop() {
        this.server.close(error => {
            console.log('Server TCP Socket cerrado')
        })
    }

    private HandleConnection(socket: Socket) {
        console.log(`Se ha conectado un cliente: ${socket.remoteAddress}:${socket.remotePort}`)

        socket.on('data', async data => {
            console.log(`Datos recibidos: [${data}]`)

            try {
                await Measure.create({
                    unit: 'celcius',
                    value: data,
                })
            } catch (error) {
                console.error(error)
            }
        })

        socket.on('end', () => {
            console.log('Conexion cerrada')
        })

        socket.on('error', error => {
            console.error(`Ocurrio un error: ${error.message}`)
        })
    }
}

export default SocketService