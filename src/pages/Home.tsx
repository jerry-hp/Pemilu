import { Box, Heading, Card, CardBody, Image, Text, Input, Radio, FormControl, Button, Avatar, IconButton, Spinner } from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChangeEvent, useState } from "react";
import vr from "../assets/verified.png";
import axios from "axios";
import Navbar from "./navbar";
import { useQuery, useMutation } from "react-query";

type MutationResponse = {
  success: boolean;
  message: string;
};

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [namaCobloser, setNamaCobloser] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  console.log(namaCobloser);

  const {
    data: paslones,
    isLoading,
    isError,
  } = useQuery("paslones", async () => {
    const response = await axios.get("http://localhost:5000/api/v1/paslons");
    return response.data.data;
  });

  const { data: votes, refetch: refetchVotes } = useQuery("votes", async () => {
    const res = await axios.get("http://localhost:5000/api/v1/votes");
    return res.data.data;
  });
  const voteMutation = useMutation<MutationResponse, any, { voter_name: string; paslon_id: number | null }>(
    (kirimData) => {
      return axios.post("http://localhost:5000/api/v1/vote", kirimData);
    },
    {
      onSuccess: () => {
        refetchVotes();
      },
    }
  );

  function onOpen() {
    !isOpen && setIsOpen(true);
  }

  function onClose() {
    isOpen && setIsOpen(false);
    const kirimData = {
      voter_name: namaCobloser,
      paslon_id: selected,
    };
    voteMutation.mutate(kirimData);
  }

  function handleCobloser(e: ChangeEvent<HTMLInputElement>) {
    setNamaCobloser(e.target.value);
  }
  function handleCoblos(value: number) {
    setSelected(value);
    console.log(value);
  }

  return (
    <>
      <Navbar />
      <Box
        maxW="1365px"
        boxSizing="border-box"
        p=".5rem  20px"
        gridGap=".5rem"
        display="grid"
        gridTemplateAreas="' banner banner'' suara absen' ' coblos coblos'"
        gridTemplateColumns=" 2fr 1fr"
        gridTemplateRows=" max-content max-content max-content "
        backgroundImage="linear-gradient(to top, #ffffff,  #b40804)"
        backgroundRepeat="no-repeat"
        h="115vh"
      >
        {/* banner */}
        <Box gridArea="banner" borderRadius="20px" boxSizing="border-box" p="10px 20px" display="flex" gap="1rem">
          {isLoading ? ( // Cek apakah data sedang dimuat
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" m="2rem auto" />
          ) : isError ? ( // Cek apakah terjadi error dalam pengambilan data
            <div>Error fetching data</div>
          ) : (
            paslones &&
            paslones.map((item: any, k: any) => (
              <Card key={k} w="25%" m="0 auto">
                <CardBody>
                  <Box textAlign="center" display="flex" alignItems="center" gap="5px" mb="5px" boxSizing="border-box">
                    <Avatar src="https://i.pinimg.com/236x/67/22/0b/67220b7eb01a278382a39f9895880e9f.jpg" />
                    <Heading size="18px">{item.name}</Heading>
                    <Image src={vr} w="20px" h="20px" mr="auto" />
                    <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<BsThreeDotsVertical />} />
                  </Box>
                  <Image src="https://cdn.pixabay.com/photo/2012/04/15/18/49/flag-34884_1280.png" alt="" borderRadius="lg" w="100%" h="150px" />
                  <Box display="flex">
                    <Button flex="1" variant="unstyled" leftIcon={<BiLike />}>
                      Like
                    </Button>
                    <Button flex="1" variant="unstyled" leftIcon={<BiChat />}>
                      Comment
                    </Button>
                    <Button flex="1" variant="unstyled" leftIcon={<BiShare />}>
                      Share
                    </Button>
                  </Box>
                  <Text display="flex" gap="4px" fontSize="small">
                    Diusung oleh
                    <Box fontWeight="Bold">
                      {item.party[0].name} {item.party[1] && <span> dan {item.party[1].name}</span>}
                    </Box>
                  </Text>
                  <Text>
                    <span style={{ fontWeight: "bold", marginRight: "5px" }}>{item.name}</span>
                    {item.visi}
                  </Text>
                </CardBody>
              </Card>
            ))
          )}
        </Box>
        {/* SUARA KANDIDAT */}
        <Box gridArea="suara" borderRadius="20px" boxSizing="border-box" p="5px 20px" border="2px solid #b40804">
          <Heading fontSize="20px" textAlign="center" mb="10px">
            SUARA SAAT INI
          </Heading>
          <Box display="flex">
            {paslones &&
              paslones.map((item: any, k: any) => (
                <Box key={k} m="0 auto">
                  <Heading fontSize="18px" textAlign="center">
                    {item.name}
                  </Heading>
                  <Heading textAlign="center" color="#b40804">
                    {votes && votes.filter((vote: any) => vote.paslon.id === item.id).length} Suara
                  </Heading>
                </Box>
              ))}
          </Box>
        </Box>
        {/* pendaftaran pencoblosan */}
        <Box gridArea="absen" borderRadius="20px" boxSizing="border-box" border="2px solid #b40804">
          <FormControl w="auto" display="flex" flexDirection="column" p="5px 20px">
            <Heading textAlign="center" fontSize="18px" mb="10px">
              Daftar Untuk Mencoblos
            </Heading>
            <Input placeholder="isi nama anda disini" bg="white" mb="10px" onChange={handleCobloser} />
            <Button backgroundColor="#b40804" color="white" variant="unstyled" onClick={onOpen}>
              SUBMIT
            </Button>
          </FormControl>
        </Box>
        {/* Tempat Pencoblosan */}
        {isOpen && (
          <Box
            gridArea="coblos"
            boxSizing="border-box"
            display="grid"
            gridTemplateAreas="'h' 'm''b'"
            gridTemplateColumns="1fr"
            gridTemplateRows="max-content max-content max-content"
            gap="auto"
            borderRadius="20px"
            p=".5rem 2rem"
            gridGap=".3rem"
            border="2px solid #b40804"
          >
            <Box gridArea="m" display="flex">
              {paslones.map((item: any) => (
                <FormControl w="auto" display="flex" flexDirection="column" p="5px 20px" m="0 auto">
                  <Heading textAlign="center" fontSize="25px" mb="10px">
                    {item.name}
                  </Heading>
                  <Radio bg="white" mb="10px" value={String(item.id)} isChecked={selected === item.id} onChange={() => handleCoblos(item.id)}>
                    Pilih {item.name}
                  </Radio>
                </FormControl>
              ))}
            </Box>
            <Button backgroundColor="#b40804" color="white" variant="unstyled" gridArea="b" w="40%" m="auto" onClick={onClose}>
              COBLOS
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Home;
