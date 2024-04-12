import { StyleSheet, View, Alert } from "react-native";

import { Button, Input, OrDivider, Typography } from "../components";
import { Colors } from "../config/styles";

export function RegisterView({ navigation }) {
    return (
        <View style={styles.container}>
            <Typography variant="subtitle" text="Crie uma conta para acessar nossa plataforma." />
            <View style={styles.form}>
                <Input placeholder="E-mail" />
                <Input placeholder="Senha" secureTextEntry />
                <Input placeholder="Confirmar senha" secureTextEntry />
                <Button title={'Criar'} onPress={() => Alert.alert('Criar')} />
            </View>
            <OrDivider />
            <Typography
                text="Já tenho uma conta"
                variant="link"
                onPress={() => navigation.navigate('Login')}
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
