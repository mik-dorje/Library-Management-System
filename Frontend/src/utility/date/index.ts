export const getWeekNumberInMonth = (date: string | Date) => {
  const formattedDate = new Date(date)
  const firstDayOfMonth = new Date(
    formattedDate.getFullYear(),
    formattedDate.getMonth(),
    1
  )
  const weekNumber = Math.ceil(
    (formattedDate.getDate() + firstDayOfMonth.getDay()) / 7
  )
  return weekNumber
}

export const currentWeekNumber = getWeekNumberInMonth(new Date())
