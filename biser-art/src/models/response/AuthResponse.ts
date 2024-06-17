import { IUser } from "../IUser";

export interface AuthResponse{
    accessToken: string;
    refreshToken:string;
    deviceInfo:string;
    user:IUser;
    //Подсоедини Card и сделай интерфейс ICard
}