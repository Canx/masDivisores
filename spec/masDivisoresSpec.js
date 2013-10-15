var masDivisores = require('../src/masDivisores').masDivisores;

describe("masDivisores", function() {
  it("returns 1 with 1 divisor with max = 1", function() {
    var max = masDivisores(1);
    expect(max.numero).toEqual(1);
    expect(max.total).toEqual(1);
    expect(max.factores).toEqual([1]);
  });

  it("returns 6 with 4 divisors with max = 10", function() {
    var max = masDivisores(10);
    expect(max.numero).toEqual(6);
    expect(max.total).toEqual(4);
    expect(max.factores).toEqual([1,2,3,6]);
  });

  it("returns 60 with 12 divisors with max = 100", function() {
    var max = masDivisores(100);
    expect(max.numero).toEqual(60);
    expect(max.total).toEqual(12);
    expect(max.factores).toEqual([1,2,3,4,5,6,10,12,15,20,30,60]);
  });

  it("should calc max = 10000 in less than 2000 miliseconds", function() {
    var t_ini = (new Date).getTime();
    var max = masDivisores(10000);
    var t_fin = (new Date).getTime();
    var t = t_fin - t_ini;
    expect(t).toBeLessThan(2000);
  });
     
});
