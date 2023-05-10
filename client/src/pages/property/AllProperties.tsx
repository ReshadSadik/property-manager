import { Add } from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { PropertyCard, CustomButton } from "../../components";
import { axiosOpen } from "../../services/api/axios";
import { PropertyCardProps } from "../../interfaces/property";

const AllProperties = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState({
    total: 0,
    page: 0,
    allProperties: [],
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPages(value);
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axiosOpen.get(`/properties?page=${pages}`);
      if (response.status == 200) {
        setProperties(response?.data?.data);
        setLoading(false);
      }
    })();
  }, [pages]);
  const memoizedProperties = useMemo(() => properties, [properties]);

  // const allProperties = data?.data ?? [];

  // const currentPrice = sorter.find((item) => item.field === "price")?.order;

  // const toggleSort = (field: string) => {
  //     setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  // };

  // const currentFilterValues = useMemo(() => {
  //     const logicalFilters = filters.flatMap((item) =>
  //         "field" in item ? item : [],
  //     );

  //     return {
  //         title:
  //             logicalFilters.find((item) => item.field === "title")?.value ||
  //             "",
  //         propertyType:
  //             logicalFilters.find((item) => item.field === "propertyType")
  //                 ?.value || "",
  //     };
  // }, [filters]);

  // if (isLoading) return <Typography>Loading...</Typography>;
  // if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography variant="h1">Property List</Typography>
        <CustomButton
          title="Add Property"
          handleClick={() => navigate("/properties/create")}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />

        {/* <Box
          mb={2}
          mt={3}
          display="flex"
          width="84%"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            mb={{ xs: "20px", sm: 0 }}
          > */}
        {/* <CustomButton
                                title={`Sort price ${
                                    currentPrice === "asc" ? "↑" : "↓"
                                }`}
                                handleClick={() => toggleSort("price")}
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                            /> */}
        {/* <TextField
                                variant="outlined"
                                color="info"
                                placeholder="Search by title"
                                value={currentFilterValues.title}
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "title",
                                            operator: "contains",
                                            value: e.currentTarget.value
                                                ? e.currentTarget.value
                                                : undefined,
                                        },
                                    ]);
                                }}
                            />
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                value={currentFilterValues.propertyType}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "propertyType",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace",
                                    );
                                }}
                            >
                                <MenuItem value="">All</MenuItem>
                                {[
                                    "Apartment",
                                    "Villa",
                                    "Farmhouse",
                                    "Condos",
                                    "Townhouse",
                                    "Duplex",
                                    "Studio",
                                    "Chalet",
                                ].map((type) => (
                                    <MenuItem
                                        key={type}
                                        value={type.toLowerCase()}
                                    >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select> */}
        {/* </Box>
        </Box> */}
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      ></Stack>
      <Box>
        <Box
          mt="20px"
          sx={{
            backgroundColor: "#fcfcfc",
            height: "auto",
            borderRadius: "15px",
            padding: "10px",
            display: "grid",
            gridGap: "10px",
            gridTemplateColumns: {
              md: "repeat(2, 1fr)",
              xs: "repeat(1, 1fr)",
            },
          }}
        >
          {(loading
            ? Array.from(new Array(4))
            : memoizedProperties.allProperties
          ).map((property: PropertyCardProps) => (
            <PropertyCard
              key={property?._id}
              _id={property?._id}
              title={property?.title}
              location={property?.location}
              price={property?.price}
              photo={property?.photo}
              loading={loading}
            />
          ))}
        </Box>
      </Box>

      {/* pagination here */}
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginTop={2}
      >
        <Typography variant="body2">
          Showing {memoizedProperties.allProperties?.length} of{" "}
          {memoizedProperties.total} Properties
        </Typography>
        <Pagination
          shape="rounded"
          color="primary"
          count={Math.ceil(memoizedProperties.total / 4)}
          page={pages}
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
};

export default AllProperties;
