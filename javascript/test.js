describe("pow", function() {

    it("возводит в степень n", function() {
      assert.equal(pow(2, 3), 8);
      assert.equal(pow(3, 3), 27);
    });
  
  });

  describe("pow", function() {

    it("2 в степени 3 будет 8", function() {
      assert.equal(pow(2, 3), 8);
    });
  
    it("3 в степени 3 будет 27", function() {
      assert.equal(pow(3, 3), 27);
    });
  
  });

  describe("pow", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} в степени 3 будет ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }
  
    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }
  
  });



  describe("pow", function() {

    describe("возводит x в степень 3", function() {
  
      function makeTest(x) {
        let expected = x * x * x;
        it(`${x} в степени 3 будет ${expected}`, function() {
          assert.equal(pow(x, 3), expected);
        });
      }
  
      for (let x = 1; x <= 5; x++) {
        makeTest(x);
      }
  
    });
  
    // ... другие тесты. Можно писать и describe, и it блоки.
  });

  describe("тест", function() {

    before(() => alert("Тестирование началось – перед тестами"));
    after(() => alert("Тестирование закончилось – после всех тестов"));
  
    beforeEach(() => alert("Перед тестом – начинаем выполнять тест"));
    afterEach(() => alert("После теста – заканчиваем выполнение теста"));
  
    it('тест 1', () => alert(1));
    it('тест 2', () => alert(2));
  
  });

  describe("pow", function() {

    // ...
  
    it("для отрицательных n возвращает NaN", function() {
      assert.isNaN(pow(2, -1));
    });
  
    it("для дробных n возвращает NaN", function() {
      assert.isNaN(pow(2, 1.5));
    });
  
  });

/*

Другие функции сравнения

Обратите внимание на assert.isNaN. Это проверка того, что переданное значение равно NaN.

Библиотека Chai содержит множество других подобных функций, например:

    assert.equal(value1, value2) – проверяет равенство value1 == value2.
    assert.strictEqual(value1, value2) – проверяет строгое равенство value1 === value2.
    assert.notEqual, assert.notStrictEqual – проверяет неравенство и строгое неравенство соответственно.
    assert.isTrue(value) – проверяет, что value === true
    assert.isFalse(value) – проверяет, что value === false
    …с полным списком можно ознакомиться в документации


*/