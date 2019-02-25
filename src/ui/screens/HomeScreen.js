import React from 'react';
import { View, Image, Text, Platform, KeyboardAvoidingView, StyleSheet, FlatList, LayoutAnimation } from 'react-native';
import { Header, TextInputBoard, PendingItem } from 'src/ui/elements';
import { connect } from 'react-redux';
import { addTask } from 'src/core/redux/actions';

const store = require('react-native-simple-store');

const { Font, Asset } = require('src/res');
const { Constants } = require('src/core/utils');

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingTasks: [],
      completedTasks: [],
    };
  }

  componentDidMount(): void {
    store.get([Constants.listStore, Constants.completedListStore])
      .then((val) => {
        const pendingTasks = (val[0]) ? val[0].reverse() : [];
        const completedTasks = (val[1]) ? val[1].reverse() : [];
          if (val) this.setState({ pendingTasks, completedTasks });
      })
      .catch(error => console.log('-> error :', error));
    // store.delete([Constants.listStore, Constants.completedListStore]);
  }

  //* *********************************************
  //* *********************************************
  // Handlers ...
  onAddTask = (task: string) => {
    const taskObj = {
      label: task,
      isCompleted: false,
      comments: [],
    };
    store.push(Constants.listStore, taskObj);
    this.props.addTask(taskObj);
    this.setState({ pendingTasks: [taskObj, ...this.state.pendingTasks] });
  }

  onTaskDone = (item: any) => {
    const index = this.state.pendingTasks.indexOf(item);
    const updatedTaskList = [...this.state.pendingTasks];
    updatedTaskList.splice(index, 1);
    item.isCompleted = true;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ pendingTasks: updatedTaskList, completedTasks: [item, ...this.state.completedTasks] }, () => {
      store.save(Constants.listStore, this.state.pendingTasks);
      store.save(Constants.completedListStore, this.state.completedTasks);
    });
  }

  onShowDetail = (item: any) => {
    const params = {
      item,
      onCommentAdded: this.onCommentAdded,
    };
    this.props.navigation.navigate(Constants.screenRoutes.commentScreen, params);
  }

  onCommentAdded = (item: any, comment: string) => {
    const index = this.state.pendingTasks.indexOf(item);
    item.comments.push(comment);
    const updatedTaskList = [...this.state.pendingTasks];
    updatedTaskList.splice(index, 1, item);
    this.setState({ pendingTasks: updatedTaskList }, () => {
      store.save(Constants.listStore, this.state.pendingTasks);
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
        // data={[...this.state.pendingTasks, ...this.state.completedTasks]}
        data={this.props.taskList}
        ListEmptyComponent={<Text style={{ color: 'rgb(150, 150, 150)', alignSelf: 'center', marginTop: 100 }}>No task added</Text>}
        renderItem={({ item }) => {
          if (item.isCompleted) {
            return (
              <View style={styles.completedTaskView}>
                <Text style={styles.completedTaskText}>{item.label}</Text>
              </View>
            )
          }
          return (
            <PendingItem
              item={item}
              onTaskDone={() => this.onTaskDone(item)}
              onShowDetail={() => this.onShowDetail(item)} />
          );
        }}
      />
    );
  }

  renderTextInputBoard() {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView style={styles.textInputBox} behavior="padding">
          <TextInputBoard onSend={this.onAddTask} />
        </KeyboardAvoidingView>

      );
    }

    return (
      <View style={styles.textInputBox}>
        <TextInputBoard onSend={this.onAddTask} />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title='To Do List' />
        {this.renderListView()}
        {this.renderTextInputBoard()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  completedTaskView: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 0.3,
    marginBottom: 0.3,
  },
  completedTaskText: {
    ...Font.body,
    color: 'grey',
    marginLeft: 20,
    marginRight: 20,
    textDecorationLine: 'line-through',
  }
});

const mapStateToProps = ({ task }) => ({
  taskList: task.taskList,
});

export default connect(mapStateToProps, { addTask })(HomeScreen);
