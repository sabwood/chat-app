import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, Image, Text } from "react-native";
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

const Chat = ({ db, route, navigation, isConnected, storage }) => {
    const [messages, setMessages] = useState([]);

    const { name, backgroundColor, userID } = route.params;

    let unsubMessages;

    useEffect(() => {
        navigation.setOptions({ title: name });

        if (isConnected === true) {
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach((doc) => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()),
                    })
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    const onSend = (newMessages) => {
        if (newMessages) {
            addDoc(collection(db, "messages"), newMessages).catch((error) =>
            {
                console.error("failed to send message:", error);
            });
        } else {
            console.error("newMessages is undefined", newMessages);
        }
    };

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    const renderBubble = (props) => {
        const { currentMessage } = props;
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#000",
                    },
                    left: {
                        backgroundColor: "#FFF",
                    },
                }}
                textStyle={{
                    right: {
                        color: "#000000",
                    },
                    left: {
                        color: "#000000",
                    },
                }}
            >
                <View style={[styles.container]}>
                    {currentMessage.image ? (
                        <View style={{ padding: 10 }}>
                            <Image
                                source={{ uri: currentMessage.image }}
                                style={[styles.image]}
                            />
                        </View>
                    ) : (
                        <Text>no image available</Text>
                    )}
                </View>
            </Bubble>
        );
    };

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    const renderCustomActions = (props) => {
        return (
            <CustomActions
                userID={userID}
                storage={storage}
                onSend={onSend}
                name={name}
                {...props}
            />
        );
    };

    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (
            currentMessage.location &&
            currentMessage.location.latitude &&
            currentMessage.location.longitude
        ) {
            return (
                <MapView
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{ width: 150, height: 100 }}
                />
            );
        }
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                renderInputToolbar={renderInputToolbar}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{
                    _id: userID,
                    name: name
                }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;