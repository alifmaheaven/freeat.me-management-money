var define = {
  encrypter(value) {
    return window.btoa(value);
  },
  decrypter(value) {
    return window.atob(value);
  },
};

export default define;
