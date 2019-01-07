
/**
 * Classes and Inheritance
 */
class Polygon {
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }

  sayName() {
    console.log('Hi, I am a', this.name + '.');
  }
}

class Square extends Polygon {
  constructor(length=10) {
    super(length, length);
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }
}
