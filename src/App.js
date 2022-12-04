import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import NfcManager from "react-native-nfc-manager";
import Game from "./Game";
import AndroidPrompt from "./AndroidPrompt";
import ScanComp from "./ScanComp";

function App(props) {
    const [hasNfc, setHasNfc] = React.useState(null)
    const [enabled, setEnabled] = React.useState(null)

    React.useEffect(() => {
        async function checkNfc() {
            const supported = await NfcManager.isSupported()
            if(supported) {
                await NfcManager.start()
                setEnabled(await NfcManager.isEnabled())
            }
            setHasNfc(supported)
        }

        checkNfc()
    }, [])

    if(hasNfc === null) {
        return null
    }
    else if(!hasNfc) (
        <View style={styles.wrapper}>
            <Text>Your device doesn't support NFC</Text>
        </View>
    )
    else if(!enabled) {
        <View style={styles.wrapper}>
            <Text>Your NFC is not enabled</Text>

            <TouchableOpacity onPress={() => {
                NfcManager.goToNfcSetting()
            }}>
                <Text>GO TO SETTINGS</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={async () => {
                setEnabled(await NfcManager.isEnabled())
            }}>
                <Text>CHECK AGAIN</Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <ScanComp />
        // <Game />
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default App
