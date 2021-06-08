const Router = require('express')

const { authRouter } = require('./authRouter')
const { formRouter } = require('./formRouter')
const { messageRouter } = require('./messageRouter')
const { profileRouter } = require('./profileRouter')
const { exchangeRouter } = require('./exchangeRouter')
const { iblockRouter } = require('./iblockRouter')

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/form', formRouter)
rootRouter.use('/message', messageRouter)
rootRouter.use('/profile', profileRouter)
rootRouter.use('/exchange', exchangeRouter)
rootRouter.use('/iblock', iblockRouter)

module.exports = {
    rootRouter
}