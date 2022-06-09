import { http } from "./config";

export default {

    listar:() => {
        return http.get('users')
    },

    salvar:(user) => {
        return http.post('user', user)
    }
}