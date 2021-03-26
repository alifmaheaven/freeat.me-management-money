import { configure, defineRule } from "vee-validate";
// import * as rules from "@vee-validate/rules";
// import { messages } from './message.json';
// import "./locales";
configure({
  classes: {
    valid: "is-valid",
    invalid: "is-invalid",
    changed: [""],
    touched: [""],
    untouched: [""],
    pristine: [""],
    dirty: [""],
    pending: [""],
    required: [""],
    validated: [""],
    passed: [""],
    failed: [""],
  },
  bails: true,
  skipOptional: true,
  mode: "aggressive",
  useConstraintAttrs: true,
  validateOnInput: true,
});

import { required, email, min } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);

defineRule("minLength", (value, [limit]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }

  if (value.length < limit) {
    return `This field must be at least ${limit} characters`;
  }

  return true;
});

defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }

  return target + " must match";
});

// extend('confimedPassword', {
//     validate(value, { confirmed }) {
//         return confirmed == '' || value == confirmed;
//     },
//     params: ['confirmed'],
//     message: 'Password not match'
// });

// // disabled space last and begining of word
// extend('noMoreSpace', {
//     validate(value) {
//         var whitespace = /^[^\s]+(\s+[^\s]+)*$/;
//         // var whitespace = /^\S((?!.*  ).*\S)?$/;
//         return whitespace.test(value);
//     },
//     message: 'The {_field_} field Not allowed space at begining and last word'
// });

// //disabled dot last word
// extend('noDotLastWord', {
//     validate(value) {
//         var Dot = /^(?![.])(?!.*[-_.]$).+/;
//         return Dot.test(value);
//     },
//     message: 'The {_field_} field Not allowed dot on begining and    last word'
// });

// // Register it globally
// Vue.component('ValidationProvider', ValidationProvider);
// Vue.component('ValidationObserver', ValidationObserver)
