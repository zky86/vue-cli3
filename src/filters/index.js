/* eslint-disable */
export function formatTime(value) {
  var time = value[0];
  // 如果没有时间跳出
  if(!time){
    return;
  }
  if (arguments.length === 0) {
    return null
  }
  const format = value[1] || '{y-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
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
