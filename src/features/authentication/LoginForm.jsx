import { useState } from "react";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin";

export function LoginForm() {
    const [email, setEmail] = useState("sameh@oasis.com");
    const [password, setPassword] = useState("12345678");
    const { loginUser, isLoggingIn } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser({ email, password }, { onSettled: () => setPassword("") });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <FormRow label="Email address" id="email">
                <Input
                    type="email"
                    id="email"
                    autoComplete="username"
                    placeholder="employee@oasis.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoggingIn}
                />
            </FormRow>

            <FormRow label="Password" id="password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                />
            </FormRow>
            <Button
                type="submit"
                disabled={isLoggingIn}
                variation="primary"
                className="w-full"
            >
                {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
        </form>
    );
}
