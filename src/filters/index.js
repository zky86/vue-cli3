/* eslint-disable */
export function datetime(date, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    date =
      date.indexOf(',') > 0 ?
      new Date(date) :
      +date.replace(/\/Date\((\d+)\)\//, '$1');
  }
  typeof date === 'number' && (date = new Date(date));
  let obj = {
    // yyyy-MM-dd 第q季度 www HH:mm:ss:SSS
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    q: Math.floor((date.getMonth() + 3) / 3),
    w: date.getDay(),
    H: date.getHours(),
    h: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    m: date.getMinutes(),
    s: date.getSeconds(),
    S: date.getMilliseconds()
  };
  let _week = ['日', '一', '二', '三', '四', '五', '六'];
  for (let i in obj) {
    format = format.replace(new RegExp(i + '+', 'g'), m => {
      let val = obj[i] + '';
      if (i === 'w') return (m.length > 2 ? '星期' : '周') + _week[val];
      for (let j = 0, len = val.length; j < m.length - len; j++) {
        val = '0' + val;
      }
      return m.length === 1 ? val : val.substring(val.length - m.length);
    });
  }
  return format;
}

export function timeInterval(val, text = '') {
  let date = new Date(val);
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const now = new Date().getTime();
  const diffValue = now - date;
  const monthC = diffValue / month;
  const weekC = diffValue / (7 * day);
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;
  if (monthC >= 1) {
    val = Math.round(+monthC) + '月前' + text;
  } else if (weekC >= 1) {
    val = Math.round(+weekC) + '周前' + text;
  } else if (dayC >= 1) {
    val = Math.round(+dayC) + '天前' + text;
  } else if (hourC >= 1) {
    val = Math.round(+hourC) + '小时前' + text;
  } else if (minC >= 1) {
    val = Math.round(+minC) + '分钟前' + text;
  } else {
    val = '刚刚' + text;
  }
  return val;
}
