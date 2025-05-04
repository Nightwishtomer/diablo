// Рандомное целое число в диапазоне от min до max включительно
export function randomMath([min, max]){
  min = Math.ceil(Number(min));   // округляем вверх (если передали дробь)
  max = Math.floor(Number(max));  // округляем вниз
  return Math.floor(Math.random() * (max - min + 1)) + min;  
}

// Функция нахождения числа между двумя другими числами
export function isBetweenMath(value, min, max) {
  return value > min && value < max;
}

// Функция нахождения числа между двумя другими числами, включая границы
export function isBetweenInclusiveMath(value, min, max) {
  return value >= min && value <= max;
}