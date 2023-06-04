import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const FingerprintScreen = () => {
    useEffect(() => {
        checkBiometricAvailability();
    }, []);

    const checkBiometricAvailability = async () => {
        const { available, biometryType } = await LocalAuthentication.hasHardwareAsync();
        if (available) {
            if (biometryType === LocalAuthentication.BiometryType.Fingerprint) {
                // Fingerprint authentication is available
                authenticateWithBiometrics(LocalAuthentication.BiometryType.Fingerprint);
            } else if (biometryType === LocalAuthentication.BiometryType.FaceID) {
                // Face ID authentication is available
                authenticateWithBiometrics(LocalAuthentication.BiometryType.FaceID);
            } else {
                // Biometric authentication is available, but not supported on this device
                console.log('Biometric authentication available, but not supported on this device');
                // Implement your alternative authentication method here
            }
        } else {
            // Biometric authentication is not available
            console.log('Biometric authentication not available');
            // Implement your alternative authentication method here
        }
    };

    const authenticateWithBiometrics = async (biometryType) => {
        const { success } = await LocalAuthentication.authenticateAsync({
            promptMessage: `Authenticate with ${biometryType}`,
        });
        if (success) {
            // Authentication successful
            console.log('Authentication successful');

            // Save the biometric data to the database
            saveBiometricData();
        } else {
            // Authentication failed
            console.log('Authentication failed');
        }
    };

    const saveBiometricData = () => {
        // Implement your logic to save the biometric data to the database here
        console.log('Saving biometric data');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Place your finger or face on the sensor</Text>
            <TouchableOpacity onPress={checkBiometricAvailability}>
                <Text style={{ fontSize: 16, color: 'blue' }}>Authenticate with Biometrics</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FingerprintScreen;
