import * as yup from "yup";

const schemaLogin = yup.object({
    email: yup.string().email().required("Emailingni kiriting!"),
    password: yup.string().min(6,"Parol kamida 6 ta belgidan iborat bo'lishi kerak").required().transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        return originalValue.replace(/\s/g, ''); // Remove spaces from the original value
      }
      return value;
    }),
  });

  export default schemaLogin