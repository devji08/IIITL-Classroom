import React, { Component } from 'react'
import {View, StyleSheet, Text, Linking} from 'react-native'
import {Icon} from 'react-native-elements'

class QuizComponent extends Component {

    state = {
        quiz : this.props.route.params.quiz,
    };

    render() {
        console.log(this.state.quiz);
        return (
            <View>

            </View>
        )
    }
}

export default QuizComponent;