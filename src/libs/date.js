export function fmtdate(date = 0) {
  let year = 0;
  let month = 0;
  let day = 0;
  let hours = 0;
  let minute = 0;
  let ses = 0;
  if (date / 60 / 60 / 24 / 365 > 0) {
    year = Math.floor(date / 60 / 60 / 24 / 365);
    date -= year * 60 * 60 * 24 * 365;
  }
  if (date / 60 / 60 / 24 / 30 > 0) {
    month = Math.floor(date / 60 / 60 / 24 / 30);
    date -= month * 60 * 60 * 24 * 30;
  }
  if (date / 60 / 60 / 24 > 0) {
    day = Math.floor(date / 60 / 60 / 24);
    date -= day * 60 * 60 * 24;
  }
  if (date / 60 / 60 > 0) {
    hours = Math.floor(date / 60 / 60);
    date -= hours * 60 * 60;
  }
  if (date / 60 > 0) {
    minute = Math.floor(date / 60);
    date -= minute * 60;
  }
  ses = Math.floor(date);
  
  return `${year} 年 ${month} 月 ${day} 日 ${hours} 小时 ${minute} 分钟 ${ses} 秒`;
}
