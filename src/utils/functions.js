export const getCalculatedTime = (timeSlot, interval=2) => {
  const str = timeSlot.split(":")
  const strPlusTwoHours = Number(str[0]) + interval;
  const endTime = `${strPlusTwoHours}:${str[ str.length - 1]}`
  return endTime;
}
