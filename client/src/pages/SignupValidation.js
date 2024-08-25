import * as Yup from "yup";

export const signupValidation = Yup.object({
  firstname: Yup.string().min(2).required("Please Enter First Name"),
  lastname: Yup.string().min(2).required("Please Enter Last Name"),
  department: Yup.string().required("Please Select Your Course"),
  email: Yup.string()
    .email("Please enter Valid Email")
    .required("PLease Email"),
  password: Yup.string().min(5).required("Please Enter Password"),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password Not Matched"
  ),
});
