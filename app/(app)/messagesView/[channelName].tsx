import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import {firestoreDB} from "../../../firebaseConfig";
import {setDoc, doc, onSnapshot} from "firebase/firestore";
import {router, useLocalSearchParams, useNavigation} from "expo-router";
import {useAuthStore} from "../../../stores/auth";

const MessagesView: FC = () => {
    const defaultValues = {
        message: "",
    };
    const {user} = useAuthStore();

    const {control, handleSubmit, setError} = useForm({defaultValues});
    const [messages, setMessages] = useState<Message[]>([]);
    const localParams = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerTitle: localParams.channelName });

        const unsub = onSnapshot(
          doc(firestoreDB, `rooms/${localParams.channelName}/`),
          (doc) => {
            setMessages(doc.data()?.messages);
          }
        );
        return unsub;
    }, []);

    const onSubmit = async ({message}: typeof defaultValues) =>
    {
        const createChannel = async (message: string) =>
        {
            try
            {
                setDoc(doc(firestoreDB, `rooms/${localParams.channelName}/`), {
                    messages: [...messages, {username: user?.email, message: message}]})
            } catch (error)
            {
                console.error(error);
            }
        }
    
        try
        {
            await createChannel(message);
        } catch (error)
        {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{localParams.channelName}</Text>
            <ScrollView style={styles.messagesList}>
                {messages.map((message) => (
                    <View style={styles.message}>
                        <Text>{message.username}</Text>
                        <Text style={styles.messageText}>{message.message}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.messageInputContainer}>
                <TextInput
                    name="message"
                    control={control}
                    placeholder=""
                    required
                />
                <Button onPress={handleSubmit(onSubmit)} label="Wyślij" />
            </View>
        </View>
    );
}

type Message = {
    username: string;
    message: string;
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
    messagesList: {
        width: "100%",
        paddingHorizontal: 30,
    },
    messageInputContainer: {
        backgroundColor: "#276B81",
        flexDirection: "column",
    },
    message: {
        paddingTop: 10,
    },
    messageText: {
        backgroundColor: "#4fc3f7",
        padding: 5,
        borderRadius: 10,
    }
});

export default MessagesView;