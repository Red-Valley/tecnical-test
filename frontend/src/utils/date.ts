import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

export const getHourAndMonth = (date: string) => {
  const month = moment(date)
  return month.format('HH:mm a | MMMM D')
}
