// calcular el número con más divisores desde 1 hasta tope
function masDivisores(tope) {
    var n = 1;
    var f = [1];

    for(var i = 1; i <= tope; i++) {
       
       if (factores(i).length > f.length) {
           n = i;
           f = factores(i);
       }
    }

    return {
       numero: n,
       factores: f,
       total: f.length
    }
}

// -----------------------------------------------------------
// devuelve un array con los factores del número solicitado
function factores(num) {
  var f = [1];
  var max = num / 2;

  if (num == 1) return f;

  for (var i = 2; i <= max; i++) {
      if (tieneDecimales(num/i)) {
          f.push(i);
      }
  }

  f.push(num);

  return f;
}



// devuelve verdadero si tiene decimales
function tieneDecimales(num) {
    return num % 1 == 0
}

exports.masDivisores = masDivisores;
