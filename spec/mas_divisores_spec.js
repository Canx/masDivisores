var MD = require('../src/mas_divisores');

describe("mas_divisores", function() {
  it("returns 1 with 1 divisor with max = 1", function() {
    var max = MD.mas_divisores(1);
    expect(max.numero).toEqual(1);
    expect(max.total).toEqual(1);
    expect(max.factores).toEqual([1]);
  });

  it("returns 10 with 4 divisors with max = 10", function() {
    var max = MD.mas_divisores(10);
    expect(max.numero).toEqual(10);
    expect(max.total).toEqual(4);
    expect(max.factores).toEqual([1,2,5,10]);
  });

  it("returns 96 with 12 divisors with max = 100", function() {
    var max = MD.mas_divisores(100);
    expect(max.numero).toEqual(96);
    expect(max.total).toEqual(12);
    expect(max.factores).toEqual([1,2,3,4,6,8,12,16,24,32,48,96]);
  });

  it("should calc max = 10000 in less than 2000 miliseconds", function() {
    var t_ini = (new Date).getTime();
    var max = MD.mas_divisores(10000);
    var t_fin = (new Date).getTime();
    var t = t_fin - t_ini;
    expect(t).toBeLessThan(2000);
  });
     
});

describe("total_divisores", function() {
  it("returns correct number of total divisors", function() {
    expect(MD.total_divisores(10)).toEqual(4);
    expect(MD.total_divisores(18)).toEqual(6);
    expect(MD.total_divisores(24)).toEqual(8);
  });
});

describe("factores_primos", function() {
  it("returns an array with all prime factores", function() {
    expect(MD.factores_primos(10).sort()).toEqual([2,5]);
    expect(MD.factores_primos(18).sort()).toEqual([2,3,3]);
    expect(MD.factores_primos(24).sort()).toEqual([2,2,2,3]);
  });
});

describe("resumir", function() {
  it("returns a resume counting objects from array", function() {
    expect(MD.resumir([2,5])).toEqual([[2,1],[5,1]]);
    expect(MD.resumir([2,2,2,3])).toEqual([[2,3],[3,1]]);
  });
});
