const MAX_UID = 1000000;

class KeyGenerator {
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
const KeyGeneratorInstance = new KeyGenerator();

export default function generateKey(prefix, random) {
  if (random) {
    return KeyGeneratorInstance.random(prefix);
  }

  return KeyGeneratorInstance.generate(prefix);
}
