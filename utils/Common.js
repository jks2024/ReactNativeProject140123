import moment from 'moment'; // 시간을 경과 시간 형태로 표시
import 'moment/locale/ko';
moment.locale('ko'); // 한국 시간 적용

const Commons = {
  timeFromNow: timestamp => {
    return moment(timestamp).fromNow();
  },
  formatDate: dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adds leading 0 if needed
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  },
};
export default Commons;
