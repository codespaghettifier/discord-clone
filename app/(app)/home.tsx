import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import Button from "../../components/Button";
import ChannelCard from "../../components/ChannelCard";

export default function Home()
{
    const onChannelCreate = () => {
        console.log("Utwórz kanał");
    }

    type ChanneldData = {
        name: string;
        members: number;
    }

    const test: ChanneldData[] = []
    for(let i = 0; i < 42; i++)
    {
        test.push({name: `Kanał ${i}`, members: i})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dołącz do kanału</Text>
            <ScrollView style={styles.channelList}>
                {test.map((channel) => (
                    <ChannelCard key={channel.name} name={channel.name} members={channel.members} />
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button onPress={onChannelCreate} label="Utwórz własny kanał" />
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