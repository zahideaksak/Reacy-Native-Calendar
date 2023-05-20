import React, {FC, useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styled';
import theme from '../../assets/theme';
import hourList from '../../assets/hourList';
import Icon from '../../components/icon';
import calendarDummyDates from '../../assets/calendarDummyDates';
import TimelineHeader from '../../components/timelineHeader';
import RenderHour from '../../components/renderHour';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AddTaskModal} from '../../modal/addTaskModal';
import {icons} from '../../assets/icons';
import moment from 'moment';
import Timeline from '../../components/timeLine';

// const thisMonthStamp = 1664627943;
const timelineHeight = hourList.length * 41;
const today = new Date();
interface Props {
  item: {
    day: any;
    data: any[];
  };
  index: number;
}

export const CalendarScreen: FC<any> = () => {
  const defaultTaskObj = {
    selectedDate: '',
    taskID: 0,
    startTime: 'Select Start Time',
    endTime: 'Select End Time',
    title: '',
    task: '',
  };
  const month = moment().format('MMMM');
  //const test = moment();
  //console.log('mom', month);
  const [pickDate, setPickDate] = useState(false);
  const [selectedTaskObj, setSelectedTaskObj] = useState(defaultTaskObj);
  const [monthText, setMonthText] = useState(month);
  const [days, setDays] = useState<any>(calendarDummyDates);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any[]>([]);

  //console.log('tasks:', tasks);
  //console.log('days', days);

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
    let newDays;
    const filteredTasks = tasks.filter(
      x =>
        moment(x.selectedDate).format('YYYY') === '2023' &&
        moment(x.selectedDate).format('MMMM') === month,
    );
    newDays = days.map((dayData: {day: number}) => {
      return {
        ...dayData,
        data: filteredTasks.filter(
          task =>
            parseInt(moment(task.selectedDate).format('DD')) === dayData.day,
        ),
      };
    });
    setDays(newDays);
  }, [days, month, tasks]);

  useEffect(() => {
    let array = [];
    for (let index = 1; index <= moment().daysInMonth(); index++) {
      const newDay = moment(`MMMM ${month} ${index}`);
      array.push({weekDay: newDay.format('ddd'), day: index, data: []});
    }
    setDays(array);
  }, [month]);

  const handleSelectDate = async ({
    nativeEvent,
  }: {
    nativeEvent: any;
    type: any;
  }) => {
    setPickDate(false);
    let selectedTimeStamp = new Date(nativeEvent.timestamp);
    console.log('selectedTimeStamp', selectedTimeStamp);
    setSelectedTaskObj({
      ...defaultTaskObj,
      selectedDate: moment(selectedTimeStamp).format(),
    });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setPickDate(true);
  };

  const handleUpdateTask = (task: any, taskIndex: any, index: any) => {
    console.log('update task tıklandııı');
    setSelectedTaskObj(task);
    setModalVisible(true);
  };

  // const addTask = () => {};

  const renderTimelineContent: FC<Props> = ({item: {data}, index}) => {
    return (
      <Timeline
        data={data}
        updateTask={(task, taskIndex) => {
          console.log('test', task, taskIndex);
          return handleUpdateTask(task, taskIndex, index);
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
              <Icon
                name="menu"
                path={icons.menu}
                size={26}
                color={theme.grey}
              />
            </View>
            <View style={styles.headerMonthPicker}>
              <Text style={styles.headerMonthPickerTxt}>{monthText}</Text>
              <Icon
                name="chevronDown"
                path={icons.chevronDown}
                color={theme.grey}
                size={14}
              />
            </View>
          </View>

          <FlatList
            horizontal
            data={days} // anlamadım
            ref={timelineHeader}
            // scrollToOffset={TimelineHeader}
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
            onAddTask={(taskObject: any) => {
              let isExistTask = tasks.some(t => t.taskID === taskObject.taskID);
              //console.log('isExistTask: ', isExistTask);
              const lastElementId = tasks[tasks.length - 1]?.taskID;
              //console.log('last', lastElementId);
              if (isExistTask) {
                const newTask = tasks.map(task => {
                  if (task.taskID === taskObject.taskID) {
                    return {
                      ...task,
                      startTime: taskObject.startTime,
                      endTime: taskObject.endTime,
                      title: taskObject.title,
                      task: taskObject.task,
                    };
                  }
                  return task;
                });
                setTasks(newTask);
              } else {
                setTasks([
                  ...tasks,
                  {
                    selectedDate: taskObject.selectedDate,
                    taskID: lastElementId >= 0 ? lastElementId + 1 : 1,
                    startTime: taskObject.startTime,
                    endTime: taskObject.endTime,
                    title: taskObject.title,
                    task: taskObject.task,
                  },
                ]);
              }
              setSelectedTaskObj(defaultTaskObj); //anlamadımm
              setModalVisible(false);
            }}
          />
        )}

        <View style={styles.addBtnMain}>
          <View>
            <View style={styles.addBtnView}>
              <TouchableOpacity onPress={handleAdd}>
                <Icon name="add" path={icons.add} color={'default'} size={35} />
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
