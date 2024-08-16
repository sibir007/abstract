function Calc() {
    this.a;
    this.b;
    this.read = function() {
        this.a = +prompt('enter a:')
        this.b = +prompt('enter b:')
    }
    
    this.sum = function() {
        return this.a + this.b
    }


}