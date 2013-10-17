// calcular el número con más divisores desde 1 hasta tope
function mas_divisores(tope) {
    var f = 1;
    var f_nuevo;
    var n = 1;
    var i = 1;

    while(i<=tope) {
      f_nuevo = total_divisores(i);

      if (f_nuevo >= f) {
          f = f_nuevo;
          n = i;
      }
      i++;
    }

    return {
       numero: n,
       factores: divisores(n),
       total: f
    }
}

// calcular los divisores de num
function divisores(num) {
  var resumido = resumir(factores_primos(num))

  var i;
  var divisores = [];
  var temp_divisores;
  var exponente;

  resumido.forEach(function(factor_primo) {
    temp_divisores = [];
    for(exponente = 1; exponente <= factor_primo[1]; exponente++) {
      divisores.forEach(function(divisor) {
        temp_divisores.push(divisor*Math.pow(factor_primo[0],exponente));
      });
      temp_divisores.push(Math.pow(factor_primo[0],exponente));
    }
    divisores = divisores.concat(temp_divisores);
  });

  divisores.push(1);

  return divisores.sort(function(a,b) {return a - b;});
}

// a partir de los factores primos obtenemos cuantos divisores hay
function total_divisores(num) {
  var f = 1;
  
  resumir(factores_primos(num))
  .forEach(function(element, index, array) {
    f = f * (element[1] + 1);
  });
  return f;
}

// convertimos [2,2,2,3,3,5] en [[2,3],[3,2],[5,1]]
function resumir(array) {
  var last;
  var resumido = array.reduce(function(previous, current) {
    last = previous.slice(-1)[0];
    if (last[0] == current) {
        last[1] = last[1] + 1;
    } else {
        previous.push([current,1]);
    }
    return previous;
  }, [[1,1]]);
  resumido.shift();
  return resumido;
}

// devuelve un array con los factores primos del número solicitado
function factores_primos(num) {
  var factores = [];
  var posible_divisor = 2;
  var division;

  while (posible_divisor <= Math.sqrt(num)) {
    while (es_entero(division = num / posible_divisor)) {
      factores.push(posible_divisor);
      num = division;
    };
    posible_divisor = posible_divisor + 1;
  };

  if (num!= 1) factores.push(num);

  return factores;
}

// devuelve verdadero si tiene decimales
function es_entero(num) {
    return num % 1 == 0
}

exports.mas_divisores = mas_divisores;
exports.total_divisores = total_divisores;
exports.divisores = divisores;
exports.factores_primos = factores_primos;
exports.resumir = resumir;
