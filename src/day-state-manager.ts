const {isToday, isDateNotInRange, sameMonth} = require('./dateutils');
const {toMarkingFormat} = require('./interface');


export function getState(day: XDate, current: XDate, props: any) {
  const {minDate, maxDate, disabledByDefault, context, allowSelectionOutOfRange} = props;
  let state = '';

  const isDateOutOfRange = isDateNotInRange(day, minDate, maxDate);

  const isSelected = (context?.date ?? toMarkingFormat(current)) === toMarkingFormat(day);

  if (isSelected && (!isDateOutOfRange || allowSelectionOutOfRange)) {
    state = 'selected';
  } else if (isToday(day)) {
    state = 'today';
  } else if (disabledByDefault) {
    state = 'disabled';
  } else if (isDateOutOfRange) {
    state = 'disabled';
  } else if (!sameMonth(day, current)) {
    state = 'disabled';
  }

  if (isDateOutOfRange) {
    console.log('getState', day, minDate, maxDate, isDateOutOfRange, state);
  }

  return state;
}
