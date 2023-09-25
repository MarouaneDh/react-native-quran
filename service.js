import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
    // ... (other code)

    // Define custom playback service functions
    TrackPlayer.addEventListener('remote-play', () => {
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener('remote-pause', () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener('remote-stop', () => {
        TrackPlayer.stop();
    });

    // Handle custom playback actions
    TrackPlayer.addEventListener('custom-play', async () => {
        try {
            const trackId = await TrackPlayer.getCurrentTrack();
            if (trackId !== sourat.toString()) {
                // Load the track if it's not already loaded
                await TrackPlayer.add({
                    id: sourat.toString(),
                    url:
                        sourat < 10
                            ? `https://server12.mp3quran.net/shah/00${sourat}.mp3`
                            : sourat < 100
                                ? `https://server12.mp3quran.net/shah/0${sourat}.mp3`
                                : `https://server12.mp3quran.net/shah/${sourat}.mp3`,
                });
            }

            // Play the track
            await TrackPlayer.play();
        } catch (error) {
            console.error('Error playing track:', error);
        }
    });

    TrackPlayer.addEventListener('custom-pause', async () => {
        try {
            await TrackPlayer.pause();
        } catch (error) {
            console.error('Error pausing playback:', error);
        }
    });

    TrackPlayer.addEventListener('custom-stop', async () => {
        try {
            await TrackPlayer.stop();
        } catch (error) {
            console.error('Error stopping playback:', error);
        }
    });

    // ... (other code)
};
