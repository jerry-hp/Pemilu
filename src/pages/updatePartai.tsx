import { Box, Input, FormLabel, FormControl, Heading, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";

interface Party {
  id: number;
}

export default function UpdatePartai() {
  const [newPartai, setNewPartai] = useState("");
  console.log(newPartai);

  const { id } = useParams();

  function handlePartai(e: ChangeEvent<HTMLInputElement>) {
    setNewPartai(e.target.value);
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const kirimPartai = {
      name: newPartai,
    };

    axios.patch(`http://localhost:5000/api/v1/party/${id}`, kirimPartai).then((response) => {
      console.log("Berhasil mengirim data:", response.data);
    });

    window.location.href = "/";
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/parties").then((res) => {
      const hasil = res.data.data.filter((item: Party) => item.id == Number(id));
      setNewPartai(hasil[0].name);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Box maxW="1365px" h="100vh" backgroundImage="linear-gradient(to top, #ffffff,  #b40804)" backgroundRepeat="no-repeat" m="0 auto" display="flex" alignItems="center">
        <Box width="30%" m="auto auto" bg="White" boxSizing="border-box" padding="10px" borderRadius="10px" boxShadow="1px 1px 2px  #b40905">
          <Heading textAlign="center" mb="1rem" size="lg">
            Update Partai
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Nama Partai</FormLabel>
              <Input type="text" value={newPartai} onChange={handlePartai} />
              <Box display="flex" justifyContent="end">
                <Button mt={4} backgroundColor="#b40804" color="white" variant="unstyled" p="0 10px" type="submit">
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
