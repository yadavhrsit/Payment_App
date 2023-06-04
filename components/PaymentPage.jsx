import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native';
import React, { useState } from 'react';

const PaymentPage = ({ navigation, route }) => {

    user = route.params.user;
    usertype = route.params.usertype;

    const [amount, setAmount] = useState('');
    const [showProceed, setShowProceed] = useState(true);
    const [fPrintVerfied, setfPrintVerified] = useState(false);
    const [passVerified, setPassVerified] = useState(false);

    const handleProceed = () => {
        setShowProceed(false);
    };

    const handleFingerprintVerification = () => {
        setfPrintVerified(true)
    }

    const [otp, setOTP] = useState('');

    const handleOTPChange = (text) => {
        setOTP(text);
    }

    const handlePassSubmit = () => {
        setPassVerified(true)
    }

    if (passVerified) {
        navigation.navigate('Dashboard', { user: user, usertype: userType })
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.paymentText, styles.text]}>Payment</Text>
            <TextInput
                style={[styles.amountInput, styles.text]}
                placeholder="₹ 00"
                placeholderTextColor={'lightgrey'}
                value={amount}
                onChangeText={setAmount}
                editable={showProceed}
            />
            <View style={styles.miniContainer}>
                {showProceed ? (
                    <>
                        <Pressable style={styles.proceedBtn} onPress={handleProceed}>
                            <Text style={styles.proceed}>Proceed</Text>
                        </Pressable>
                    </>
                ) : (
                    fPrintVerfied ? (
                        <>
                            <Text style={[styles.otpText, styles.text]}>Enter 6-digit Password</Text>
                            <View style={styles.otpContainer}>
                                <TextInput
                                    style={[styles.otpInput, styles.text]}
                                    placeholder="0"
                                    placeholderTextColor={'lightgrey'}

                                    maxLength={6}
                                    value={otp}
                                    onChangeText={handleOTPChange}
                                />
                                <Pressable style={styles.otpBtn} onPress={handlePassSubmit}>
                                    <Text style={styles.otpSubmit}>Submit</Text>
                                </Pressable>
                            </View>

                        </>
                    ) : (
                        <>
                            <Text style={[styles.confirmText, styles.text]}>Confirm using your fingerprint</Text>
                            <Pressable onPress={handleFingerprintVerification}>
                                <Image style={styles.fingerprint} source={require('../assets/fingerPrintIcon.png')} />
                            </Pressable>
                        </>
                    )
                )}

            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262450',
        paddingTop: 60,
    },
    text: {
        color: 'white',
    },
    headerText: {
        fontSize: 24,
        marginTop: 20,
        marginLeft: 20,
    },
    paymentText: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: '20%',
    },
    amountInput: {
        height: 40,
        fontSize: 36,
        textAlign: 'center',
        marginTop: 16,
    },
    confirmText: {
        marginTop: '20%',
        fontSize: 24,
    },
    fingerprint: {
        marginTop: '20%',
    },
    proceedBtn: {
        width: '80%',
        padding: 10,
        backgroundColor: '#1E4E74',
        borderRadius: 25,
        marginTop: '50%',
    },
    proceed: {
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
    },
    resetBtn: {
        marginTop: '20%',
    },
    resetText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
    miniContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#262465',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: '10%',
        borderTopEndRadius: 45,
        borderTopStartRadius: 45,
    },
    otpText: {
        fontSize: 24,
        marginTop: '20%',
    },
    otpContainer: {
        marginTop: 16,
        width: '100%'
    },
    otpInput: {
        height: 40,
        fontSize: 24,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    otpBtn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20,
    }
});

export default PaymentPage;