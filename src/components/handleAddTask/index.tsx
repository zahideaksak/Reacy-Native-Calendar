// import React, {FC, useState} from 'react';
// const thisMonthStamp = 1664627943;

// interface Props {
//   days: any[];
//   thisMonthStamp: number;
//   addTaskModal: any;
//   dispatchTask: (task: any) => void;
// }

// const HandleAddTask: FC<Props> = ({
//   days,
//   thisMonthStamp,
//   addTaskModal,
//   dispatchTask,
// }) => {
//   const handleAddTask = (time: {hr: number}, index: number) => {
//     const monthDay = days[index];
//     const dateToAdd = new Date(thisMonthStamp * 1000);
//     dateToAdd.setHours(time.hr);
//     dateToAdd.setDate(monthDay.day);
//     dateToAdd.setMinutes(0);
//     const startHr = dateToAdd.getHours();
//     const startMin = dateToAdd.getMinutes();
//     const endHr = dateToAdd.getHours() + 1;
//     const endMin = dateToAdd.getMinutes();

//     addTaskModal.show(
//       {
//         dateToAdd,
//         startHr,
//         startMin,
//         endHr,
//         endMin,
//       },
//       (task: any) => {
//         dispatchTask(task);
//       },
//     );
//   };
// };

// const handleAddTask = (time: {hr: number}, index: number) => {
//   const {days} = state;
//   let monthDay = days[index];
//   let dateToAdd = new Date(thisMonthStamp * 1000);
//   dateToAdd.setHours(time.hr);
//   dateToAdd.setDate(monthDay.day);
//   dateToAdd.setMinutes(0);
//   let startHr = dateToAdd.getHours();
//   let startMin = dateToAdd.getMinutes();
//   let endHr = dateToAdd.getHours() + 1;
//   let endMin = dateToAdd.getMinutes();
//   addTaskModalRef.current?.show(
//     {
//       dateToAdd,
//       startHr,
//       startMin,
//       endHr,
//       endMin,
//     },
//     task => {
//       dispatchTask(task);
//     },
//   );
// };

// export default HandleAddTask;
