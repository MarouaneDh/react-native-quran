import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';

import Sourates from '../data.json'

import axios from 'axios'

function OneSourat(props: any) {
    const [data, setData] = useState([])
    const [lang, setLang] = useState('FR')
    const [loading, setLoading] = useState(false)
    const [audioState, setAudioState] = useState('stopped')

    const id = props.route.params.id

    const [sourat, setSourat] = useState(id)

    const playSound = async () => {
        try {
            await TrackPlayer.add({
                id: sourat,
                url: sourat < 10 ? `https://server12.mp3quran.net/shah/00${sourat}.mp3` :
                    sourat < 100 ? `https://server12.mp3quran.net/shah/0${sourat}.mp3` :
                        `https://server12.mp3quran.net/shah/${sourat}.mp3`
            })
            setAudioState('playing')
            await TrackPlayer.play();
        } catch (error) {
            console.error('Error playing track:', error);
        }
    };

    const pausePlayback = async () => {
        try {
            await TrackPlayer.pause()
            setAudioState('paused')
        } catch (error) {
            console.error('Error pausing playback:', error);
        }
    };

    const stopPlayback = async () => {
        try {
            setAudioState('stopped')
            await TrackPlayer.reset()
        } catch (error) {
            console.error('Error stopping playback:', error);
        }
    };

    const getData = async () => {
        setLoading(true)
        if (lang === 'EN') {
            await axios.get(`https://quranenc.com/api/v1/translation/sura/english_saheeh/${sourat}`)
                .then(res => {
                    setData(res.data.result)
                    setLoading(false)
                })
        }
        if (lang === 'FR') {
            await axios.get(`https://quranenc.com/api/v1/translation/sura/french_hameedullah/${sourat}`)
                .then(res => {
                    setData(res.data.result)
                    setLoading(false)
                })
        }
        if (lang === 'ES') {
            await axios.get(`https://quranenc.com/api/v1/translation/sura/spanish_garcia/${sourat}`)
                .then(res => {
                    setData(res.data.result)
                    setLoading(false)
                })
        }
        if (lang === 'PT') {
            await axios.get(`https://quranenc.com/api/v1/translation/sura/portuguese_nasr/${sourat}`)
                .then(res => {
                    setData(res.data.result)
                    setLoading(false)
                })
        }
        if (lang === 'JA') {
            await axios.get(`https://quranenc.com/api/v1/translation/sura/japanese_saeedsato/${sourat}`)
                .then(res => {
                    setData(res.data.result)
                    setLoading(false)
                })
        }
    }

    const prev = async () => {
        let number = sourat
        if (number !== 1) {
            try {
                await TrackPlayer.reset();
                await TrackPlayer.remove(sourat);
                setSourat(number - 1)
            } catch (error) {
                console.error('Error playing track:', error);
            }
        }
    }

    const next = async () => {
        let number = sourat
        if (number !== 114) {
            try {
                await TrackPlayer.reset();
                await TrackPlayer.remove(sourat);
                setSourat(number + 1)
            } catch (error) {
                console.error('Error playing track:', error);
            }
        }
    }

    const buttons = () => {
        return (
            <View style={styles.langBloc}>
                <Button disabled={sourat === 1} onPress={() => prev()} title='prev' />
                <Button color={lang === 'FR' ? "#32e500" : "#2196F3"} onPress={() => setLang('FR')} title='FR' />
                <Button color={lang === 'EN' ? "#32e500" : "#2196F3"} onPress={() => setLang('EN')} title='EN' />
                <Button color={lang === 'ES' ? "#32e500" : "#2196F3"} onPress={() => setLang('ES')} title='ES' />
                <Button color={lang === 'PT' ? "#32e500" : "#2196F3"} onPress={() => setLang('PT')} title='PT' />
                <Button color={lang === 'JA' ? "#32e500" : "#2196F3"} onPress={() => setLang('JA')} title='JA' />
                <Button disabled={sourat === 114} onPress={() => next()} title='next' />
            </View>
        )
    }

    useEffect(() => {
        getData();
    }, [lang, sourat]);

    return (
        loading ?
            <View style={styles.container}>
                <Text style={styles.title}>{Sourates?.data[sourat - 1].name} ({Sourates?.data[sourat - 1].transliteration})</Text>
                <ActivityIndicator color="#2196F3" size="large" />
            </View> :
            <SafeAreaView style={styles.container}>
                <StatusBar hidden />
                {buttons()}
                <View style={styles.playBtns}>
                    {
                        audioState === 'paused' || audioState === 'stopped' ?
                            <Button title='Play' color="#2196F3" onPress={() => playSound()} /> :
                            <Button title='Pause' color="#ffbf00" onPress={() => pausePlayback()} />
                    }
                    <Button title='Stop' color="#ff0042" onPress={() => stopPlayback()} />
                </View>
                <ScrollView>
                    <Text style={styles.title}>{Sourates?.data[sourat - 1].name} ({Sourates?.data[sourat - 1].transliteration})</Text>
                    <View style={styles.sectionContainer}>
                        {
                            data && data.map((el: any) => {
                                return <View style={styles.bloc} key={el.id}>
                                    <Text style={styles.aya}>{el.arabic_text}</Text>
                                    <Text style={styles.ayaTranslation}>{el.translation}</Text>
                                    <Text style={styles.ayaTranslation}>{el.footnotes}</Text>
                                </View>
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
    },
    playBtns: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '99%',
        paddingBottom: 25,
        paddingTop: 10,
        borderBlockColor: '#CFAA03',
        borderWidth: 3,
        margin: 3,
        borderRadius: 8
    },
    title: {
        fontSize: 32,
        alignSelf: 'center'
    },
    sectionContainer: {
        marginTop: 20,
        paddingHorizontal: 24,
        justifyContent: 'center'
    },
    langBloc: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 10,
        width: '100%'
    },
    lang: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5
    },
    bloc: {
        marginVertical: 10
    },
    aya: {
        fontSize: 24,
        fontWeight: '600',
    },
    ayaTranslation: {
        fontSize: 16,
        fontWeight: '600',
    },
    ayaTranslationBlue: {
        fontSize: 16,
        fontWeight: '600',
        color: 'blue'
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default OneSourat;
