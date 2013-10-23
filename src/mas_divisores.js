module.exports = function() {

  // calcular el número con más divisores desde 1 hasta tope
  function mas_divisores(tope) {

    var max = obtener_maximo(1, tope, total_divisores);

    return {
      numero: max.index,
      factores: divisores(max.index),
      total: max.value
    }
  }

  // obtiene el máximo valor de fn(1) a fn(numero)
  function obtener_maximo(inicio, final, fn) {
    var new_value;
    var max_index = 0, max_value = -Number.MAX_VALUE;
    
    for(var i = inicio; i <= final; i++) {
      new_value = fn.call(this, i);
      if (new_value >= max_value) {
        max_value = new_value;
        max_index = i;
      }
    }

    return {
      index: max_index,
      value: max_value   
    }

  }

  // calcular los divisores de num
  function divisores(num) {
    var i;
    var divisores = [];
    var temp_divisores;
    var exponente;
    var resumido = resumir(factores_primos(num))

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

  return {
    mas_divisores: mas_divisores,
    obtener_maximo: obtener_maximo,
    divisores: divisores,
    total_divisores: total_divisores,
    resumir: resumir,
    factores_primos: factores_primos
  }

}();
