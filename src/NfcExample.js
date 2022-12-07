import { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import NfcManager, {NfcEvents} from "react-native-nfc-manager";
import AndroidPrompt from "./AndroidPrompt";


function NfcExample() {
    const [tagId, setTagId] = useState()
    const androidPromptRef = useRef()

    useEffect(() => {
        // Ustawiamy EventListener który wykona callback `(tag) => {...` gdy zeskanujemy tag
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
            androidPromptRef.current.setVisible(false)
            NfcManager.unregisterTagEvent() // Wyłącza możliwość zeskanowania taga
            console.warn('tag found', tag) // Wyświetla warna ze wszystkim co ma tag
            setTagId(tag.id)
        })

        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null)
        }
    }, [])

    async function scanTag() {
        androidPromptRef.current.setVisible(true)
        await NfcManager.registerTagEvent() // Aktywuje możliowść zeskanowania taga
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.header}>NFC Example:</Text>
            <View>
                <TouchableOpacity style={styles.btn} onPress={scanTag} >
                    <Text>SCAN NFC TAG</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>NFC tag ID:</Text>
                <Text>{tagId}</Text>
            </View>
            <AndroidPrompt ref={androidPromptRef} />
        </View>
    )
}

const styles = StyleSheet.create({ // CSS-like styling
    wrapper: {
        display: 'flex',
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
    header: {
        position: 'absolute',
        top: -10,
        fontSize: 18,
    }
})

export default NfcExample
