import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { IUser } from "../models/IUser"
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";

export default class Store {
    user_ = {} as IUser;
    isAuth_ = false;
    constructor(){            
        makeAutoObservable(this,{}, { autoBind: true });
        this.isAuth_ = false;
        this.user_ = {} as IUser;
    }
    setAuth (bool: boolean){ //Мутация объекта для обновления его записи(-ей)
        console.log('Setting auth:', bool);
        this.isAuth_ = bool;
    }
    setUser(user: IUser){ //Мутация объекта для обновления его записи(-ей)
        console.log('Setting auth:', user);
        this.user_  = user;
    }
    //Компьютед функции. Они вызываются только в том случае, если переменная, которая использовалась была изменена. Используются для оптимизации.
    get isAuth(){
        return this.isAuth_
    }
    get user(){
        return this.user_
    }
    
    //Эти функции внизу называются actions. Это чистая теория для Mobx. Подобное есть и в redux
    async login(usernameOrEmail:string, password: string, deviceInfo:string){ 
        try{    
            const response = await AuthService.login(usernameOrEmail, password, deviceInfo);
            console.log(response);

            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('deviceInfo', deviceInfo);
            localStorage.setItem('userPermission', JSON.stringify(response.user.permissionId));

            runInAction(() => {
                this.setAuth(true);
                this.setUser(response.user);
            });

        } catch (e) {
            console.error("Error during login:", e);
        }
    }

    async registration(username: string,email: string, password: string, deviceInfo:string){
        try{
            const response = await AuthService.registration(username,email,password,deviceInfo)
            console.log(response)

            localStorage.setItem('token', response.accessToken)
            localStorage.setItem('deviceInfo', deviceInfo);
            localStorage.setItem('userPermission', JSON.stringify(response.user.permissionId));

            runInAction(() => {
                this.setAuth(true);
                this.setUser(response.user);
            });
            
        }
        catch (e){
            console.error("Error during registration:", e);
        }
    }

    async logout(){
        try {
            await AuthService.logout();

            localStorage.removeItem('token');
            localStorage.removeItem('deviceInfo');
            localStorage.removeItem('userPermission');

             runInAction(() => {
                this.setAuth(false);
                this.setUser({} as IUser);
            });

        } catch (e) {
            console.error("Error during logout:", e);
        }
    }
    async checkAuth() {
        try {
          const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/user/refresh`, { withCredentials: true });
          console.log('Response from /user/refresh:', response.data);
    
          localStorage.setItem('token', response.data.accessToken);
    
          const deviceInfo = {
            userAgent: navigator.userAgent,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
          };
    
          localStorage.setItem('deviceInfo', JSON.stringify(deviceInfo));
          localStorage.setItem('userPermission', JSON.stringify(response.data.user.permissionId));
    
          runInAction(() => {
            this.setAuth(true);
            this.setUser(response.data.user);
          });
        } catch (error) {
          console.error("Error during checkAuth:", error);
        }
      }
}