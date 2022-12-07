import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Sound from "react-native-sound"
import NfcManager, {NfcEvents} from "react-native-nfc-manager";

Sound.setCategory('Playback')

let ding = new Sound('bad_omens_like_a_villain.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load sound', error)
        return
    }
    console.log('duration is seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels())
})

function setSoundFromTagId(id) {
    const idsToSound = {
        'D3CD5A1E': 'bad_omens_like_a_villain.mp3',
        'D2F8EC19': 'bfmv_10_years_today.mp3'
    }

    let sound = idsToSound[id]

    ding = new Sound(sound, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load sound', error)
            return
        }
        console.log('duration is seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels())
    })
}


function ScanComp() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
            if(Platform.OS === 'android') {
                // androidPromptRef.current.setHintText(`${count}...`)
            }
            if(1 <= 0) {
                NfcManager.unregisterTagEvent().catch(() => 0)
                // setDuration(new Date().getTime() - start.getTime())

                if(Platform.OS === 'android') {
                    // androidPromptRef.current.setVisible(false)
                }
            }
            console.warn('tag found', tag)
            setVisible(false)
            NfcManager.unregisterTagEvent()
            setSoundFromTagId(tag.id)
            playSound()
        })

        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null)
        }
    }, [])



    function playSound() {
        ding.play(success => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
        })
    }

    function stopPlaySound() {
        ding.pause()
    }

    function restartPlaySound() {
        ding.stop()
        ding.play()
    }

    async function scanTag() {
        setVisible(true)
        await NfcManager.registerTagEvent()
        if(Platform.OS === 'android') {
            // androidPromptRef.current.setVisible(true)
            // console.warn('t')
        }
    }

    return (
        <>
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.btn} onPress={playSound}>
                <Text>START</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={stopPlaySound}>
                <Text>PAUSE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={restartPlaySound}>
                <Text>REPLAY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={scanTag} >
                <Text>SCAN NFC TAG</Text>
            </TouchableOpacity>
        </View>
        {visible && (
            <View style={styles.popup}>
                <Text style={styles.text}>SCAN TAG</Text>
            </View>
        )}
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        margin: 20,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 9,
        padding: 10,
        width: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popup: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        bottom: 0,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'black',
        fontSize: 20
    }
})

export default ScanComp
