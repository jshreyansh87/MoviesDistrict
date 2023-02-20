import userModel from '../models/user.model.js';
import jsonwebtoken from 'jsonwebtoken'
import responseHandler from '../handlers/response.handler';

const signup = async (req, res) => {
    try {
        const { username, password, displayName } = req.body;

        const checkUser = await userModel.findOne({ username });

        if (checkUser) {
            return responseHandler.badRequest(res, "Username already exists");
        }

        const user = new userModel();

        user.displayName = displayName;
        user.username = username;
        user.setPassword(password);

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        );

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        });

        await user.save();
    } catch {
        responseHandler.error(res);
    }
}