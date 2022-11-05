import * as React from "react";
import {useState} from "react";
import {FlatList} from "react-native"; // TODO - Review benefits of ScrollView vs FlatList
import {Avatar, ListItem} from "react-native-elements";
import {CAMPSITES} from "../shared/campsites";

const DirectoryScreen = ({navigation}) => {
    const [campsites, setCampsites] = useState(CAMPSITES);
    const renderDirectoryItem = ({item: campsite}) => {
        return (
            <ListItem
                key={campsite.id}
                onPress={() => navigation.navigate('CampsiteInfo', {campsite})}
            >
                <Avatar source={campsite.image} rounded/>
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };
    // TODO - Debug warning regarding missing keys
    return (
        <FlatList
            data={campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => {
                item.id.toString();
            }}/>
    );
};

export default DirectoryScreen;