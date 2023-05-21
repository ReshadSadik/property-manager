import { Box, Typography } from "@mui/material";

import { AgentCard } from "../../components";
import { useEffect, useMemo, useState } from "react";
import { axiosSecure } from "../../services/api/axios";
import { AgentCardProp } from "../../interfaces/agent";

const Agents = () => {
  const [loading, setLoading] = useState(true);

  const [agents, setAgents] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get("/users");
        if (response.status == 401) {
          window.alert("you are not authorized");
        }
        if (response.status == 200) {
          setAgents(response?.data.agents);
          setLoading(false);
        }
      } catch (error: any) {
        window.alert(error.response.data.message);
      }
    })();
  }, []);
  const memoizedAgents = useMemo(() => agents, [agents]);

  return (
    <Box>
      <Typography variant="h1">Agents List</Typography>

      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: 4,
          borderRadius: "10px",
          backgroundColor: "#fcfcfc",
        }}
      >
        {memoizedAgents.map((agent: AgentCardProp) => (
          <AgentCard
            key={agent._id}
            _id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            role={agent.role}
            reviews={agent.reviews}
            allProperties={agent.allProperties}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agents;
