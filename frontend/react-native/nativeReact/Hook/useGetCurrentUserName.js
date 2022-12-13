import {useSelector} from "react-redux";

export default function useGetCurrentUserName() {
    const storedUser = useSelector(store => store.SigninReducer);
    return JSON.parse(atob(storedUser.split('.')[1])).username;
}