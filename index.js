import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import Home from './Screens/Home';

// Initialize the TrackPlayer before registering the component
async function initTrackPlayer() {
    await TrackPlayer.setupPlayer({});
    TrackPlayer.registerPlaybackService(() => require('./service.js')); // You may need to create a service file
}

initTrackPlayer() // Initialize TrackPlayer

AppRegistry.registerComponent(appName, () => App);