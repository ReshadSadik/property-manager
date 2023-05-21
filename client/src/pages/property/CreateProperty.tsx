import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Form from "../../components/common/PropertyForm";
import { useAuth } from "../../shared/hooks/useAuth";
import { axiosOpen } from "../../services/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateProperty = () => {
  const navigate = useNavigate();
  const { userDetails } = useAuth();

  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
    formState: { isSubmitting },
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

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name)
      toast.error("Please select an image", {
        position: "bottom-right",
      });
    const propertyObject = {
      ...data,
      photo: propertyImage.url,
      email: userDetails?.email,
    };
    try {
      const response = await axiosOpen.post("properties", propertyObject);
      if (response.status === 200) {
        window.alert("property created successfully");
        navigate("/properties");
      }
    } catch (error) {}
  };

  return (
    <Form
      type="Create"
      register={register}
      formLoading={isSubmitting}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};
export default CreateProperty;
