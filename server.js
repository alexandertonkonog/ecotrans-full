const express = require("express")
const sequelize = require('./db/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// const {handleRender} = require( './ssr/ssr')

const { rootRouter } = require('./routes/rootRouter')

const PORT = 8000
const app = express()

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
  throw Error()
}

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// *ssr
// app.get("^/$", (req, res) => {
//   handleRender(req, res)
// });

app.use('/api', rootRouter)

app.use('/static', express.static('./client/public'))
app.use('/static', express.static('./client/build'))

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`)
})