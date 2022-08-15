import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Deal = ({ deal, setCurrentDeal }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => setCurrentDeal(deal)}>
            <Image source={{ uri: deal.media[0] }} style={styles.image} />
            <View style={styles.description}>
                <Text style={styles.title}>{deal.title}</Text>
                <View style={styles.footer}>
                    <Text style={styles.cause}>{deal.cause.name}</Text>
                    <Text style={styles.price}>${(deal.price) / 100}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        backgroundColor: "white",
        marginVertical: 10,
        borderRadius: 10,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: 150
    },
    description: {
        padding: 10
    },
    title: {
        fontSize: 23,
        fontWeight: "700",
        color: "black",
        textAlign: "center"
    },
    footer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    cause: {
        fontSize: 20
    },
    price: {
        fontSize: 20,
        color: "black",
        fontWeight: "600"
    }
})

export default Deal;
