import app from './app.js'
import db from './models/index.js'

const port = process.env.PORT

try{
    await db.connectDB()
    app.listen(port, () => console.log(`Server is listening in the port ${port}`))
}
catch(error)
{
    console.log("Failed to connect to Database")
}
