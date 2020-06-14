export function debounce(func, delay){  // 防抖函数
  let timer = null
  return function(...args){
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


export function formatDate(date, fmt) {  // 将时间戳进行格式的转化
  if (/(y+)/.test(fmt)) {
    // 此处时对年份进行处理，可能为2位数，可能为4位数，通过substr进行截取，substr从0位开始截取字符串，
    // repalace为替换，第一个参数为被替换的内容，RegExp.$1 为 /(y+)/.test(fmt) 正则匹配到的第一个用括号括起来的数据，eg=>yyyy
    // date.getFullYear() + '' 为了将年份转为字符串格式，从而进行substr截取
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? padLeftZero(str) : str);
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
