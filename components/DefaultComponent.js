import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';

export default class DefaultComponent extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const navigate = this.props.navigate;
        return (
            <View style={styles.container}>
                    <Button 
                        title = "Login"
                        onPress = {() => navigate('Authentication')}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        justifyContent : 'center'
    }
});
