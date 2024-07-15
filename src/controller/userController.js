import userService from '../service/userService';

class UserController {
    getUserStats = async (req, res) => {
        try {
            const { page, limit } = req.query;
            const data = await userService.getUserStats(page, limit);
            return res.status(400).json({ data });
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    };

    createUser = async (req, res) => {
        try {
            const { name, password, phone, role } = req.body;
            const created = await userService.createUser(name, password, phone, role);
            if (!created)
                return res.status(400).json({ message: `Couldn't Create User` });

            return res.status(400).json({ message: `User Created Successfully` });
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    };

    login = async (req, res) => {
        try {
            const { phone, password } = req.body;
            const result = await userService.login(phone, password);
            if (!result.isValid)
                return res.status(400).json({ message: `Couldn't Log In` });

            return res.status(200).json({ token: result.jwtToken, message: `Logged In Successfully` });
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    };
}

export default new UserController();