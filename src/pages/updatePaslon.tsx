import { Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";

interface Titem {
  id: number;
}

interface Tparty {
  id: number;
  name: string;
  isChecked: boolean;
}

interface Tpaslon {
  name: string;
  visi: string;
  party: Tparty[];
}

export default function UpdatePaslon() {
  const [Paslon, setPaslon] = useState<Tpaslon[]>([]);
  const { id } = useParams();

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    if (e?.target.value) {
      setPaslon([{ ...Paslon[0], name: e.target.value }]);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const updatedData = { nama: Paslon[0].name };

    axios
      .patch(`http://localhost:5000/api/v1/paslon/${id}`, updatedData)
      .then((response) => {
        console.log("Data terkirim:", response.data);
        console.log(updatedData);
      })
      .catch((error) => {
        console.error("Gagal mengirim data:", error);
        if (error.response) {
          console.log("Respon kesalahan:", error.response.data);
        }
      });
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/paslons").then((res) => {
      const data = res.data.data.filter((item: Titem) => item.id === Number(id));
      setPaslon(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Box maxW="1365px" h="100vh"backgroundImage="linear-gradient(to top, #ffffff,  #b40804)" backgroundRepeat="no-repeat" m="0 auto" display="flex" alignItems="center">
        <Box width="40%" m="auto auto" bg="White" boxSizing="border-box" padding="10px" borderRadius="10px" border="2px solid  #b40905">
          <Heading textAlign="center" mb="1rem" size="lg">
            Update Paslon
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Nama Paslon</FormLabel>
              <Input type="text" value={Paslon.length > 0 ? Paslon[0].name : ""} onChange={handleChangeName} />
              <Box display="flex" justifyContent="end">
                <Button mt={4} colorScheme="teal" type="submit">
                  Submit
                </Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Box>
    </>
  );
}
