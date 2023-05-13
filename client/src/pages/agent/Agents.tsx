import { Box, Typography } from "@mui/material";

import { AgentCard } from "../../components";
import { useEffect, useMemo, useState } from "react";
import { axiosOpen } from "../../services/api/axios";

const Agents = () => {
  const [loading, setLoading] = useState(true);

  const [agents, setAgents] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axiosOpen.get("/users");
      if (response.status == 200) {
        setAgents(response?.data.agents);
        setLoading(false);
      }
    })();
  }, []);
  const memoizedAgents = useMemo(() => agents, [agents]);

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Agents List
      </Typography>

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
        {memoizedAgents.map((agent: any) => (
          <AgentCard
            key={agent._id}
            _id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            role={agent.role}
            allProperties={agent.allProperties}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agents;
