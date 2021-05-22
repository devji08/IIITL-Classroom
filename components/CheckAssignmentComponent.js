import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

class CheckAssignmentComponent extends Component {

    state = {
        data : this.props.route.params.data,
    };

    render() {
        console.log(this.state.data);
        this.props.navigation.setOptions({title : `Add ${this.state.data.type}`})
        return(
            <View>

            </View>
        );
    }
}

export default CheckAssignmentComponent;