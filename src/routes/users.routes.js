// routes (2º/5) --- arquivo por onde as requisições são endereçadas


const { Router, request, response } = require('express')

const multer = require('multer')

const uploadConfig = require('../configs/upload')

const UsersController = require('../controllers/UsersController')

const usersController = new UsersController()


const UserAvatarController = require('../controllers/UserAvatarController')

const userAvatarController = new UserAvatarController()


const usersRoutes = Router()

const upload = multer(uploadConfig.MULTER)

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')



usersRoutes.post('/', usersController.create)

usersRoutes.put('/', ensureAuthenticated, usersController.update)

usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)


module.exports = usersRoutes
