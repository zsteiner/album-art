import moment from 'moment';

export default function checkExpiration(updateDate: string) {
  const currentDate = moment();
  const updateDateFormat = moment(new Date(updateDate).toISOString());
  const sinceUpdate = currentDate.diff(updateDateFormat, 'seconds');

  return sinceUpdate < 3600;
}
