import React, { useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text } from 'react-native';
import { fetchInitDeals, searchDeal } from '../api';
import DealDetail from './DealDetail';
import Deals from './Deals';

const App = () => {
    let transformAnimation = new Animated.Value(1);
    const [deals, setDeals] = useState(null);
    const [currentDeal, setCurrentDeal] = useState(null);
    const animate = (d) => {
        Animated.timing(transformAnimation, {
            toValue: d,
            duration: 1000,
            useNativeDriver: true
        }).start(() => d === 1 ? animate(1.25) : animate(1));
    }
    if (deals === null) {
        animate(1.25);
        fetchInitDeals().then(res => {
            setDeals(res);
        });
    }
    const search = (searchTerm) => {
        searchDeal(searchTerm).then(res => setDeals(res));
    }
    if (currentDeal) {
        return (
            < DealDetail deal={currentDeal} setCurrentDeal={setCurrentDeal} />
        )
    }
    if (deals) {
        return (
            <Deals deals={deals} setCurrentDeal={setCurrentDeal} search={search} />
        );
    }
    return (
        <SafeAreaView style={styles.header}>
            <Animated.Text style={[{ transform: [{ scale: transformAnimation }] }, styles.heading]}>Bakesale</Animated.Text>
        </SafeAreaView>
    );
}

export default App;

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        fontSize: 35,
        fontWeight: "900",
        color: "black"
    }
})
