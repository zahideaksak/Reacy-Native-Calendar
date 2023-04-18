import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styled';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface IModalProps {
  isVisible: boolean;
  selectedDate: string;
  //selectedEvent: object;
  onClose: (task: object) => void;
  onAddTask: (taskContent: string) => void;
}

export const AddTaskModal: FC<IModalProps> = ({
  isVisible,
  selectedDate,
  onClose,
}) => {
  //console.log('selam', selectedEvent);
  const [nameInputValue, setNameInputValue] = useState<string>();
  const [taskInputValue, setTaskInputValue] = useState<string>();
  const [taskObject, setTaskObject] = useState<object>({
    selectedDate: '',
    startTime: 'Select Time',
    endTime: 'Select Time',
    title: '',
    task: '',
  });

  const [errorTitle, setErrorTitle] = useState<string>();

  // function handleAddTask() {
  //   if (taskInputValue) {
  //     onAddTask(taskInputValue);
  //   }
  //   setTaskInputValue('');
  // }
  const handleAddTask = () => {
    // if (taskInputValue) {
    //   onAddTask(taskInputValue);
    //   console.log('burası: ', taskInputValue);
    // }
    // setTaskInputValue('');

    // console.log('taskObject: ', taskObject);
    // if (
    //   taskObject.startTime === 'Select Time' ||
    //   taskObject.endTime === 'Select Time'
    // ) {
    //   Alert.alert('Please select time');
    // }
    if (taskObject.title === '') {
      setErrorTitle('Title is required');
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
    console.warn('A date has been picked: ', time);
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
    console.warn('A date has been picked: ', time);
    const dt = new Date(time);
    const x = dt.toLocaleTimeString();
    setTaskObject({...taskObject, endTime: x});
    hideEndTimePicker();
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={onClose()}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create Task | {selectedDate}</Text>
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
        </View>
        {/* <View style={styles.dateTimeEndContainer}>
          <TouchableOpacity style={styles.dateBtn} onPress={showEndDatePicker}>
            <Text style={styles.btnText}>Select End Date</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmEndDate}
            onCancel={hideEndDatePicker}
          />
          <TouchableOpacity style={styles.timeBtn} onPress={showEndTimePicker}>
            <Text style={styles.btnText}>Select End Time</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmEndTime}
            onCancel={hideEndTimePicker}
          />
        </View> */}
        <TextInput
          style={styles.inputName}
          placeholder="Name..."
          placeholderTextColor="#777"
          onChangeText={val => {
            setErrorTitle('');
            setTaskObject({...taskObject, title: val});
          }}
          value={nameInputValue}
        />
        {errorTitle && <Text>{errorTitle}</Text>}
        <TextInput
          style={styles.inputTask}
          placeholder="Task..."
          placeholderTextColor="#777"
          onChangeText={val => setTaskObject({...taskObject, task: val})}
          value={taskInputValue}
        />
        <TouchableWithoutFeedback onPress={handleAddTask}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonPlaceHolder}>Add task</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};
