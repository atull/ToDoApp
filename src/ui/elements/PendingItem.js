import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';

const { Color, Font, Asset } = require('src/res');

export const PendingItem = ({ item, onTaskDone, onShowDetail }) => (
  <View style={styles.bg}>
    <TouchableWithoutFeedback onPress={onTaskDone}>
      <View style={styles.uncheckIconBox}>
        <View style={styles.uncheckIcon} />
      </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={onShowDetail}>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
        <Text numberOfLines={1} style={[Font.body, { width: '85%' }]}>{item.label}</Text>
        <Image style={{ tintColor: 'rgba(0, 0, 0, 0.5)', marginLeft: 10 }} source={Asset.arrow} />
      </View>
    </TouchableWithoutFeedback>
  </View>
);

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white',
    marginTop: 0.3,
    marginBottom: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uncheckIconBox: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckIcon: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 9,
    width: 18,
    height: 18,
  }
});
