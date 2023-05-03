import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styled';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Voice from '@react-native-voice/voice';
import moment from 'moment';

interface IModalProps {
  isVisible: boolean;
  selectedDate: any;
  onClose: (task: object) => void;
}
interface ITaskObject {
  selectedDate: string;
  startTime: any;
  endTime: any;
  title: string;
  task: string;
}

export const AddTaskModal: FC<IModalProps> = ({
  isVisible,
  selectedDate,
  onClose,
}) => {
  //console.log('selam', selectedEvent);
  // const [nameInputValue, setNameInputValue] = useState<string>();
  // const [taskInputValue, setTaskInputValue] = useState<string>();
  const [taskObject, setTaskObject] = useState<ITaskObject>({
    selectedDate: '',
    startTime: 'Select Start Time',
    endTime: 'Select End Time',
    title: '',
    task: '',
  });
  const [errorStartTime, setErrorStartTime] = useState<string>();
  const [errorEndTime, setErrorEndTime] = useState<string>();
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorTask, setErrorTask] = useState<string>();

  // function handleAddTask() {
  //   if (taskInputValue) {
  //     onAddTask(taskInputValue);
  //   }
  //   setTaskInputValue('');
  // }
  const handleAddTask = () => {
    // console.log('taskObject: ', taskObject);
    // if (
    //   taskObject.startTime === 'Select Time' ||
    //   taskObject.endTime === 'Select Time'
    // ) {
    //   Alert.alert('Please select time');
    // }
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
      onClose(taskObject);
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
    //console.warn('A date has been picked: ', time);
    const dt = new Date(time);
    const x = dt.toLocaleTimeString();
    setTaskObject({...taskObject, startTime: x});
    hideStartTimePicker();
  };
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmEndTime = (time: any) => {
    //console.warn('A date has been picked: ', time);
    const dt = new Date(time);
    const x = dt.toLocaleTimeString();
    setTaskObject({...taskObject, endTime: x});
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

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error raised', error);
    }
  };
  console.log(moment(selectedDate).format('MMM DD'));
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={() => onClose}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          Create Task | {moment(selectedDate).format('MMM DD')}
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
          />
          {errorStartTime && (
            <Text style={styles.errorTime}>{errorStartTime}</Text>
          )}
          <TouchableOpacity style={styles.timeBtn} onPress={showEndTimePicker}>
            <Text style={styles.btnText}>{taskObject.endTime}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            locale="en"
            onConfirm={handleConfirmEndTime}
            onCancel={hideEndTimePicker}
          />
          {errorEndTime && <Text style={styles.errorTime}>{errorEndTime}</Text>}
        </View>
        <TextInput
          style={styles.inputTitle}
          placeholder="Title..."
          placeholderTextColor="#777"
          onChangeText={val => {
            setErrorTitle('');
            setTaskObject({...taskObject, title: val});
          }}
          //value={nameInputValue}
        />
        {errorTitle && <Text style={styles.errorText}>{errorTitle}</Text>}
        <View style={styles.textInputStyle}>
          <TextInput
            style={styles.inputTask}
            placeholder="Task..."
            placeholderTextColor="#777"
            onChangeText={val => {
              setErrorTitle('');
              setTaskObject({...taskObject, task: val});
            }}
            //value={taskInputValue}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={{
                  uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          )}
        </View>

        {errorTask && <Text style={styles.errorText}>{errorTask}</Text>}
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={handleAddTask}>
            <Text style={styles.buttonPlaceHolder}>Add task</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
};
