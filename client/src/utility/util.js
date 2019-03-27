import axios from 'axios';

export { axios } from 'axios';

export const secure = axios.create({
    headers: {authorization: localStorage.getItem("token")}
});