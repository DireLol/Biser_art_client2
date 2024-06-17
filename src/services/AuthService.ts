import $api from "../http/index";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(usernameOrEmail: string, password: string, deviceInfo: string): Promise<AuthResponse> {
        const result = await $api.post<AuthResponse>('/user/signIn', { usernameOrEmail, password }, {
            headers: {
                'deviceinfo': deviceInfo
            },
        });
        return result.data;
    }
    static async registration(username: string, email: string, password: string, deviceInfo: string): Promise<AuthResponse> {
        const result = await $api.post<AuthResponse>('/user/signUp', { username, email, password }, {
            headers: {
                'deviceinfo': deviceInfo
            },
            
        });
        return result.data;
    }
    static async logout(): Promise<void> {
        return $api.post('/user/logout')
    }
}