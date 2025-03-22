export function getGreetings(hours) {
  if (hours < 4 || hours >= 19) return "Good night";
  if (hours < 9) return "Good Morning";
  if (hours < 16) return "Good Afternoon";
  return "Good Evening";
}

// Common js-> Old
// module.exports = getGreetings;

// ESM Syntax to export
// export default getGreetings;
