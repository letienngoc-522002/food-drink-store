import { fetchUser } from "../utils/fetchlocalStorage"
const userInfo = fetchUser();
export const initialState = {
    user: userInfo,
    foodItems:null,
}