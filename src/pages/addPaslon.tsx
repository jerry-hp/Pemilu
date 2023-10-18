import { Box, Input, FormLabel, FormControl, Heading, Button, Checkbox, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useQuery } from "react-query";
import Navbar from "./navbar";

export default function AddPaslon() {
  const [newPaslon, setNewPaslon] = useState("");
  const [newVisi, setNewVisi] = useState("");
  const [selectedPartai, setSelectedPartai] = useState<number[]>([]);
  console.log(selectedPartai);

  function handlePaslon(e: ChangeEvent<HTMLInputElement>) {
    setNewPaslon(e.target.value);
  }
  function handleVisi(e: ChangeEvent<HTMLInputElement>) {
    setNewVisi(e.target.value);
  }

  function handleSelectedPartai(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedPartai([...selectedPartai, parseInt(e.target.value)]);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const kirimPaslon = {
      name: newPaslon,
      visi: newVisi,
      party: selectedPartai,
    };

    axios.post(" http://localhost:5000/api/v1/paslon", kirimPaslon);
    window.location.href = "/";
  }

  const { data: dataPartai, isLoading: partaiLoading } = useQuery("dataPartai", async () => {
    const res = await axios.get("http://localhost:5000/api/v1/parties");
    return res.data.data;
  });

  return (
    <>
      <Navbar />
      <Box maxW="1365px" h="100vh" backgroundImage="linear-gradient(to top, #ffffff,  #b40804)" backgroundRepeat="no-repeat" m="0 auto" display="flex" alignItems="center">
        <Box width="45%" m="auto auto" bg="White" boxSizing="border-box" padding="10px" borderRadius="10px" boxShadow="1px 1px 2px  #b40905">
          <Heading textAlign="center" mb="1rem" size="lg">
            Daftarkan Diri Anda
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Nama Paslon</FormLabel>
              <Input type="text" value={newPaslon} onChange={handlePaslon} />
              <FormLabel mt="10px">Visi</FormLabel>
              <Input type="text" value={newVisi} onChange={handleVisi} />
              <FormLabel mt="10px">Pilih partai</FormLabel>
              <Box display="flex" gap="20px">
                {partaiLoading ? ( // Cek apakah data sedang dimuat
                  <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" m="2rem auto" />
                ) : (
                  dataPartai &&
                  dataPartai.map((item: any, k: number) => (
                    <Checkbox key={k} value={item.id} onChange={handleSelectedPartai}>
                      {item.name}
                    </Checkbox>
                  ))
                )}
              </Box>

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
