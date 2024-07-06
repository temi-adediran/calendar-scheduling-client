export const getEndTime = (timeSlot) => {
  const str = timeSlot.split(":")
  const strPlusTwoHours = Number(str[0]) + 2;
  const endTime = `${strPlusTwoHours}:${str[ str.length - 1]}`
  return endTime;
}
