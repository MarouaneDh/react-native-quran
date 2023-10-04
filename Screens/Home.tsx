import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Sourates from '../data.json';
const bg = "../assets/circle.png"

function Home({ navigation }) {
    const [loading, setLoading] = useState(true)
    const data = Sourates.data;

    const oneSourat = (item: any) => {
        return (
            <Pressable onPress={() => navigation.navigate('Soura', { id: item.id })} style={styles.soura} key={item.id}>
                <Text style={styles.text}>{item.name}</Text>
                <Image
                    style={styles.img}
                    source={require(bg)}
                    alt={item.name}
                />
            </Pressable>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])


    return (
        !loading && <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.list}>
                    {
                        data.map((soura: any) => {
                            return (
                                oneSourat(soura)
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBlockColor: '#CFAA03',
        borderWidth: 3,
        margin: 3,
        borderRadius: 8
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    soura: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        height: 90,
        marginVertical: '3%',
        marginHorizontal: '1%',
    },
    text: {
        fontSize: 25,
        fontWeight: '600',
        position: 'absolute',
        color: '#CFAA03'
    },
    img: {
        width: 110,
        height: 110
    }
});

export default Home;