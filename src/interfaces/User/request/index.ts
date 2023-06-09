
export interface iUserRequest{
    name: string;
    cpf: string;
    email: string;
    password: string;
    telephone: string;
    date_of_birth: string;
    description: string;
    buyer?: boolean;
    addressId: string;
}

export interface iUserUpdateReq {
    name?: string;
    cpf?: string;
    email?: string;
    password?: string;
    telephone?: string;
    date_of_birth?: string;
    description?: string;
}

export interface iUserResponse{
    id: string;
    name: string;
    cpf: string;
    email: string;
    telephone: string;
    date_of_birth: string;
    description: string;
    buyer: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface iOneUserResponse {
    id: string;
    name: string;
    cpf: string;
    email: string;
    telephone: string;
    date_of_birth: string;
    description: string;
    buyer: boolean;
    createdAt: Date;
    updatedAt: Date;
    addressId: string;
}