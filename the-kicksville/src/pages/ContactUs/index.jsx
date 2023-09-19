import { useRef, useContext } from "react";
import emailjs from "@emailjs/browser";
import styles from "./ContactUs.module.css";
import { KicksContext } from "../../context/KicksContextProvider";
import CustomButton from "../../components/CustomButton";

// notifications
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// form validation
import { useFormik } from "formik";

const ContactUs = () => {
  const { input, emailService, serviceId, templateId } =
    useContext(KicksContext);
  const form = useRef();

  //email network processing with errors
  const sendEmail = () => {
    emailjs.sendForm(serviceId, templateId, form.current, emailService).then(
      (result) => {
        toast.success(
          <>
            Message Delivered
            <br />
          </>,
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            style: {
              backgroundColor: "black",
              color: "#08b50b",
            },
            progressStyle: {
              backgroundColor: "grey",
            },
          }
        );

        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
        toast.error(
          <>
            Message Not Sent
            <br />
          </>,
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            style: {
              backgroundColor: "black",
              color: "#fff",
            },
            progressStyle: {
              backgroundColor: "grey",
            },
          }
        );
      }
    );
  };

  // formik validation and errors
  const formik = useFormik({
    initialValues: {
      name: input.name,
      email: input.email,
      message: input.message,
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Invalid email format";
      }

      if (!values.message) {
        errors.message = "Message cannot be empty";
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      sendEmail(values);
      resetForm();
    },
  });

  return (
    <div className={styles.container}>
      <div>
        <ToastContainer />
        <form
          className={styles.formBox}
          ref={form}
          onSubmit={formik.handleSubmit}
        >
          <h1>Drop Us a Message</h1>

          <div className={styles.inputArea}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.name && formik.errors.name
                  ? styles.errorInput
                  : ""
              }
            />
            {formik.touched.name && formik.errors.name && (
              <p className={styles.error}>{formik.errors.name}</p>
            )}
          </div>

          <div className={styles.inputArea}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.email && formik.errors.email
                  ? styles.errorInput
                  : ""
              }
            />
            {formik.touched.email && formik.errors.email && (
              <p className={styles.error}>{formik.errors.email}</p>
            )}
          </div>

          <div className={styles.inputArea}>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.message && formik.errors.message
                  ? styles.errorTextArea
                  : ""
              }
            />
            {formik.touched.message && formik.errors.message && (
              <p className={styles.error}>{formik.errors.message}</p>
            )}
          </div>

          <CustomButton containerStyle={styles.button} buttonText={"Send"} />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
