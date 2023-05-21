import { useEffect, useState } from "react";
import { axiosOpen } from "../services/api/axios";
import { AgentCardProp } from "../interfaces/agent.d";
import { useAuth } from "../shared/hooks/useAuth";
import MyProfileComponent from "../components/common/MyProfileComponent";

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const { userDetails } = useAuth();
  const [myDetails, setMyDetails] = useState<AgentCardProp>({
    name: "",
    email: "",
    avatar: "",
    role: "",
    reviews: [],
    allProperties: [],
  });
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axiosOpen.get(`/users/${userDetails?._id}`);
      if (response.status == 200) {
        setMyDetails(response?.data?.agent);
        setLoading(false);
      }
    })();
  }, []);
  console.log(userDetails);

  return (
    <MyProfileComponent
      loading={loading}
      type="Manager"
      name={myDetails?.name}
      role={myDetails?.role}
      email={myDetails.email}
      avatar={myDetails.avatar}
      reviews={myDetails?.reviews}
      properties={myDetails?.allProperties}
    />
  );
};

export default MyProfile;
