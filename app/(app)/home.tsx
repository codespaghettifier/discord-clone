import {ScrollView, StyleSheet, Text, View} from "react-native";
import Button from "../../components/Button";
import ChannelCard from "../../components/ChannelCard";
import {firestoreDB} from "../../firebaseConfig";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {router} from "expo-router";

export default function Home()
{
    const [channels, setChannels] = useState<ChanneldData[]>([]);

    const onChannelCreate = () =>
    {
        router.push("/createRoom");
    }

    const onChannelPress = (name: string) => {
        console.log(`Channel ${name} pressed`);

        router.push(`/messagesView/${name}`)
        
    }
    
    useEffect(() =>
    {
        const getChannels = async () =>
        {
            const {docs} = await getDocs(collection(firestoreDB, "rooms"));
            if (docs.length)
            {
                setChannels([...docs.map((doc) => {
                    const name: string = doc.id;
                    const members: number = new Set(doc.data().messages.map((message: any) => message.username)).size;
                    return {name, members};
                })]);
            }
        };
        getChannels();
    }, []);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dołącz do kanału</Text>
            <ScrollView style={styles.channelList}>
                {channels.map((channel) => (
                    <ChannelCard key={channel.name} onPress={() => {onChannelPress(channel.name)}} name={channel.name} members={channel.members} />
                    ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button onPress={onChannelCreate} label="Utwórz własny kanał" />
            </View>
        </View>
    );
}

type ChanneldData = {
    name: string;
    members: number;
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
    channelList: {
        width: "100%",
        paddingHorizontal: 30,
    },
    formContainer: {
        width: "80%",
        gap: 15,
        alignItems: "center",
        paddingVertical: 30,
    },
    buttonContainer: {
        justifyContent: "space-between",
        gap: 15,
        alignItems: "center",
        marginTop: 30,
    },
    channelCard: {
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        width: "100%",
        backgroundColor: "#4fc3f7",
    },
    channelInfo: {
        marginLeft: 15,
        flexDirection: "column",
        gap: 5,
    }
});