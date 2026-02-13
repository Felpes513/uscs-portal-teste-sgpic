function generateCPF({ formatted = false } = {}) {
  const generateBaseDigits = () =>
    Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  const calculateDigit = (digits) => {
    const factor = digits.length + 1;

    const total = digits.reduce((sum, digit, index) => {
      return sum + digit * (factor - index);
    }, 0);

    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  let baseDigits;
  let cpf;

  do {
    baseDigits = generateBaseDigits();

    const firstDigit = calculateDigit(baseDigits);
    const secondDigit = calculateDigit([...baseDigits, firstDigit]);

    cpf = [...baseDigits, firstDigit, secondDigit].join("");
  } while (/^(\d)\1+$/.test(cpf));
  if (!formatted) return cpf;

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

module.exports = {
  generateCPF,
};
