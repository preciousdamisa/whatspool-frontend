import * as moment from 'moment';

/// Returns a date string in a more readable form: Wednesday, April 21st 2021
export class DateTranslator {
  static readableString(date: string) {
    return `${moment(date).format('dddd')}, ${moment(date).format(
      'MMMM Do YYYY'
    )}`;
  }

  // TODO: Implement separate methods for return the time and date.
}