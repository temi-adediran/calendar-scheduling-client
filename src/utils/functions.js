export const getCalculatedTime = (timeSlot, interval=2) => {
  const str = timeSlot.split(":")
  const strPlusInterval = Number(str[0]) + interval;
  return `${strPlusInterval}:${str[ str.length - 1]}`
}
