import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import User from '../../entities/users.entity';
import { iUserRequest, iUserResponse } from '../../interfaces/User/index';

export const createUserService = async (userData: iUserRequest): Promise<iUserResponse> => {

    const userRepository = AppDataSource.getRepository(User);

    const searchUserByEmail = await userRepository.findOneBy({email: userData.email});
    if (searchUserByEmail){
        throw new AppError(409, "Email already exists");
    };

    const user = userRepository.create(userData);
    await userRepository.save(user);

    const { password, ...userWithoutPassword  } = user

    return userWithoutPassword;
}; 