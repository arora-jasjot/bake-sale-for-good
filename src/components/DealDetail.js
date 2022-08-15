import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, Image, PanResponder, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchDeal } from '../api';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const DealDetail = ({ deal, setCurrentDeal }) => {

    let rotateAnimation = new Animated.Value(0)
    let imagePosition = new Animated.Value(0)

    const [imageIndex, setImageIndex] = useState(0);

    const width = Dimensions.get('window').width;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            const direction = Math.sign(gestureState.dx);
            if (Math.abs(gestureState.dx) > 0.4 * width) {
                if (deal.media[imageIndex - direction]) {
                    Animated.timing(imagePosition, {
                        useNativeDriver: true,
                        toValue: direction * width,
                        duration: 250
                    }).start((animation) => {
                        if (animation.finished) {
                            setImageIndex(imageIndex => imageIndex - direction);

                        }
                    });
                }
            }
            else {
                Animated.timing(imagePosition, {
                    useNativeDriver: true,
                    toValue: 0
                }).start();
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            console.log(gestureState.dx);
        }
    })


    const [dealDeatils, setDealDetails] = useState(null);
    const spin = () => {
        rotateAnimation.setValue(0);
        Animated.timing(rotateAnimation, {
            duration: 1000,
            useNativeDriver: true,
            toValue: 1,
            easing: Easing.linear
        }).start((animation) => {
            if (animation.finished) spin();
        });
    }
    if (dealDeatils === null) {
        spin();
        fetchDeal(deal.key).then(deal => {
            setDealDetails(deal)
        });
    }
    return (
        <SafeAreaView>
            <Pressable onPress={() => setCurrentDeal(null)}>
                <Text style={styles.backButton}>Back</Text>
            </Pressable>
            <ScrollView style={styles.deal}>
                <Animated.Image {...panResponder.panHandlers} source={{ uri: deal.media[imageIndex] }} style={[{ transform: [{ translateX: imagePosition }] }, styles.image]} />
                <Text style={styles.title}>{deal.title}</Text>
                {dealDeatils !== null ?
                    <>
                        <View style={styles.header}>
                            <View style={styles.about}>
                                <Text style={styles.headerText}>{dealDeatils.cause.name}</Text>
                                <Text style={[styles.headerText, styles.price]}>${(dealDeatils.price) / 100}</Text>
                            </View>
                            <View style={styles.user}>
                                <Image source={{ uri: dealDeatils.user.avatar }} style={styles.headerImage} />
                                <Text style={styles.headerText}>{dealDeatils.user.name}</Text>
                            </View>
                        </View>
                        <Text style={styles.description}>{dealDeatils.description}</Text>
                    </> :
                    <View style={styles.loading}>
                        <Animated.View style={{
                            transform: [{
                                rotate: rotateAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["0deg", "360deg"]
                                })
                            }]
                        }}>
                            <Icon name="loading1" size={30} color="#900" />
                        </Animated.View>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backButton: {
        fontSize: 18,
        color: "black",
        margin: 5,
        marginLeft: 10
    },
    deal: {
        flexGrow: 1,
        width: "100%"
    },
    image: {
        width: "100%",
        height: 150
    },
    title: {
        padding: 10,
        backgroundColor: "#FCFFC0",
        fontSize: 20,
        color: "black",
        fontWeight: "600",
        letterSpacing: 1.25
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1
    },
    headerImage: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    headerText: {
        fontSize: 16,
        color: "black",
        marginVertical: 10,
        textAlign: "center"
    },
    price: {
        fontWeight: "600",
        fontSize: 20
    },
    user: {
        flexDirection: "column",
        alignItems: "center"
    },
    description: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18
    },
    loading: {
        flex: 1,
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default DealDetail;
