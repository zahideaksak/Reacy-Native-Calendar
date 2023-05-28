import React, {FC, useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from './styled';
import hourList from '../../assets/hourList';
import calendarDummyDates from '../../assets/calendarDummyDates';
import TimelineHeader from '../../components/timelineHeader';
import RenderHour from '../../components/renderHour';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AddTaskModal} from '../../modal/addTaskModal';
import moment from 'moment';
import Timeline from '../../components/timeLine';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, updateTask} from '../../redux/reducers/task';
import {RootState} from '../../redux/store';
import {ITask} from '../../models';

const timelineHeight = hourList.length * 41;
const today = new Date();
interface Props {
  item: {
    day: number;
    data: object[];
  };
  index: number;
}

export const CalendarScreen: FC<ITask> = () => {
  const taskList = useSelector((state: RootState) => state.task.tasks);
  console.log('tasklist: ', taskList);
  const dispatch = useDispatch();
  const defaultTaskObj = {
    selectedDate: '',
    taskID: 0,
    startTime: 'Select Start Time',
    endTime: 'Select End Time',
    title: '',
    task: '',
  };
  let selectedDate: any;
  const month = moment().format('MMMM');
  const [pickDate, setPickDate] = useState(false);
  const [selectedTaskObj, setSelectedTaskObj] = useState(defaultTaskObj);
  const [days, setDays] = useState<any>(calendarDummyDates);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleModalHidden = () => {
    setModalVisible(false);
    setSelectedTaskObj(defaultTaskObj);
  };

  let timelineHeader = useRef<FlatList | null>(null);
  let timeLineContent: any;

  const onTimeLineScroll = (contentOffset: any) => {
    timelineHeader?.current?.scrollToOffset({
      offset: contentOffset.nativeEvent.contentOffset.x,
      animated: false,
    });
  };

  useEffect(() => {
    let array = [];
    for (let index = 1; index <= moment().daysInMonth(); index++) {
      const newDay = moment(`MMMM ${month} ${index - 1}`);
      array.push({weekDay: newDay.format('ddd'), day: index, data: []});
    }
    if (taskList && taskList.length > 0) {
      const filteredTasks = taskList.filter(
        (task: ITask) =>
          moment(task.selectedDate).format('YYYY') === '2023' &&
          moment(task.selectedDate).format('MMMM') === month,
      );
      array = array.map((dayData: {day: number}) => {
        return {
          ...dayData,
          data: filteredTasks.filter(
            (task: ITask) =>
              parseInt(moment(task.selectedDate).format('DD'), 10) ===
              dayData.day,
          ),
        };
      });
    }
    setDays(array);
  }, [month, taskList]);

  const handleSelectDate = async ({nativeEvent}: {nativeEvent: any}) => {
    setPickDate(false);
    let selectedTimeStamp = new Date(nativeEvent.timestamp);
    setSelectedTaskObj({
      ...defaultTaskObj,
      selectedDate: moment(selectedTimeStamp).format(),
    });
    setModalVisible(true);
  };
  const handleAdd = () => {
    setPickDate(true);
  };
  const handleUpdateTask = (task: any) => {
    setSelectedTaskObj(task);
    setModalVisible(true);
  };

  const renderTimelineContent: FC<Props> = ({item: {data}}) => {
    return (
      <Timeline
        data={data}
        updateTask={task => {
          return handleUpdateTask(task);
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View style={styles.headerMain}>
          <View style={styles.headerTopRowHeader}>
            <View style={styles.headerIconCover}>
              <Image
                source={require('../../assets/images/calendar7.jpeg')}
                style={styles.headerIconCoverImg}
              />
            </View>
            <View style={styles.headerMonthPicker}>
              <Text style={styles.headerMonthPickerTxt}>{month}</Text>
            </View>
          </View>
          <FlatList
            horizontal
            data={days}
            ref={timelineHeader}
            scrollEnabled={false}
            renderItem={TimelineHeader}
            keyExtractor={item => 'TimelineHeader' + item.day.toString()}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
        <ScrollView nestedScrollEnabled>
          <View style={styles.scrollViewMain}>
            <View style={styles.timeListMain}>
              {hourList.map((item, index) => RenderHour(item, index))}
            </View>
            <View style={styles.scrollViewFlatList}>
              <FlatList
                horizontal
                data={days}
                ref={timeLineContent}
                onScroll={onTimeLineScroll}
                contentContainerStyle={{height: timelineHeight}}
                keyExtractor={item => {
                  return 'timeLineContent' + item?.day?.toString();
                }}
                renderItem={renderTimelineContent}
              />
            </View>
          </View>
        </ScrollView>
        {selectedTaskObj.selectedDate !== '' && (
          <AddTaskModal
            isVisible={modalVisible}
            selectedDate={selectedDate}
            onBackClose={handleModalHidden}
            taskObj={selectedTaskObj}
            onAddTask={(taskObject: ITask) => {
              let isExistTask =
                taskObject.taskID !== 0 &&
                taskList.filter((t: ITask) => t.taskID === taskObject.taskID);
              const lastElementId = taskList[taskList.length - 1]?.taskID;
              if (isExistTask) {
                dispatch(
                  updateTask({
                    selectedDate: taskObject.selectedDate,
                    taskID: taskObject.taskID,
                    startTime: taskObject.startTime,
                    endTime: taskObject.endTime,
                    title: taskObject.title,
                    task: taskObject.task,
                  }),
                );
                console.log('update task düzenle');
              } else {
                dispatch(
                  addTask({
                    selectedDate: taskObject.selectedDate,
                    taskID: lastElementId + 1,
                    startTime: taskObject.startTime,
                    endTime: taskObject.endTime,
                    title: taskObject.title,
                    task: taskObject.task,
                  }),
                );
                console.log('update task düzenle');
              }
              setSelectedTaskObj(defaultTaskObj);
              setModalVisible(false);
            }}
          />
        )}
        <View style={styles.addBtnMain}>
          <View>
            <View style={styles.addBtnView}>
              <TouchableOpacity onPress={handleAdd}>
                <Image
                  source={require('../../assets/images/add.png')}
                  style={styles.addImg}
                />
              </TouchableOpacity>
              <View style={styles.dateTimePickerView}>
                {pickDate ? (
                  <DateTimePicker
                    value={today}
                    textColor="red"
                    style={styles.dateTimePicker}
                    mode="date"
                    locale="en"
                    onChange={handleSelectDate}
                    minimumDate={new Date()}
                  />
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
