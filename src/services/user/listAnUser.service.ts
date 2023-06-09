import { AppDataSource } from "../../data-source";
import { iUserResponse } from "../../interfaces/User/response";
import AppError from "../../errors/AppError";
import Users from '../../database/entities/users.entity';
import { iOneUserResponse } from "../../interfaces/User/request";
import { oneUserResponseSerializer } from "../../serializers/User/users.serializers";

export const listAnUserService = async (userId: string): Promise<iOneUserResponse> => {
    const userRepository = AppDataSource.getRepository(Users);
    
    const { address: { id }, ...user } = await userRepository.findOneOrFail({
        where: {
            id: userId
        },
        relations: {
            address: true
        }
    }).catch(reason => { throw new AppError(404, "User not exist!") })

    const correctUserFormat = await oneUserResponseSerializer.validate({ ...user, addressId: id }, {
        stripUnknown: true
    });

    return correctUserFormat;
}
