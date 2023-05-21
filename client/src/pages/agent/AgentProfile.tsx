import { useParams } from "react-router-dom";

import { Profile } from "../../components";
import { useEffect, useState } from "react";
import { axiosOpen } from "../../services/api/axios";
import { AgentCardProp } from "../../interfaces/agent";

const AgentProfile = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [agent, setAgent] = useState<AgentCardProp>({
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
      const response = await axiosOpen.get(`/users/${id}`);
      if (response.status == 200) {
        setAgent(response?.data?.agent);
        setLoading(false);
      }
    })();
  }, []);
  console.log(agent);

  return (
    <Profile
      loading={loading}
      type="Agent"
      role={agent?.role}
      name={agent?.name}
      email={agent.email}
      avatar={agent.avatar}
      reviews={agent?.reviews}
      properties={agent?.allProperties}
    />
  );
};

export default AgentProfile;
