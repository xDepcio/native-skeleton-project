import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

function ScanComp() {
    const [data, setData] = useState('brak')

    return (
        <View style={styles.wrapper}>
            <Text>NFC Game</Text>
            <TouchableOpacity style={styles.btn} onPress={async () => {
                const response = await fetch('https://api.namefake.com/')
                const result = await response.json()
                setData(result.name)
            }}>
                <Text>START</Text>
            </TouchableOpacity>
            <Text>{data}</Text>
        </View>
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
        paddingHorizontal: 20,
    }
})

export default ScanComp
