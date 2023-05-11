import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Form from "../../components/common/Form";
import { axiosOpen } from "../../services/api/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditProperty = () => {
  const { state } = useLocation();
  const { propertyDetails } = state; // Read values passed on state
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    formState: { isLoading, isSubmitting },
    register,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: propertyDetails,
  });
  const updatedFields = watch(); // Get the values of all watched fields

  const [propertyImage, setPropertyImage] = useState({
    name: propertyDetails.photo,
    url: "",
  });
  console.log(isSubmitting);

  // get url of uploaded image
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
  //  after submitting function
  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert("Please select an image");
    //only sending the fields which are updated
    const updatedData = Object.keys(data).reduce((acc: any, key) => {
      if (data[key] !== propertyDetails[key]) {
        acc[key] = data[key];
      }
      const { creator: undefined, ...others } = acc;
      return others;
    }, {});
    const propertyObject = {
      ...updatedData,
      photo: propertyImage.url ? propertyImage.url : undefined,
    };
    try {
      const response = await axiosOpen.patch(
        `/properties/${id}`,
        propertyObject
      );
      if (response.status === 200) {
        window.alert("property updated successfully");
        navigate(`/properties/view/${id}`);
      }
    } catch (error) {}
  };

  return (
    <Form
      type="Edit"
      register={register}
      formLoading={isSubmitting}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};
export default EditProperty;
