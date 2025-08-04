import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import { useDispatch } from "react-redux";
import { sendContact } from "../../store/contact-slice";

interface IContact {
  fullName: string;
  emailId: string;
  subject: string;
  message: string;
  plainMessage: string;
}

const ContactForm = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IContact>({
    defaultValues: {
      fullName: "",
      emailId: "",
      subject: "",
      message: "",
      plainMessage: "",
    },
  });
  const dispatch = useDispatch<any>();

  const submit = (contactData: IContact) => {
    dispatch(sendContact(contactData));
  };

  return (
    <div className="w-full lg:w-96 contactForm md:mr-5">
      <h1 className="text-3xl font-mono mb-3 font-bold">CONTACT US</h1>
      <hr className="bg-gray-400 w-12 h-1" />
      <div className="my-5">
        <form onSubmit={handleSubmit(submit)}>
          <div className="my-2">
            <label
              htmlFor="fullName"
              className="text-lg font-bold text-gray-500 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="border-2 border-gray-500 rounded-lg outline-none w-full py-2 px-3"
              placeholder="Full Name"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                Full name is a required field!
              </span>
            )}
          </div>
          <div className="my-2">
            <label
              htmlFor="emailId"
              className="text-lg font-bold text-gray-500 mb-1"
            >
              Email
            </label>
            <Controller
              name="emailId"
              rules={{
                required: "Email is a required field!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "*Please provide a valid email address!",
                },
              }}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input
                    type="email"
                    id="emailId"
                    value={field.value}
                    onChange={field.onChange}
                    className="border-2 border-gray-500 rounded-lg outline-none w-full py-2 px-3"
                    placeholder="Email"
                  />
                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="subject"
              className="text-lg font-bold text-gray-500 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="border-2 border-gray-500 rounded-lg outline-none w-full py-2 px-3"
              placeholder="Subject"
              {...register("subject", { required: true })}
            />
            {errors.subject && (
              <span className="text-red-500 text-sm">
                Subject is a required field!
              </span>
            )}
          </div>
          <div className="my-2">
            <label
              htmlFor="message"
              className="text-lg font-bold text-gray-500 mb-1"
            >
              Message
            </label>
            <Controller
              name="message"
              control={control}
              rules={{ required: "Message is a required field!" }}
              render={({ field, fieldState }) => (
                <>
                  <ReactQuill
                    theme="snow"
                    id="message"
                    className=" md:w-full w-full"
                    value={field.value}
                    onChange={(content, delta, source, editor) => {
                      field.onChange(content);
                      setValue("plainMessage", editor.getText());
                    }}
                  />

                  {fieldState.error && (
                    <span className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="">
            <button
              className="w-full bg-gray-500 hover:bg-gray-400 text-white py-3 rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
