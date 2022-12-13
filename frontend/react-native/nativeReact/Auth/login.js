import React, {useContext, useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity, StyleSheet,
} from "react-native";
import {authUserContext, AuthUserProvider} from "../Contexts/auth";
import {selectUser, setUser} from "../Redux/userSlice";
import {useSelector, useDispatch} from "react-redux";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import useGetJWT from "../Hook/useGetJWT";
import List from "../Screens/list";
import jwt from 'jwt-decode';


const Login = ({navigation}) =>{
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || '/';
    const dispatch = useDispatch();
    const getJWT = useGetJWT()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedUser, setLoggedUser] = useContext(userContext);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getJWT(username, password).then(data => {
            if (data.JWT) {
                setLoggedUser(data.JWT);
                dispatch(LoginAction(data.JWT));
                navigate(from, {replace: true});
            } else {
                console.log(data)
            }
        })
    }

    return(
        <SafeAreaView >
            <View  >
                <View >
                    <Text>Username</Text>
                    <TextInput id="username" onChangeText={handleUsername} value={username} placeHolder="username" style={styles.input}/>
                </View>
                <View style={styles.form}>
                    <Text>Password</Text>
                    <TextInput id="username"onChangeText={handlePassword} value={password}  placeHolder="password" style={styles.input} autoCapitalize='none' secureTextEntry={true}/>
                </View>
                <View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        )
}
const styles = StyleSheet.create({

    })
 export default Login;

