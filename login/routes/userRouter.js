const router = require('express').Router()
var jwt = require('jsonwebtoken');
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
router.post('/register', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.json("ngrnjg")
        }
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        let userRouter = new userModel({
            username: req.body.username,
            password: hashPassword
        })
        userRouter = await userRouter.save()
        res.json(userRouter)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ username })
        if (!user) return res.status(400).json({ msg: " Username ko tồn tại" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Mật khẩu sai" })
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const dataForAccessToken = {
            username: user.username,
        };
        const accessToken = await jwt.sign(
            {
                dataForAccessToken,
            },
            accessTokenSecret,
            {
                algorithm: 'HS256',
                expiresIn: accessTokenLife,
            },
        );
        if (!accessToken) {
            return res
                .status(401)
                .send('Đăng nhập không thành công, vui lòng thử lại.');
        }

        return res.json({
            msg: 'Đăng nhập thành công.',
            accessToken,
            user,
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
})
module.exports = router
