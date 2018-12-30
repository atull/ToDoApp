import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const { Sizer } = require('src/core/utils');
const { Color, Font } = require('src/res');

export const Header = ({ title }) => (
  <View style={styles.header}>
    <View style={{ height: Sizer.boxSizer(20) }} />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.primary,
  },
  title: {
    ...Font.header,
    color: 'white',
    alignSelf: 'center',
    marginBottom: Sizer.boxSizer(2),
  },
});
