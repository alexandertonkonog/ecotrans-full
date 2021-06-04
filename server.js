import express from "express"
import path from "path"
const sequelize = require('./db/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// import {handleRender} from './ssr/ssr'

import {authRouter} from './routes/authRouter'
import {testRouter} from './routes/testRouter'
import {homeRouter} from './routes/homeRouter'
import {formRouter} from './routes/formRouter'
import {messageRouter} from './routes/messageRouter'
import {profileRouter} from './routes/profileRouter'
import {exchangeRouter} from './routes/exchangeRouter'
import {iblockRouter} from './routes/iblockRouter'

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

app.use('/auth', authRouter)
app.use('/test', testRouter)
app.use('/home', homeRouter)
app.use('/form', formRouter)
app.use('/message', messageRouter)
app.use('/profile', profileRouter)
app.use('/exchange', exchangeRouter)
app.use('/iblock', iblockRouter)

app.use('/static', express.static('./client/public'))
app.use('/static', express.static('./client/build'))

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`)
})