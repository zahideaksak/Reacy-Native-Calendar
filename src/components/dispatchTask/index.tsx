// import React, {useState, createFactory} from 'react';

// interface MonthDay {
//   day: number;
//   data?: {
//     hr: number;
//     min: number;
//     date: Date;
//     startHr: number;
//     startMin: number;
//     endHr: number;
//     endMin: number;
//     name: string;
//     description: string;
//   }[];
// }

// interface Props {
//   days: MonthDay[];
//   setDays: (days: MonthDay[]) => void;
//   timeLineContent: any;
// }

// const DispatchTask: FC<Props> = ({days, setDays, timeLineContent}) => {
//   const dispatchTask = ({
//     date,
//     startHr,
//     endHr,
//     endMin,
//     startMin,
//     name,
//     description,
//     taskIndex,
//   }: any) => {
//     const index = days.findIndex(monthDay => monthDay.day === date);
//     if (index === -1) {
//       alert('Please Select Date From October Month');
//       return;
//     }
//     const day = days[index];
//     const updated = {
//       hr: startHr,
//       min: startMin,
//       date,
//       startHr,
//       startMin,
//       endMin,
//       endHr,
//       name,
//       description,
//     };
//     if (taskIndex !== -1) {
//       if (day?.data?.[taskIndex] !== undefined) {
//         day.data[taskIndex] = updated;
//       }
//     } else {
//       if (day?.data === undefined) {
//         day.data = [];
//       }
//       day.data.push(updated);
//     }
//     days[index] = day;
//     setDays([...days]);
//     timeLineContent.scrollToIndex({index, animated: false});
//   };
// };

// export default DispatchTask;
