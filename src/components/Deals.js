import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import Deal from './Deal';

const Deals = ({ deals, setCurrentDeal, search }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.searchBar} placeholder="Search Deal..." onChangeText={(e) => search(e)} />
            {
                deals.length > 0 ? <ScrollView style={styles.list}>
                    {deals.map(deal => <Deal setCurrentDeal={setCurrentDeal} deal={deal} key={deal.key} />)}
                </ScrollView> : <Text style={styles.noDeal}>No Deal Found</Text>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#ccc",
        flex: 1,
    },
    noDeal: {
        margin: 10,
        fontSize: 20
    },
    list: {
        padding: 20,
        width: "100%",
        paddingTop: 5
    },
    searchBar: {
        width: "100%",
        backgroundColor: "white",
        marginTop: 10,
        padding: 5,
        fontSize: 18,
    }
})

export default Deals;
