import {FC} from "react";
import {useForm} from "react-hook-form";
import {StyleSheet, Text, View} from "react-native";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import {firestoreDB} from "../../firebaseConfig";
import {setDoc, doc} from "firebase/firestore";
import {router} from "expo-router";

const defaultValues = {
    name: "",
};

const onSubmit = async ({name}: typeof defaultValues) =>
{
    const createChannel = async (name: string) =>
    {
        try
        {
            setDoc(doc(firestoreDB, `rooms/${name}/`), {messages: []})
        } catch (error)
        {
            console.error(error);
        }
    }

    try
    {
        await createChannel(
            name
        );
        router.push("/home");
    } catch (error)
    {
        console.error(error);
    }
};

const CreateRoom: FC = () =>
{
    const {control, handleSubmit, setError} = useForm({defaultValues});


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Utwórz nowy kanał</Text>
            <View style={styles.formContainer}>
                <TextInput
                    name="name"
                    control={control}
                    placeholder="Nazwa kanału"
                    required
                />
                <Button onPress={handleSubmit(onSubmit)} label="Utwórz" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 30,
    },
    title: {
        fontSize: 24,
        color: "#276B81",
        marginBottom: 30,
    },
    formContainer: {
        flex: 1,
        justifyContent: "center",
        gap: 15,
    },
});

export default CreateRoom;