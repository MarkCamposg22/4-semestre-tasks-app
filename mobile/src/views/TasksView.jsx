import { useContext, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { Task, Input, Button, Typography, ErrorModal } from "../components";
import { Colors } from "../config/styles";
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";

export function TasksView() {
    const { logout } = useContext(AuthContext);
    const {
        loading,
        tasks,
        error,
        setError,
        createTask,
        updateTask,
        removeTask,
    } = useContext(TaskContext);

    const [title, setTitle] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Typography
                    variant={"title"}
                    text={"Crie e organize as suas tarefas"}
                />
                <TouchableOpacity onPress={logout}>
                    <Typography variant="link" text="Sair" />
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatlist}
                keyExtractor={(_, index) => index}
                data={tasks}
                renderItem={({ item, index }) => (
                    <Task
                        title={item.title}
                        finished={item.finished}
                        handleCheck={async () => {
                            await updateTask({
                                idTask: item.id,
                                finished: !item.finished,
                            });
                        }}
                        handleRemove={async () => {
                            await removeTask({ idTask: item.id });
                        }}
                    />
                )}
            />
            <View style={styles.form}>
                <Input
                    placeholder="Insira o nome da tarefa"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <Button
                    title={"Adicionar"}
                    loading={loading}
                    onPress={async () => {
                        await createTask({ title });
                        setTitle("");
                    }}
                />
            </View>
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
        alignItems: "center",
        paddingBottom: 10,
        backgroundColor: Colors.primary,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    flatlist: {
        width: "100%",
        marginVertical: 20,
    },
    form: {
        width: "100%",
    },
});
