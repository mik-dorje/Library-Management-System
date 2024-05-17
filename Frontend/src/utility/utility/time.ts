export const getTimeInterValByFromAndTwo = (
  fromTime: string,
  toTime: string,
  timeInterval: number
) => {
  const times = []
  const formattedTime = []
  let startTime =
    +fromTime.split(':')[0] * 60 + (+fromTime.split(':')[1] / 60) * 60
  const endTime = +toTime.split(':')[0] * 60 + (+toTime.split(':')[1] / 60) * 60
  const ap = ['am', 'pm'] // AM-PM

  // eslint-disable-next-line no-plusplus
  for (let i = 0; startTime <= endTime; i++) {
    const hh = Math.floor(startTime / 60) // getting hours of day in 0-24 format
    const mm = startTime % 60 // getting minutes of the hour in 0-55 format
    times[i] = `${`0${hh % 12 === 0 ? 12 : hh % 12}`.slice(
      -2
    )}:${`0${mm}`.slice(-2)} ${ap[Math.floor(hh / 12)]}` // pushing data in array in [00:00 - 12:00 AM/PM format]
    startTime += timeInterval
  }

  for (let i = 0; i < times.length; i += 1) {
    formattedTime.push(times.slice(i, i + 2))
  }

  return formattedTime
}

export const formatToTime = (arr: number[]) => {
  const time = (arr || [])
    .slice(0, 2)
    .map((num) => String(num).padStart(2, '0'))
    .join(':')
  return time
}
