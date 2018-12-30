import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const { Sizer } = require('src/core/utils');
const { Font, Asset, Color } = require('src/res');

class TextInputBoard extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      textValue: '',
    };
  }

  onSend = () => {
    this.props.onSend(this.state.textValue);
    this.setState({ textValue: '' });
  }

  render() {
    return (
      <View style={styles.box}>
        <TextInput
          style={styles.textInput}
          placeholder='Add here...'
          autoCorrect={false}
          value={this.state.textValue}
          onChangeText={(text) => this.setState({ textValue: text })}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={this.onSend}>
          <Image style={{ tintColor: 'white' }} source={Asset.send} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgb(245, 245, 245)',
  },
  textInput: {
    ...Font.body,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: 'rgb(200, 200, 200)',
    borderWidth: 0.5,
    borderRadius: Sizer.boxSizer(9),
    height: Sizer.boxSizer(18),
    flex: 1,
    backgroundColor: 'white',
  },
  sendBtn: {
    borderRadius: Sizer.boxSizer(8),
    height: Sizer.boxSizer(16),
    width: Sizer.boxSizer(16),
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

module.exports = {
  TextInputBoard,
};

