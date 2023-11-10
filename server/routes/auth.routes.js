import express from 'express'
import authCtrl from '../controllers/auth.controller.js'

const router= express.Router()

router.route('/auth/signin').post(authCtrl.signin)
router.route('/auth/signout').get(authCtrl.signout)
router.route('/auth/signup').post(authCtrl.signup);

export default router