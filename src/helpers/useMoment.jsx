 import moment from "moment/moment"
 
export const getCurrentTimeStamp = (timeformat) => {
  return moment().format(timeformat); // Mar 23, 2024 5:27 PM
};

