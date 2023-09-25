import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import Sourates from '../data.json';

function Home() {
    const data = Sourates.data;

    const oneSourat = (item: any) => {
        return (
            <Pressable style={styles.soura} key={item.id}>
                <Text style={styles.text}>{item.name}</Text>
            </Pressable>
        );
    };

    return (
        <SafeAreaView>
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
    list: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    soura: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        height: 40,
        borderBlockColor: '#000',
        borderWidth: 1.5,
        borderRadius: 10,
        margin: '1.5%',
    },
    text: {
        fontSize: 20,
        fontWeight: '600'
    }
});

export default Home;