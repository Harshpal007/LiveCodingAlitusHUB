const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try{
        const user = new User({username,email,password});
        await user.save();
        res.redirect('/auth/login');
    }catch(error){
        res.status(400).send('Error while creating user',error.message);
    }
}

exports.login = async (req, res, next) => {
    const { username, email, password } = req.body;

    try{
        const user = await User.findOne({username});
        if(!user) return res.status(404).send('User Not Found');
        const validPassword = await user.comparePassword(password);
        if(!validPassword) return res.status(400).send('Password Incorrect');
        const token = jwt.sign({ _id: user._id}, 'secretKey',{expiresIn:'1h'} );
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/image/upload');
    } catch(error){
        res.status(400).send(`Error while authenticating: ${error.message} `);
    }
};
