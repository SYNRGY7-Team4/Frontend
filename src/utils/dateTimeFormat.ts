const dateTiemFormat = (dateTime: Date) => {
  const formattedDate = dateTime.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
};

export default dateTiemFormat;
