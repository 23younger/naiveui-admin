import { format } from 'date-fns';

const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const DATE_FORMAT = 'yyyy-MM-dd ';

export function formatToDateTime(date: Date | number, formatStr = DATE_TIME_FORMAT): string {
  return format(date, formatStr);
}

export function formatToDate(date: Date | number, formatStr = DATE_FORMAT): string {
  return format(date, formatStr);
}

// 推广时间段数据改造
export function dayLIst(day) {
  // console.log('day', day)
  const daysList = day.split(',');
  if (daysList.length == 0) return '-';
  let daysText = '星期';
  // let orderedDays = daysList.map(day => parseInt(day)).sort();
  const orderedDays = daysList
    .map((day) => parseInt(day))
    .sort(function (a, b) {
      if (a === 0) return 1; // 将数字0排在最后面
      if (b === 0) return -1;
      return a - b;
    });
  // console.log('orderedDays', orderedDays)
  for (let i = 0; i < orderedDays.length; i++) {
    const dayInt = parseInt(orderedDays[i]);
    let dayText = '';
    switch (dayInt) {
      case 0:
        dayText = '天';
        break;
      case 1:
        dayText = '一';
        break;
      case 2:
        dayText = '二';
        break;
      case 3:
        dayText = '三';
        break;
      case 4:
        dayText = '四';
        break;
      case 5:
        dayText = '五';
        break;
      case 6:
        dayText = '六';
        break;
    }
    daysText += dayText + ',';
  }
  // 去除daysText最后一个逗号
  daysText = daysText.substring(0, daysText.length - 1);
  return daysText;
}

// 生成今日年月日
export function getdate(num) {
  // num为0 返回年月 为1返回年月日
  const today = new Date();
  const year = today.getFullYear(); // 年份
  let month: number | string = today.getMonth() + 1; // 月份（注意：getMonth()返回值是0-11，因此需要加1）
  let day: number | string = today.getDate(); // 日期
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return num === 0 ? year + '.' + month : year + '.' + month + '.' + day;
}
