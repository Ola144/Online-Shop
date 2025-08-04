/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import { databases, storage } from "../../appwrite/appwrite";
import { ID } from "appwrite";
import { toast } from "react-toastify";
import { useState } from "react";

interface IReview {
  fullName: string;
  review: string;
  userImg: any;
  plainReview: string;
}

const ReviewForm = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IReview>({
    defaultValues: {
      fullName: "",
      review: "",
      userImg: "",
      plainReview: "",
    },
  });

  const [imageFile, setImageFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (reviewData: IReview) => {
    setLoading(true);

    try {
      if (!imageFile) {
        toast.error("No File Selected!");
        return;
      }

      const imgResponse: any = await storage.createFile(
        "688e2648002496ef4938", // Storage Bucket ID
        ID.unique(),
        imageFile
      );

      const imgUrl = storage.getFileView(
        "688e2648002496ef4938",
        imgResponse.$id
      );
      await databases.createDocument(
        "688e272a003b99b5dc39", // Database Id
        "688e2a0e001606ab412e", // Collection ID
        ID.unique(),
        {
          ...reviewData,
          userImg: imgUrl,
        }
      );
      toast.success("Review Sent Successfully!");
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full lg:w-96 contactForm md:mr-5">
      <h1 className="text-2xl font-mono mb-3 font-bold">
        WE LOVE TO HEAR FROM YOU
      </h1>
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
              htmlFor="userImg"
              className="text-lg font-bold text-gray-500 mb-1"
            >
              Your Image
            </label>
            <input
              type="file"
              id="userImg"
              onChange={(e: any) => {
                setImageFile(e.target.files[0]);
              }}
              className="border-2 border-gray-500 rounded-lg outline-none w-full py-2 px-3"
              placeholder="Your Image"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="review"
              className="text-lg font-bold text-gray-500 mb-1"
            >
              Review
            </label>
            <Controller
              name="review"
              control={control}
              rules={{ required: "Review is a required field!" }}
              render={({ field, fieldState }) => (
                <>
                  <ReactQuill
                    theme="snow"
                    id="review"
                    className=" md:w-full w-full"
                    value={field.value}
                    onChange={(content, _delta, _source, editor) => {
                      field.onChange(content);
                      setValue("plainReview", editor.getText());
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
              className={
                loading
                  ? "w-full bg-gray-400 hover:bg-gray-400 text-white py-3 rounded-lg cursor-no-drop"
                  : "w-full bg-gray-500 hover:bg-gray-400 text-white py-3 rounded-lg"
              }
              type="submit"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
