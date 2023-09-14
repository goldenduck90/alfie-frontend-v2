const FIXED_HOLIDAYS = {
  "1/1": "New Year's Day", // 1st January
  "6/19": "Juneteenth", // 19th June
  "7/4": "Independence Day", // 4th July
  "11/11": "Veterans Day", // 11st November
  "12/25": "Christmas Day", // 25th December
};

const FLOATING_HOLIDAYS = {
  "1/3/1": "Birthday of Martin Luther King", // third Monday in January
  "2/3/1": "Washington's Birthday", // third Monday in February
  "9/1/1": "Labor Day", // first Monday in September
  "10/2/1": "Columbus Day", // second Monday in October
  "11/4/4": "Thanksgiving Day", // fourth Thursday in November
};

const isHoliday = () => {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const day = today.getDay();

  const isFixedHoliday = Object.keys(FIXED_HOLIDAYS).includes(
    `${month + 1}/${date}`
  );

  const isFloatingHoliday = Object.keys(FLOATING_HOLIDAYS).includes(
    `${month + 1}/${Math.floor((date - 1) / 7) + 1}/${day}`
  );

  return isFixedHoliday || isFloatingHoliday;
};

const isWorkingHour = () => {
  const today = new Date();
  const day = today.getDay();
  const hour = today.getHours();
  const isWeekend = day === 0 || day === 6; // Sunday || Saturday

  const isWorkingHour = hour > 8 && hour < 18; // 8.00AM - 6.00 PM

  return isWeekend || !isWorkingHour;
};

export const isOfficeAvailable = () => {
  return !isHoliday() && isWorkingHour();
};
