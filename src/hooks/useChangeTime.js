const useChangeTime = (time) => {
  const milliseconds = time?.seconds * 1000 + time?.nanoseconds / 1000000;
  let date = new Date(milliseconds);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  date = `${day}/${month}`;
  return { day, month, year, date };
};

export default useChangeTime;
