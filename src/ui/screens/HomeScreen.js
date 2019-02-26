import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView, StyleSheet, FlatList, LayoutAnimation } from 'react-native';
import { Header, TextInputBoard, PendingItem } from 'src/ui/elements';
import { connect } from 'react-redux';
import { addNewTask, completeTask } from 'src/core/redux/actions';

// const store = require('react-native-simple-store');

const { Font } = require('src/res');
const { Constants, CustomJSTypes } = require('src/core/utils');

class HomeScreen extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     pendingTasks: [],
  //     completedTasks: [],
  //   };
  // }

  // componentDidMount(): void {
    // store.get([Constants.listStore, Constants.completedListStore])
    //   .then((val) => {
    //     const pendingTasks = (val[0]) ? val[0].reverse() : [];
    //     const completedTasks = (val[1]) ? val[1].reverse() : [];
    //       if (val) this.setState({ pendingTasks, completedTasks });
    //   })
    //   .catch(error => console.log('-> error :', error));

    // store.delete([Constants.listStore, Constants.completedListStore]);
  // }

  //* *********************************************
  //* *********************************************
  // Handlers ...
  onAddTask = (task: string) => {
    const taskObj = {
      label: task,
      isCompleted: false,
      comments: [],
    };
    this.props.addNewTask(taskObj);
    // store.push(Constants.listStore, taskObj);
    // this.setState({ pendingTasks: [taskObj, ...this.state.pendingTasks] });
  }

  onTaskDone = (taskObj: CustomJSTypes.TaskObjType) => {
    // const index = this.state.pendingTasks.indexOf(taskObj);
    // const updatedTaskList = [...this.state.pendingTasks];
    // updatedTaskList.splice(index, 1);
    // taskObj.isCompleted = true;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.completeTask(taskObj);
    // this.setState({ pendingTasks: updatedTaskList, completedTasks: [taskObj, ...this.state.completedTasks] }, () => {
    //   store.save(Constants.listStore, this.state.pendingTasks);
    //   store.save(Constants.completedListStore, this.state.completedTasks);
    // });
  }

  onShowDetail = (taskObj: CustomJSTypes.TaskObjType) => {
    // const params = {
    //   taskObj,
    //   // onCommentAdded: this.onCommentAdded,
    // };
    this.props.navigation.navigate(Constants.screenRoutes.commentScreen, { taskObj });
  }

  // onCommentAdded = (taskObj: CustomJSTypes.TaskObjType, comment: string) => {
  //   const index = this.state.pendingTasks.indexOf(taskObj);
  //   taskObj.comments.push(comment);
  //   const updatedTaskList = [...this.state.pendingTasks];
  //   updatedTaskList.splice(index, 1, taskObj);
  //   this.setState({ pendingTasks: updatedTaskList }, () => {
  //     store.save(Constants.listStore, this.state.pendingTasks);
  //   });
  // }


  //* *********************************************
  //* *********************************************
  // Render Methods ...
  renderListView() {
    return (
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={[...this.props.pendingTaskList, ...this.props.completedTaskList]}
        // data={this.props.taskList}
        ListEmptyComponent={<Text style={{ color: 'rgb(150, 150, 150)', alignSelf: 'center', marginTop: 100 }}>No task added</Text>}
        renderItem={({ item }) => {
          if (item.isCompleted) {
            return (
              <View style={styles.completedTaskView}>
                <Text style={styles.completedTaskText}>{item.label}</Text>
              </View>
            );
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

const mapStateToProps = ({ task }) => {
  const pendingTaskList = task.taskList.filter(taskObj => !taskObj.isCompleted);
  const completedTaskList = task.taskList.filter(taskObj => taskObj.isCompleted);
  return { pendingTaskList, completedTaskList };
};

export default connect(mapStateToProps, { addNewTask, completeTask })(HomeScreen);
