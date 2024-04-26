import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button, ErrorModal, Input, OrDivider, Typography } from "../components";
import { Colors } from "../config/styles";
import { AuthContext } from "../contexts/AuthContext";

export function LoginView({ navigation }) {
    const { login, error, setError, loading } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        await login({ email, password })
    }

    return (
        <View style={styles.container}>
            <Typography text="Bem vindo!" variant="title" />
            <Typography variant="subtitle" text="Entre na sua conta para acessar nossa plataforma." />
            <View style={styles.form}>
                <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Button title={'Entrar'} onPress={handleSubmit} loading={loading} />
            </View>
            <OrDivider />
            <Typography
                text="Criar uma conta"
                variant="link"
                onPress={() => navigation.navigate('Register')}
            />
            <ErrorModal
                visible={!!error}
                errorMessage={error}
                onClose={() => setError(null)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    form: {
        width: '100%',
        alignItems: 'center',
        gap: 10
    },
});
