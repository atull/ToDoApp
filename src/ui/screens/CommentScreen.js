import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView, FlatList} from 'react-native';
import {PendingItem, TextInputBoard} from 'src/ui/elements';

const { Color, Asset, Font } = require('src/res');
const { Sizer } = require('src/core/utils');

export default class CommentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.params = this.props.navigation.state.params;
    this.state = {
      comments: this.params.item.comments,
    };
  }
  //* *********************************************
  //* *********************************************
  // Handlers ...
  onBack = () => {
    this.props.navigation.goBack();
  }

  onCommentAdded = (comment: string) => {
    this.setState({ comments: [comment, ...this.state.comments] }, () => {
      this.params.onCommentAdded(this.params.item, comment);
    });
  }

  //* *********************************************
  //* *********************************************
  // Render Methods ...
  renderListView() {
    return (
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={this.state.comments}
        ListEmptyComponent={<Text style={{ color: 'rgb(150, 150, 150)', alignSelf: 'center' }}>No comments yet</Text>}
        renderItem={({ item }) => {
          return (
            <Text style={styles.commentText}> •  {item}</Text>
          );
        }}
      />
    )
  }

  renderTextInputBoard() {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView style={styles.textInputBox} behavior="padding">
          <TextInputBoard onSend={this.onCommentAdded} />
        </KeyboardAvoidingView>

      );
    }

    return (
      <View style={styles.textInputBox}>
        <TextInputBoard onSend={this.params.onCommentAdded} />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <TouchableOpacity style={styles.backBtn} onPress={this.onBack}>
          <Image resizeMode="contain" style={styles.arrow} source={Asset.backArrow} />
        </TouchableOpacity>
        <Text style={styles.heading}>{this.params.item.label}</Text>
        {this.renderListView()}
        {this.renderTextInputBoard()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backBtn: {
    height: Sizer.boxSizer(18),
    width: Sizer.boxSizer(18),
    borderRadius: Sizer.boxSizer(9),
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Sizer.boxSizer(14),
    marginLeft: Sizer.boxSizer(7),
  },
  arrow: {
    tintColor: 'white',
    height: Sizer.boxSizer(8),
  },
  heading: {
    ...Font.subHeader,
    padding: 20,
  },
  textInputBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  commentText: {
    ...Font.helper,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
  }
});
