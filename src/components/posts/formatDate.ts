import moment from "moment";

export const formatDate = (date: string | undefined) => {
  return moment(date).format("DD MMM YYYY");
};



export const formatDateAuthor = (date: string | undefined) => {
  if (!date) {
    return "";
  }

  const now = moment();
  const createdDate = moment(date);

  // Calculate the difference in duration
  const duration = moment.duration(now.diff(createdDate));

  if (duration.asMonths() >= 1) {
    return createdDate.format("D MMM YYYY");
  } else if (duration.asDays() >= 1) {
    return duration.asDays().toFixed(0) + " days ago";
  } else if (duration.asHours() >= 1) {
    return duration.asHours().toFixed(0) + " hours ago";
  } else {
    return duration.asMinutes().toFixed(0) + " minutes ago";
  }
};

