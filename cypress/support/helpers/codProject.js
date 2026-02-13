export function generateProjectCode() {
  const randomNumber1 = Math.floor(Math.random() * 10);
  const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  const randomNumber2 = Math.floor(Math.random() * 10);

  return `${randomNumber1}${randomLetter}${randomNumber2}`;
}
