export default function bodyMassIndex(weight, height) {
  const bmi = Number.parseFloat(
    (weight / (((height / 100) * height) / 100)).toFixed(1)
  );
  let result = { bmi };
  if (bmi < 18.5) {
    result.category = "underweight";
  }
  if (bmi > 18.5 && bmi < 24.9) {
    result.category = "normal";
  }
  if (bmi > 25 && bmi < 29.9) {
    result.category = "overweight";
  }
  if (bmi >= 30) {
    result.category = "obese";
  }
  return result;
}
