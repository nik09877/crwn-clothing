export const convertTimeStampToDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  const curDate = date.toLocaleDateString(date);
  const curTime = date.toLocaleTimeString(date);
  return curDate + ' ' + curTime;
};
