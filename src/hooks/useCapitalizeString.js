const useCapitalizeString = (str) => {
  function capitalizeString(str) {
    const words = str.split(" ");
    const result = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return result.join(" ");
  }
  return capitalizeString(str);
};

export default useCapitalizeString;
