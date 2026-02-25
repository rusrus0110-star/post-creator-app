export const formatDate = (dateValue) => {
  if (!dateValue) return "Unknown date";

  let date;

  // Если это Unix timestamp (число)
  if (typeof dateValue === "number") {
    // Конвертируем секунды в миллисекунды
    date = new Date(dateValue * 1000);
  } else {
    // Если это строка ISO
    date = new Date(dateValue);
  }

  if (isNaN(date.getTime())) return "Invalid date";

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
};
