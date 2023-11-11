import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
// import expressJwt from 'express-jwt';
import config from '../../config/config.js'



const signup = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        // Generate a token for the newly created user
        const token = jwt.sign({ _id: user._id }, config.jwtSecret);

        // Set the token as a cookie
        res.cookie('t', token, { expire: new Date() + 999 });

        // Return user information and token in the response
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(400).json({ error: 'Could not create user' });
    }
};

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })

        if (!user) {
            return res.status(401).json({ error: "User not found" })
        }

        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "Email and password don't match." })
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret)
        res.cookie('t', token, { expire: new Date() + 999 })

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }
    catch (err) {
        return res.status('401').json({ error: "Could not sign in" })
    }
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status(200).json({ message: "signout out" });
}

const requireSignin = (req, res, next) => {
    jwt.verify(req.cookies.t, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.auth = decoded;
        next();
    });
};

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!authorized) {
        return res.status(403).json({ error: 'User is not authorized' });
    }

    next();
};

export default { signin, signout, requireSignin, hasAuthorization,signup };