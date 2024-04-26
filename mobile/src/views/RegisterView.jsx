import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";

import { Button, Input, OrDivider, Typography, ErrorModal } from "../components";
import { Colors } from "../config/styles";
import { AuthContext } from "../contexts/AuthContext";

export function RegisterView({ navigation }) {
    const { register, error, setError, loading } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = async () => {
        await register({ email, password, passwordConfirmation });
    }

    return (
        <View style={styles.container}>
            <Typography variant="subtitle" text="Crie uma conta para acessar nossa plataforma." />
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
                <Input
                    placeholder="Confirmar senha"
                    secureTextEntry
                    value={passwordConfirmation}
                    onChangeText={(text) => setPasswordConfirmation(text)}
                />
                <Button
                    title={'Criar'}
                    onPress={handleSubmit}
                    loading={loading} />
            </View>
            <OrDivider />
            <Typography
                text="Já tenho uma conta"
                variant="link"
                onPress={() => navigation.navigate('Login')}
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
