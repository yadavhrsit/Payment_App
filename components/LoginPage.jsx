import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ToastAndroid } from 'react-native';

const LoginPage = ({ navigation, route }) => {
    userType = route.params.caller;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                const docRef = collection(db, "users_wallet");
                const docsSnap = await getDocs(docRef);
                docsSnap.forEach(doc => {
                    if (doc.data().user == email) {
                        if (doc.data().usertype == userType) {
                            navigation.navigate('Dashboard', { user: email, usertype: userType, docId: doc.id })
                        }
                        else {
                            ToastAndroid.show('You are not ', userType, 'Please Login as ', doc.data().usertype, ToastAndroid.SHORT);
                        }
                    }
                })
            })
            .catch((err) => {
                window.alert(err.message);
            })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="whitesmoke"
                onChangeText={setEmail}
                keyboardType="email-address"
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="whitesmoke"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <Pressable
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#262450',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        width: '100%',
        height: 40,
        color: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600'
    }
});

export default LoginPage;
