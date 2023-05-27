/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styled';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Voice from '@react-native-community/voice';
import moment from 'moment';
import {format} from 'date-fns';
import {ITask} from '../../models';

interface IModalProps {
  isVisible: boolean;
  onAddTask: (task: ITask) => void;
  taskObj: ITask;
  onBackClose: () => void;
  selectedDate: string | undefined;
}

export const AddTaskModal: FC<IModalProps> = ({
  isVisible,
  taskObj,
  onAddTask,
  onBackClose,
}) => {
  const [taskObject, setTaskObject] = useState<ITask>(taskObj);
  const [errorStartTime, setErrorStartTime] = useState<string>();
  const [errorEndTime, setErrorEndTime] = useState<string>();
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorTask, setErrorTask] = useState<string>();

  const handleAddTask = () => {
    if (taskObject.startTime === 'Select Start Time') {
      setErrorStartTime('Please select time');
    }
    if (taskObject.endTime === 'Select End Time') {
      setErrorEndTime('Please select time');
    }
    if (!taskObject.title.trim()) {
      setErrorTitle('Title is required');
    }
    if (!taskObject.task.trim()) {
      setErrorTask('Task is required');
    }
    if (
      taskObject.startTime !== '' &&
      taskObject.endTime !== '' &&
      taskObject.title !== '' &&
      taskObject.task !== ''
    ) {
      onAddTask(taskObject);
    }
  };
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };
  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };
  const handleConfirmStartTime = (time: any) => {
    const dt = new Date(time);
    console.log('dt: ', dt);
    if (dt.getMinutes() % 15 !== 0) {
      const roundedMinutes = Math.ceil(dt.getMinutes() / 15) * 15;
      dt.setMinutes(roundedMinutes);
    }
    var formattedDate = format(dt, 'H:mm');
    setTaskObject({...taskObject, startTime: formattedDate});
    hideStartTimePicker();
  };
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };
  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };
  const handleConfirmEndTime = (time: any) => {
    const dt = new Date(time);
    const startTime = taskObject.startTime;
    if (dt.getMinutes() % 15 !== 0) {
      const roundedMinutes = Math.ceil(dt.getMinutes() / 15) * 15;
      dt.setMinutes(roundedMinutes);
    }
    if (startTime === format(dt, 'H:mm')) {
      dt.setMinutes(dt.getMinutes() + 15);
    }
    var formattedDate = format(dt, 'H:mm');
    setTaskObject({...taskObject, endTime: formattedDate});
    hideEndTimePicker();
  };
  //speech recognizition
  const [result, setResult] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (result.length > 0) {
      setTaskObject({...taskObject, task: result});
    }
  }, [result]);

  const speechStartHandler = (e: any) => {
    setIsRecording(true);
    console.log('start handler==>>>', e);
  };
  const speechEndHandler = (e: any) => {
    setIsRecording(false);
    console.log('stop handler', e);
  };

  const speechResultsHandler = (e: any) => {
    let text = e.value[0];
    setResult(text);
    console.log('speech result handler', e);
  };

  const startRecording = async () => {
    setIsRecording(true);
    try {
      await Voice.start('tr-TR');
    } catch (error) {
      console.log('error raised', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error raised', error);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={() => onBackClose()}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            {taskObject.taskID === 0 ? 'Create Task' : 'Update Task'} |{' '}
            {moment(taskObject?.selectedDate).format('MMM DD')}
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View>
            <TouchableOpacity
              style={styles.timeBtn}
              onPress={showStartTimePicker}>
              <Text style={styles.btnText}>{taskObject.startTime}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              locale="en"
              onConfirm={handleConfirmStartTime}
              onCancel={hideStartTimePicker}
              date={new Date()}
              minimumDate={new Date()}
              minuteInterval={15}
            />
            {errorStartTime && (
              <Text style={styles.errorTime}>{errorStartTime}</Text>
            )}
            <TouchableOpacity
              style={styles.timeBtn}
              onPress={showEndTimePicker}>
              <Text style={styles.btnText}>{taskObject.endTime}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              locale="en"
              onConfirm={handleConfirmEndTime}
              onCancel={hideEndTimePicker}
              date={new Date()}
              minimumDate={
                new Date(new Date().setMinutes(new Date().getMinutes() + 15))
              }
              minuteInterval={15}
            />
            {errorEndTime && (
              <Text style={styles.errorTime}>{errorEndTime}</Text>
            )}
          </View>
          <TextInput
            value={taskObject.title}
            style={styles.inputTitle}
            placeholder="Title..."
            placeholderTextColor="#777"
            onChangeText={val => {
              setErrorTitle('');
              setTaskObject({...taskObject, title: val});
            }}
          />
          {errorTitle && <Text style={styles.errorText}>{errorTitle}</Text>}
          <View style={styles.textInputStyle}>
            <TextInput
              value={taskObject.task}
              style={styles.inputTask}
              placeholder="Task..."
              placeholderTextColor="#777"
              onChangeText={val => {
                console.log('123');
                setErrorTitle('');
                setTaskObject({...taskObject, task: val});
              }}
              multiline={true}
              textAlignVertical={'top'}
            />
            <View style={isRecording ? styles.micButtonView : null}>
              <TouchableOpacity
                onPress={isRecording ? stopRecording : startRecording}>
                <Image
                  source={require('../../assets/mic.png')}
                  style={styles.micImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          {errorTask && <Text style={styles.errorText}>{errorTask}</Text>}
          <TouchableOpacity style={{marginBottom: 30}} onPress={handleAddTask}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonPlaceHolder}>
                {taskObject.taskID === 0 ? 'Add Task' : 'Update Task'}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};
