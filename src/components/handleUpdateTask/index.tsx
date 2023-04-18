// import React, {useState} from 'react';

// interface Props {
//   days: any[];
//   thisMonthStamp: number;
//   addTaskModal: any;
//   dispatchTask: (task: any) => void;
// }

// const HandleUpdateTask: React.FC<Props> = ({
//   days,
//   thisMonthStamp,
//   addTaskModal,
//   dispatchTask,
// }) => {
//   const handleUpdateTask = (task: any, taskIndex: number, index: number) => {
//     const monthDay = days[index];
//     const dateToAdd = new Date(thisMonthStamp * 1000);
//     dateToAdd.setDate(task.date);
//     const startHr = task.startHr;
//     const startMin = task.startMin;
//     const endHr = task.endHr;
//     const endMin = task.endMin;

//     addTaskModal.show(
//       {
//         index: taskIndex,
//         dateToAdd,
//         startHr,
//         startMin,
//         endHr,
//         endMin,
//         name: task.name,
//         description: task.description,
//         showRecurring: false,
//       },
//       (task: any) => {
//         dispatchTask(task);
//       },
//     );
//   };
// };

// export default HandleUpdateTask;
