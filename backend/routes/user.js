const User = require("../model/User.js")
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userRouter = (fastify, option, done) => {

    fastify.post("/api/users/create", {
        schema: {
            description: 'Register a new user',
            summary: 'Register user',
            params: {
                type: 'object',
                properties: {
                    name: { default: "apple" },
                    email: { default: "apple@gmail.com" },
                    password: { type: "string", default: "123456789" }
                }
            },
            body: {
                type: "object",
                properties: {
                    name: { default: "apple" },
                    email: { default: "apple@gmail.com" },
                    password: { type: "string", default: "123456789" }
                }
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        success: { default: true },
                        user: {
                            type: "object",
                            properties: {
                                name: { type: "string", default: "apple" },
                                email: { type: "string", default: "apple@gmail.com" },
                                password: { type: "string", default: "myhasedpassword" },
                                _id: { type: "string", default: "37642378432659749" }
                            }
                        }
                    }
                },
                default: {
                    description: 'Failure response',
                    type: 'object',
                    properties: {
                        success: { type: "boolean", default: false },
                        msg: { default: "error message here" }
                    }
                }
            }
        }
    }, async (req, replay, next) => {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            replay.code(404).send({ success: false, msg: "Please fill the field" })
        }

        //if email exists
        const is_email = await User.findOne({ email: email });
        if (is_email) { replay.code(404).send({ success: false, msg: "Email already exist" }) }

        //creating and hashing passwords
        const user = await User.create({ name, email, password });
        const token = user.getJWTToken(user._id)

        replay.setCookie('token', token, {
            path: '/',
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
            httpOnly: true
        })

        replay.send({
            success: true,
            user
        })
    });

    fastify.post("/api/users/login", {
        schema: {
            description: 'login a new user',
            summary: 'login user',
            params: {
                type: 'object',
                properties: {
                    email: { default: "apple@gmail.com" },
                    password: { type: "string", default: "123456789" }
                }
            },
            body: {
                type: "object",
                properties: {
                    email: { default: "apple@gmail.com" },
                    password: { type: "string", default: "123456789" }
                }
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        success: { default: true },
                        user: {
                            type: "object",
                            properties: {
                                name: { type: "string", default: "apple" },
                                email: { type: "string", default: "apple@gmail.com" },
                                password: { type: "string", default: "myhasedpassword" },
                                _id: { type: "string", default: "37642378432659749" }
                            }
                        }
                    }
                },
                default: {
                    description: 'Failure response',
                    type: 'object',
                    properties: {
                        success: { type: "boolean", default: false },
                        msg: { default: "error message here" }
                    }
                }
            }
        }
    },
        async (req, replay) => {
            const { email, password } = req.body;
            if (!email || !password) { replay.code(500).send({ success: false, msg: "Please fill the field" }); }

            const user = await User.findOne({ email: email })

            if (!user) {
                replay.code(404).send({ success: false, msg: "User does not exist" });
            }

            const isPasswordMatched = await user.comparePassword(password);

            if (!isPasswordMatched) {
                replay.code(404).send({
                    success: false,
                    msg: "passwords do not match"
                })
            }

            const token = user.getJWTToken(user._id);
            replay.setCookie('token', token, {
                path: '/',
                expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
                httpOnly: true
            })

            replay.send({
                success: true,
                user
            })
        });


    fastify.get("/api/users/me",
        {
            schema: {
                description: 'Login suer with jwt token',
                summary: 'cookie checkup from client',
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'object',
                        properties: {
                            success: { default: true },
                            user: {
                                type: "object",
                                properties: {
                                    name: { type: "string", default: "apple" },
                                    email: { type: "string", default: "apple@gmail.com" },
                                    password: { type: "string", default: "myhasedpassword" },
                                    _id: { type: "string", default: "37642378432659749" }
                                }
                            }
                        }
                    },
                    default: {
                        description: 'Failure response',
                        type: 'object',
                        properties: {
                            success: { type: "boolean", default: false },
                            msg: { type: "string", default: "cookie expired" }
                        }
                    }
                },
            }
        }
        , async (req, replay) => {
            // const token = req.headers.authorization.split(" ")[1]; use this when working with bearer token
            const cookie = req.cookies['token']
            if (!cookie) {
                replay.code(404).send({
                    success: false,
                    msg: "invalid or expired jwt"
                })
            }
            const decodedData = jwt.verify(cookie, "mykeymykey");
            req.user = await User.findById(decodedData.id);
            replay.send({ user: req.user }).status(200);
        })

    done();
}

module.exports = userRouter;