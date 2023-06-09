import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../database/entities/users.entity";
import AppError from "../../errors/AppError"
import { iUserUpdateReq } from "../../interfaces/User/request";
import { iUserResponse } from "../../interfaces/User/response";


const userPatchService = async (dataUpdate: iUserUpdateReq, idUser: string): Promise<iUserResponse> => {

    const userRespository = AppDataSource.getRepository(User);
    const findUser = await userRespository.findOneBy({ id: idUser });

    if (!findUser) {
        throw new AppError(404, "User not exists!");
    };

    if (dataUpdate.password) {

        const updateUser = userRespository.create({
            ...findUser,
            ...dataUpdate,
            password: hashSync(`${dataUpdate.password}`, 10),
        });

        await userRespository.save(updateUser);

        const { password, ...dataResponse } = updateUser;

        return dataResponse;
    }

    const updateUser = userRespository.create({
        ...findUser,
        ...dataUpdate,
    });

    const saveDataUpdateUser = await userRespository.save(updateUser);

    const { password, ...dataResponse } = saveDataUpdateUser;

    return dataResponse;
}

export { userPatchService }