import express from 'express'
import 'dotenv/config'
import { closeDatabase, connectionToDatabase } from './db/index.js'
import productsRoutes from './routes/productsRoutes.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/products', productsRoutes)

app.get('/', (_req, res)=>{
    res.send('Home page')
})


app.use(errorMiddleware);

async function start() {
    try {
        await connectionToDatabase()
        const server = app.listen(PORT, ()=>{
            console.log(`Server is running at http://localhost:${PORT}`);
            
        })

        // Закрываем сервер и подключение к MongoDB, срабатывает(генерируется ) по Ctrl+C в терминале

        process.on('SIGINT', ()=>{
            server.close(async ()=>{
                await closeDatabase();
                process.exit(0)    // exit(0) корректно завершаем 
            })
        })
    } catch (error) {
        console.error('Failed to start the server due to MongoDB connection issue');
        process.exit(1);
    }
}

start();

