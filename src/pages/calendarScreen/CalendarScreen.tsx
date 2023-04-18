import React, {FC, useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
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
import CustomDateInput from './custom';

const thisMonthStamp = 1664627943;
const timelineHeight = hourList.length * 41;
const today = new Date();

export const CalendarScreen: FC<any> = () => {
  const month = moment().format('MMMM');
  const test = moment();
  console.log('mom', test.daysInMonth());
  const [pickDate, setPickDate] = useState(false);
  const [monthText, setMonthText] = useState(month);
  const [days, setDays] = useState(calendarDummyDates);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  function handleModalVisible() {
    setModalVisible(!modalVisible);
  }

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

  // const onTimeLineScroll = () => {
  //   timelineHeader.scrollToOffset({
  //     offset: 0,
  //     animated: true,
  //   });
  // };
  const onTimeLineScroll = (contentOffset: any) => {
    timelineHeader?.current?.scrollToOffset({
      offset: contentOffset.x,
      animated: false,
    });
  };

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

  const handleSelectDate = ({
    type,
    nativeEvent,
  }: {
    type: any;
    nativeEvent: any;
  }) => {
    setPickDate(false);
    let selectedTimeStamp = new Date(nativeEvent.timestamp);
    setSelectedDate(moment(selectedTimeStamp).format('MMM DD'));
    // if (type === 'set') {
    //   let dateToAdd = new Date(nativeEvent.timestamp);
    //   let startHr = dateToAdd.getHours();
    //   let startMin = dateToAdd.getMinutes();
    //   let endHr = dateToAdd.getHours() + 1;
    //   let endMin = dateToAdd.getMinutes();
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

  const addTask = () => {
    console.log('');
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
            <View style={styles.headerIconCover}>
              <Icon
                name="search"
                size={26}
                path={icons.search}
                color={theme.grey}
              />
            </View>
            <View style={styles.headerIconCover}>
              <Icon
                name="calendar"
                path={icons.calendar}
                size={26}
                color={theme.grey}
              />
            </View>
            <View style={styles.headerIconCover}>
              <Icon
                name="more"
                path={icons.more}
                size={26}
                color={theme.grey}
              />
            </View>
          </View>

          <FlatList
            horizontal
            data={days} // anlamadım
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
                keyExtractor={item => 'timeLineContent' + item.day.toString()}
                renderItem={TimelineContent}
              />
            </View>
          </View>
        </ScrollView>
        {/* <AddTaskModal ref={addTaskModal} /> */}

        <AddTaskModal
          isVisible={modalVisible}
          selectedDate={selectedDate}
          onClose={taskObject => {
            console.log('taskObject: ', taskObject);
            handleModalVisible;
          }}
        />

        <View style={styles.addBtnMain}>
          <View>
            <View style={{position: 'relative'}}>
              <TouchableOpacity onPress={handleAdd}>
                <Icon name="add" path={icons.add} color={'default'} size={35} />
              </TouchableOpacity>
              <View style={{opacity: 0, position: 'absolute'}}>
                {pickDate ? (
                  <DateTimePicker
                    value={today}
                    textColor="red"
                    style={{backgroundColor: 'rgba(0,0,0,0)'}}
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
