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
import TimelineContent from '../../components/timelineContent';
import TimelineHeader from '../../components/timelineHeader';
import RenderHour from '../../components/renderHour';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AddTaskModal} from '../../modal/addTaskModal';
import {icons} from '../../assets/icons';
import moment from 'moment';

// const thisMonthStamp = 1664627943;
const timelineHeight = hourList.length * 41;
const today = new Date();

export const CalendarScreen: FC<any> = () => {
  const month = moment().format('MMMM');
  //const test = moment();
  //console.log('mom', test.daysInMonth());
  const [pickDate, setPickDate] = useState(false);
  const [monthText, setMonthText] = useState(month);
  const [days, setDays] = useState<any>(calendarDummyDates);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any[]>([]);
  // function handleModalVisible() {
  //   setModalVisible(!modalVisible);
  // }
  console.log('days', days);

  useEffect(() => {
    let array = [];
    for (let index = 1; index <= moment().daysInMonth(); index++) {
      const newDay = moment(`MMMM ${month} ${index}`);
      array.push({weekDay: newDay.format('dd'), day: index, data: []});
    }
    setDays(array);
  }, [month]);

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
    newDays = days.map(dayData => {
      return {
        ...dayData,
        data: filteredTasks.filter(
          task =>
            parseInt(moment(task.selectedDate).format('DD')) === dayData.day,
        ),
      };
    });
    setDays(newDays);
  }, [tasks]);

  // const handleAddTask = (time: {hr: number}, index: number) => {
  //   const monthDay = days[index];
  //   const dateToAdd = new Date(thisMonthStamp * 1000);
  //   dateToAdd.setHours(time.hr);
  //   dateToAdd.setDate(monthDay.day);
  //   dateToAdd.setMinutes(0);
  //   // const startHr = dateToAdd.getHours();
  //   // const startMin = dateToAdd.getMinutes();
  //   // const endHr = dateToAdd.getHours() + 1;
  //   // const endMin = dateToAdd.getMinutes();
  //   // addTaskModal.show(
  //   //   {
  //   //     dateToAdd,
  //   //     startHr,
  //   //     startMin,
  //   //     endHr,
  //   //     endMin,
  //   //   },
  //   //   // (task: any) => {
  //   //   //   dispatchTask(task);
  //   //   // },
  //   // );
  // };

  const handleSelectDate = ({nativeEvent}: {nativeEvent: any; type: any}) => {
    setPickDate(false);
    let selectedTimeStamp = new Date(nativeEvent.timestamp);
    setSelectedDate(moment(selectedTimeStamp).format());
    // if (type === 'set') {
    //   let startHr = selectedTimeStamp.getHours();
    //   let startMin = selectedTimeStamp.getMinutes();
    //   let endHr = selectedTimeStamp.getHours() + 1;
    //   let endMin = selectedTimeStamp.getMinutes();
    //   if (addTaskModal.current) {
    //     addTaskModal.current?.show(
    //       {
    //         dateToAdd,
    //         startHr,
    //         startMin,
    //         endHr,
    //         endMin,
    //         showRecurring: false,
    //       },
    //       // (task: any) => {
    //       //   dispatchTask(task);
    //       // },
    //     );
    //   }
    // }
    setModalVisible(true);
  };
  const handleAdd = () => {
    setPickDate(true);
  };

  // const addTask = () => {};

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
            scrollToOffset={TimelineHeader}
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
                  console.log('item', item);
                  return 'timeLineContent' + item?.day?.toString();
                }}
                renderItem={TimelineContent}
              />
            </View>
          </View>
        </ScrollView>

        <AddTaskModal
          isVisible={modalVisible}
          selectedDate={selectedDate}
          onClose={(taskObject: any) => {
            setTasks([
              ...tasks,
              {
                selectedDate: selectedDate,
                startTime: taskObject.startTime,
                endTime: taskObject.endTime,
                title: taskObject.title,
                task: taskObject.task,
              },
            ]);
            setModalVisible(false);
          }}
        />

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
