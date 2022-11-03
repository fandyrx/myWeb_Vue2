import moment from "moment";

const DEFAULT_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export function formatUtcString(utcString, format = DEFAULT_TIME_FORMAT) {
  return moment.utc(utcString).format(format);
}

//1. 音乐图片截取
export function getSizeImage(imgUrl, size) {
  return `${imgUrl}?param=${size}x${size}`;
}
