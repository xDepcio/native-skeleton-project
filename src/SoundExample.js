import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Sound from "react-native-sound"


function SoundExample() {
    const [soundSample, setSoundSample] = useState()

    useEffect(() => {
        Sound.setCategory('Playback')

        // Zdefiniowanie dźwieku to utworzenie nowego obiektu Sound(<filename>, <jakis optional shit dajcie Sound.MAIN_BUNDLE>, <callback(error)>)
        // filename to nazwa pliku (a-z, 0-9, _) w folderze ./android/app/src/main/res/raw (musi być w tym folderze)
        // filename może też być adresem URL do pliku
        const sample = new Sound('bfmv_10_years_today.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load sound', error)
                return
            }
        })
        setSoundSample(sample)
    }, [])

    function playSound() {
        soundSample.play(success => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
        })
    }

    function stopPlaySound() {
        soundSample.pause()
    }

    function restartPlaySound() {
        soundSample.stop()
        soundSample.play()
    }

    function changeSound() { // Nie najlepszy sposób ale żeby było wiadomo ocb
        soundSample.pause()

        const newSoundPath = soundSample._filename === 'bfmv_10_years_today' ? // Tutaj nowa linia bo za długie jak co
            'bad_omens_like_a_villain.mp3' : 'bfmv_10_years_today.mp3'

        const newSample = new Sound(newSoundPath, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load sound', error)
                return
            }
        })
        setSoundSample(newSample)
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.header}>Sound Example:</Text>
            <TouchableOpacity style={styles.btn} onPress={playSound}>
                <Text>START</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={stopPlaySound}>
                <Text>PAUSE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={restartPlaySound}>
                <Text>REPLAY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={changeSound}>
                <Text>CHANGE SOUND</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15
    },
    btn: {
        margin: 10,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 9,
        paddingVertical: 10,
        width: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        position: 'absolute',
        top: -25,
        fontSize: 18,
        left: 20
    }
})

export default SoundExample
