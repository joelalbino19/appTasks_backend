const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { username, password, email, phone, rol, gender } = req.body;
    const error500 = "Error del servicio";

    User.findByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).send(error500);
        }
        if (user) {
            return res.status(400).json({ message: 'Usuario existente' });
        }

        User.create({ username, password, email, phone, rol, gender }, (err) => {
            if (err) {
                return res.status(500).send(error500);
            }

            const payload = {
                user: {
                    username: username,
                    password
                }
            };

            const userRegister = {
                username,
                email,
                phone,
                rol,
                gender
            }

            jwt.sign(
                payload,
                'secret', // replace with your secret key
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        userRegister
                    });
                }
            );
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).send(error500);
        }
        if (!user) {
            return res.status(400).json({ message: 'Credenciales Invalidas' });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send(error500);
            }
            if (!isMatch) {
                console.log('Provided password:', password);
                console.log('Stored hashed password:', user.password);
                return res.status(400).json({ message: 'Credenciales Invalidas' });
            }

            const payload = {
                user: {
                    username: user.username,
                    password: user.password
                }
            };
            const userLogin = {
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                rol: user.rol,
                gender: user.gender
            }
            jwt.sign(
                payload,
                'secret', // replace with your secret key
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        userLogin
                    });
                }
            );
        });
    });
};
