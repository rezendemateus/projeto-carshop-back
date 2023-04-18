import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import jwt from "jsonwebtoken";

const sessionService = async ({ email, password }) => {

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
        email: email,
    });

    if (!user) {
        throw new AppError(400, "User is not exists or invalidate email!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
        throw new AppError(403, "password invalid");
    }

    const token = jwt.sign(
        {
            type: user.email,
        },
        process.env.SECRET_KEY,
        {
            subject: user.id,
            expiresIn: "24h",
        }
    );

    return token;

}

export default sessionService