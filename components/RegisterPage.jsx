import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, documentId } from "firebase/firestore";
import { db } from './firebaseConfig';

const RegisterPage = ({ route, navigation }) => {
    userType = route.params.caller;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');

    const handleRegistration = () => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                try {
                    const docRef = await addDoc(collection(db, "users_wallet"), {
                        user: email,
                        name: name,
                        pin: pin,
                        amount: 0,
                        usertype: userType,
                    });
                    navigation.navigate('Dashboard', { docId: docRef.id })
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Registration</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="whitesmoke"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="whitesmoke"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="whitesmoke"
                secureTextEntry
            />
            {
                userType === "Customer" ? (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Transaction Pin"
                            value={pin}
                            onChangeText={setPin}
                            placeholderTextColor="whitesmoke"
                            secureTextEntry
                        />
                        <Pressable
                            style={styles.button}
                            onPress={handleRegistration}
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </Pressable>
                    </>
                ) : (
                    <Pressable
                        style={styles.button}
                        onPress={handleRegistration}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262450',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        width: '100%',
        color: 'white',
        height: 40,
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

export default RegisterPage;