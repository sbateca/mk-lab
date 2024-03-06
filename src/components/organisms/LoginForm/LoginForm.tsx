import { ChangeEvent, useState } from "react"
import { Navigate } from "react-router-dom"
import { FormControl, Button, Box } from "@mui/material"

import { getUserByUserNameAndPassword } from "../../../services/userService"
import { LoginFormStyles } from "./LoginFormStyles"
import TextFieldComponent from "../../atoms/TextField/TextField"
import { useCookies } from "../../../utils/hooks/useCookies"

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const cookies = useCookies();

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await getUserByUserNameAndPassword({ username: email, password });
            if (response.length > 0) {
                cookies?.set("userData", response, { path: "/" });
                setIsLoggedIn(true);
            } else {
                throw new Error("email or password incorrect, please try again.");
            }
        } catch (error) {
            throw new Error("something has happened when tried to get user data.");
        }
    };

    return (
        <Box sx={LoginFormStyles.container} >
            {isLoggedIn ? (
                <Navigate to="/admin" />
            ) : (
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <FormControl required>
                            <TextFieldComponent
                                label="Email"
                                variant="outlined"
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </FormControl>
                        <FormControl required>
                            <TextFieldComponent
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary">
                            Log in
                        </Button>
                    </Box>
                </form>
            )}
        </Box>
    );
};

export default LoginForm;
