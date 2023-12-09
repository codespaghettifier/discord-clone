import { FC } from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";

type ChanneldData = {
    onPress: () => void;
    name: string;
    members: number;
}

const ChannelCard: FC<ChanneldData> = ({ onPress, name, members }) => {
    return (
        <Pressable onPress={onPress} style={styles.channelCard}>
            <Image source={require("../assets/images/favicon.png")} />
            <View style={styles.channelInfo}>
                <Text>{name}</Text>
                <Text>{members} członków</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
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

export default ChannelCard;