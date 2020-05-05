function toString({ date, options }: { date: Date; options: any }): string {
  return new Intl.DateTimeFormat('default', options).format(date);
}

function toLongSring(date: Date = new Date()): string {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return toString({ date, options });
}

const TimeService = {
  toLongSring,
  toString,
};

export default TimeService;
