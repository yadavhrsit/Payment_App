import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { getDoc, collection, doc, updateDoc } from 'firebase/firestore';

const Dashboard = ({ route, navigation }) => {
    const [user, setUser] = useState('');
    const [amount, setAmount] = useState(0);
    const [addAmount, setAddAmount] = useState('');
    const [amountAdded, setAmountAdded] = useState(false);
    const [userType, setuserType] = useState('');

    id = route.params.docId;

    const docRef = doc(db, "users_wallet", id);

    async function fetchData() {
        const docSnap = await getDoc(docRef);
        setAmount(docSnap.data().amount);
    }

    useEffect(() => {
        async function fetchData() {
            const docSnap = await getDoc(docRef);
            setuserType(docSnap.data().usertype);
            setAmount(docSnap.data().amount);
            setUser(doc.Snap.data().name)
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (amountAdded) {
            fetchData();
        }
    }, [amountAdded]);

    const getCircleColor = () => {
        const percent = amount / 1000;
        const red = Math.round(255 * (1 - percent));
        const green = Math.round(255 * percent);
        return `rgb(${red}, ${green}, 0)`;
    };

    const handleAddMoney = async () => {
        const newAmount = parseFloat(amount) + parseFloat(addAmount);
        const data = {
            amount: newAmount
        };
        try {
            updateDoc(docRef, data).then(() => {
                setAmountAdded(true);
            }).then(() => {
                setAmountAdded(false);
            })

        } catch (error) {
            console.log(error)
        }
        setAddAmount('');

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello, {user}</Text>
            <Text style={styles.title}>Wallet</Text>
            <View style={styles.circleContainer}>
                <View style={[styles.circle, { borderColor: getCircleColor() }]}>
                    <Text style={styles.amountText}>{amount}</Text>
                </View>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter amount to add"
                placeholderTextColor={'white'}
                value={addAmount}
                onChangeText={setAddAmount}
                keyboardType="numeric"
            />
            {
                userType === "Merchant" ? (
                    <>
                        <Pressable
                            style={styles.button}
                            onPress={handleAddMoney}
                        >
                            <Text style={styles.buttonText}>Add Money</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                            onPress={() => navigation.navigate('Payment', { user: "email" })}
                        >
                            <Text style={styles.buttonText}>Accept Payment</Text>
                        </Pressable>
                    </>

                ) :
                    (
                        <Pressable
                            style={styles.button}
                            onPress={handleAddMoney}
                        >
                            <Text style={styles.buttonText}>Add Money</Text>
                        </Pressable>
                    )

            }


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#262450',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 80,
        gap: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    circleContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 10,
        borderColor: '#262450',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    circle: {
        width: 175,
        height: 175,
        borderRadius: 100,
        borderWidth: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    button: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Dashboard;
