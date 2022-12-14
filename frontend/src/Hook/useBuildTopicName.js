import {useSelector} from "react-redux";
import useGetTopicFromUsers from "./useGetTopicFromUsers";


export default function useBuildTopicName() {
    const storedUser = useSelector(store => store.SigninReducer)
    const getTopicFromUsers = useGetTopicFromUsers();
    const currentUserId = JSON.parse(atob(storedUser.split('.')[1]));

    console.log(storedUser);
    console.log(currentUserId);
    return function (otherUserId) {
        return getTopicFromUsers(currentUserId, otherUserId);
    }
}