import { User } from "src/app/modals/user.modal";

export interface authState {
    user:User|null
};

export const initialState:authState = {user:null};