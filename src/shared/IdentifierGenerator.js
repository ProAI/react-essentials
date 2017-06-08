const MAX_UID = 1000000;

class IdentifierGenerator {
  counter = 0;

  generate = (prefix) => {
    this.counter = this.counter + 1;

    return `${prefix}${this.counter}`;
  };

  random = (prefix) => {
    let uid = prefix;
    do {
      // eslint-disable-next-line no-bitwise
      uid += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
    } while (document.getElementById(uid));
    return uid;
  };
}

// singleton
const IdentifierGeneratorInstance = new IdentifierGenerator();

export default IdentifierGeneratorInstance;
