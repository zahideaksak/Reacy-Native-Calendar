import moment from 'moment';

const utils = {
  getTime(date) {
    const stamp = parseInt(date / 1000, 10);
    return moment.unix(stamp).format('HH:mm a');
  },
};

export default utils;
