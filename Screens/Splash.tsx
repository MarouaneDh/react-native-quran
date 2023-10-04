import React, { useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const bg = "../assets/bismillah.png"

function Home({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 2000);
    }, [navigation])

    return (
        <SafeAreaView style={styles.bg_container}>
            <View>
                <Image
                    style={styles.img}
                    source={require(bg)}
                    alt='bismillah'
                />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    bg_container: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '98.5%',
        height: '100%',
        borderBlockColor: '#CFAA03',
        borderWidth: 3,
        margin: 3,
        borderRadius: 8
    },
    img: {
        width: 270,
        height: 187
    }
});

export default Home;