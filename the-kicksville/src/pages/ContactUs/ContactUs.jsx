// import { useState } from "react";
// import emailjs from "@emailjs/browser";
// import styles from "./ContactUs.module.css";

// const ContactUs = () => {

//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   console.log(values);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     emailjs
//       .send("service_lyoq3gd", "template_4dscc91", values, "4a4lIwY4y77e2eMDK")
//       .then(
//         (response) => {
//           console.log("success", response);
//         },
//         (error) => {
//           console.log("failed", error);
//         }
//       );
//   };

//   const handleInput = (e) => {
//     setValues((values) => ({
//       ...values,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   return (
//     <div className={styles.container}>
//       <div className={styles.formBox}>
//         <form onSubmit={handleSubmit} action="">
//           <label htmlFor="">Your Name</label>
//           <input onInput={handleInput} type="text" name="name" />
//           <label htmlFor="">Your Email</label>
//           <input onInput={handleInput} type="email" name="email" id="" />
//           <label htmlFor="">Your Message</label>
//           <input onInput={handleInput} type="text" name="message" id="" />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
  const form = useRef();
  // const [values, setValues] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });
  // console.log(values);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   emailjs
  //     .send("service_lyoq3gd", "template_4dscc91", values, "4a4lIwY4y77e2eMDK")
  //     .then(
  //       (response) => {
  //         console.log("success", response);
  //       },
  //       (error) => {
  //         console.log("failed", error);
  //       }
  //     );
  // };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_lyoq3gd",
        "template_4dscc91",
        form.current,
        "4a4lIwY4y77e2eMDK"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  // const handleInput = (e) => {
  //   setValues((values) => ({
  //     ...values,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        {/* <form onSubmit={handleSubmit} action="">
          <label htmlFor="">Your Name</label>
          <input onInput={handleInput} type="text" name="name" />
          <label htmlFor="">Your Email</label>
          <input onInput={handleInput} type="email" name="email" id="" />
          <label htmlFor="">Your Message</label>
          <input onInput={handleInput} type="text" name="message" id="" />
          <button type="submit">Send</button>
        </form> */}
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="name" />
          <label>Email</label>
          <input type="email" name="email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

// import React, { useRef } from "react";
// import emailjs from "@emailjs/browser";

// export const ContactUs = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm(
//         "YOUR_SERVICE_ID",
//         "YOUR_TEMPLATE_ID",
//         form.current,
//         "YOUR_PUBLIC_KEY"
//       )
//       .then(
//         (result) => {
//           console.log(result.text);
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );
//   };

//   return (
//     <form ref={form} onSubmit={sendEmail}>
//       <label>Name</label>
//       <input type="text" name="user_name" />
//       <label>Email</label>
//       <input type="email" name="user_email" />
//       <label>Message</label>
//       <textarea name="message" />
//       <input type="submit" value="Send" />
//     </form>
//   );
// };
