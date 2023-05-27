import * as yup from "yup";

const schema = yup.object({
    first_name: yup.string().required("Ismingizni kiriting!"),
    last_name: yup.string().required("Familiyangizni kiriting!"),
    email: yup.string().email().required("Emailingni kiriting!"),
    phone: yup.string().required("Telefon raqamingizni kiriting!"),
    birthday: yup.string().required("Tug'ilgan sanani tanlang!"),
    gender: yup.string().required("Jinsingizni tanlang!"),
    city_id: yup.number().required().typeError("Shaxarni tanlang!"),
    password: yup.string().min(6,"Parol kamida 6 ta belgidan iborat bo'lishi kerak").required().transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        return originalValue.replace(/\s/g, ''); // Remove spaces from the original value
      }
      return value;
    }),
    checkPassword: yup.string().required("Pasportni tastiqlang!").oneOf([yup.ref("password")],
      "Parollar mos kelmadi!").transform((value, originalValue) => {
        if (typeof originalValue === 'string') {
          return originalValue.replace(/\s/g, ''); // Remove spaces from the original value
        }
        return value;
      }),
  });

  export default schema