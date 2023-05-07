import { useState } from "react";

import { FieldValues, useForm } from "react-hook-form";

import Form from "../../components/common/Form";
import { useAuth } from "../../shared/hooks/useAuth";
import { axiosOpen } from "../../services/api/axios";

const CreateProperty = () => {
  // const { data: user } = useGetIdentity({
  //   v3LegacyAuthProviderCompatible: true,
  // });
  // const {}= useAuth();
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
    formState: { isLoading, isSubmitted },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({ name: file?.name, url: result })
    );
  };
  console.log(propertyImage);

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert("Please select an image");
    const propertyObject = {
      ...data,
      photo: propertyImage.url,
      email: "reshadsadik@gmail.com",
    };
    try {
      const response = await axiosOpen.post("properties", propertyObject);
      console.log(response);
    } catch (error) {}
  };

  return (
    <Form
      type="Create"
      register={register}
      onFinish={isSubmitted}
      formLoading={isLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};
export default CreateProperty;
