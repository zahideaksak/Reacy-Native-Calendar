/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styled';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Voice from '@react-native-voice/voice';
import moment from 'moment';
import {format, getHours, setHours, setMinutes} from 'date-fns';
import {utils} from '../../utils';

interface ITaskObject {
  selectedDate: string;
  taskID: number;
  startTime: any;
  endTime: any;
  title: string;
  task: string;
}
interface IModalProps {
  isVisible: boolean;
  onAddTask: (task: object) => void;
  taskObj: ITaskObject;
  onBackClose: () => void;
}

export const AddTaskModal: FC<IModalProps> = ({
  isVisible,
  taskObj,
  onAddTask,
  onBackClose,
}) => {
  const [taskObject, setTaskObject] = useState<ITaskObject>(taskObj);
  //console.log('taskObj', moment(taskObject?.selectedDate).format('MMM DD'));
  const [errorStartTime, setErrorStartTime] = useState<string>();
  const [errorEndTime, setErrorEndTime] = useState<string>();
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorTask, setErrorTask] = useState<string>();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

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

  //console.log('taskObj: ', taskObject);

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };
  const handleConfirmStartTime = (time: any) => {
    const dt = new Date(time);
    //const minTime = dt.setHours(dt.getHours() + 1);
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
    console.log('time: ', time);
    const dt = new Date(time);
    const startTime = taskObject.startTime;
    if (startTime === format(dt, 'H:mm')) {
      dt.setMinutes(dt.getMinutes() + 15);
    }
    var formattedDate = format(dt, 'H:mm');
    setTaskObject({...taskObject, endTime: formattedDate});
    hideEndTimePicker();
  };
  //speech recognizition gelecek
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e: any) => {
    console.log('start handler==>>>', e);
  };
  const onSpeechEndHandler = (e: any) => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const onSpeechResultsHandler = (e: any) => {
    let text = e.value[0];
    setResult(text);
    console.log('speech result handler', e);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('error raised', error);
    }
  };
  // const stopRecording = async () => {
  //   try {
  //     await Voice.stop();
  //   } catch (error) {
  //     console.log('error raised', error);
  //   }
  // };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={() => onBackClose()}>
      <View style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>
            {taskObject.taskID === 0 ? 'Create Task' : 'Update Task'} |{' '}
            {moment(taskObject?.selectedDate).format('MMM DD')}
          </Text>
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
                setErrorTitle('');
                setTaskObject({...taskObject, task: val});
              }}
            />
            {isLoading ? (
              <ActivityIndicator size="large" color="red" />
            ) : (
              <TouchableOpacity onPress={startRecording}>
                <Image
                  source={{
                    uri: 'https://static.vecteezy.com/system/resources/previews/015/658/445/original/podcast-microphone-icon-png.png',
                  }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
            )}
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
