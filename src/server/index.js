import express from "express"
import cors from "cors"
import { router } from "./routes/router.js"

const app = express()
const port = 3636

app.use(cors())
app.use(express.json())
app.use([router])

app.listen(port, () => {
  console.log(`[server]: Server is running at Port:${port}`)
})