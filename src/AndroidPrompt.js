import React from "react";
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import NfcManager from "react-native-nfc-manager";

// Docelowo ten komponent tylko na Androidzie bo ios ma wbudowane UI do skanowania NFC
function AndroidPrompt(props, ref) {
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {
        if(ref) {
            ref.current = {
                setVisible,
            }
        }
    }, [ref])

    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.content}>
                <View style={[styles.backdrop, StyleSheet.absoluteFill]} />

                <View style={styles.prompt}>
                    <Text style={styles.hint}>Scanning...</Text>

                    <TouchableOpacity style={styles.btn} onPress={() => {
                        setVisible(false),
                        NfcManager.unregisterTagEvent().catch(() => 0)
                    }}>
                        <Text style={styles.btnCancel}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    prompt: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 55,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hint: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black'
    },
    btn: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15
    },
    btnCancel: {
        color: 'black'
    }
})

export default React.forwardRef(AndroidPrompt)
