module.exports = (function() {
  
  var md = {

    // devuelve verdadero si tiene decimales
    es_entero: function(num) {
        return num % 1 == 0
    },

    // obtiene el máximo valor de fn(1) a fn(numero)
    obtener_maximo: function(inicio, final, fn) {
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

    },

    // calcular los divisores de num
    divisores: function(num) {
      var i;
      var divisores = [];
      var temp_divisores;
      var exponente;
      var resumido = md.resumir(md.factores_primos(num))

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
    },

    // a partir de los factores primos obtenemos cuantos divisores hay
    total_divisores: function(num) {
      var f = 1;
      
      md.resumir(md.factores_primos(num))
      .forEach(function(element, index, array) {
        f = f * (element[1] + 1);
      });
      return f;
    },
    
    // convertimos [2,2,2,3,3,5] en [[2,3],[3,2],[5,1]]
    resumir: function(array) {
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
    },

    // devuelve un array con los factores primos del número solicitado
    factores_primos: function(num) {
      var factores = [];
      var posible_divisor = 2;
      var division;
    
      while (posible_divisor <= Math.sqrt(num)) {
        while (md.es_entero(division = num / posible_divisor)) {
          factores.push(posible_divisor);
          num = division;
        };
        // TODO: Incrementar más eficientemente los posibles divisores primos
        posible_divisor = posible_divisor + 1;
      };
    
      if (num!= 1) factores.push(num);
    
      return factores;
    },
    
    // calcular el número con más divisores desde 1 hasta tope
    mas_divisores: function(tope) {

      var max = md.obtener_maximo(1, tope, md.total_divisores);

      return {
        numero: max.index,
        factores: md.divisores(max.index),
        total: max.value
      }
    }


  };

  return md;

})();
