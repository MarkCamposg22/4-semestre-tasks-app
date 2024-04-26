import { Button, Modal, StyleSheet, Text, View } from "react-native";

import { Colors } from "../config/styles";

export function ErrorModal({ visible, errorMessage, onClose }) {
    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Houve um erro!</Text>
                    <Text style={styles.text}>{errorMessage}</Text>
                    <Button color={Colors.purple} title="Fechar" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalView: {
        backgroundColor: Colors.light,
        borderRadius: 10,
        padding: 10,
        height: '20%',
        width: '70%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: Colors.red
    },
    text: {
        fontSize: 16,
        marginBottom: 30
    },
});
