import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';


const HomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Choose an option:</Text>
            <View style={styles.buttonContainer}>
                <Text style={styles.subtitle}>Register</Text>
                <Button
                    title="Register as Merchant"
                    onPress={() => navigation.navigate('Register', { caller: "Merchant" })}
                />
                <Button
                    title="Register as Customer"
                    onPress={() => navigation.navigate('Register', { caller: "Customer" })}
                />
                <Text style={styles.subtitle}>Login</Text>
                <Button
                    title="Login as Merchant"
                    onPress={() => navigation.navigate('Login', { caller: "Merchant" })}
                />
                <Button
                    title="Login as User"
                    onPress={() => navigation.navigate('Login', { caller: "Customer" })}
                />
                <Button
                    title="Finger"
                    onPress={() => navigation.navigate('finger')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#262450',
        flex: 1,
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
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        gap: 30,
    },
});

export default HomePage;
