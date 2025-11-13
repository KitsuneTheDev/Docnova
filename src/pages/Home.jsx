import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";

export default function Home() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // redux states
    // const { loading, error} = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const userCredentials = {
            email,
            password,
        }
        dispatch(loginUser(userCredentials)).then((result) => {
            if(result.payload) {
                console.log(result.payload);
                setEmail("");
                setPassword("");
            } else {
                console.error(result);
            }
        });
    }

    return(
        <>
        <h1>Home</h1>
        <form action="#" className="loginForm" onSubmit={handleLoginSubmit}>
            <label htmlFor="emailInput">email</label>
            <input type="email" name="email input" id="emailInput" onChange={(event) => setEmail(event.target.value)} />
            <label htmlFor="passwordInput">password</label>
            <input type="password" name="password input" id="passwordInput" onChange={(event) => setPassword(event.target.value)} />
            <button type="submit">Login</button>
        </form>
        </>
    );
}