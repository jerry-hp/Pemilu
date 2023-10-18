import { Box, Image, Heading, Text } from "@chakra-ui/react";
import Navbar from "./navbar";
import soekarno from "../assets/soekarno.png";

export default function Profil() {
  return (
    <>
      <Navbar />
      <Box maxW="1366px" boxSizing="border-box" p=".5rem  20px" backgroundImage="linear-gradient(to top, #ffffff,  #b40804)" display="flex">
        <Box w="40%" bg="#b40905" m=" auto" boxSizing="border-box" padding="20px" borderRadius="20px" mt="2rem" boxShadow="0 0px 2px  white">
          <Image src={soekarno} w="50%" m="0 auto" borderRadius="50%" bg="white" mb="10px" />
          <hr />
          <Heading textAlign={"center"} color="white">
            THIS IS SOEKARNO
          </Heading>
          <Text color="white" fontSize="large">
            Email
          </Text>
          <Text color="white" fontSize="sm">
            seokarno17@gmail.com
          </Text>
          <Text color="white" fontSize="large">
            No. Hp
          </Text>
          <Text color="white" fontSize="sm">
            +62 81218634019
          </Text>
          <Text color="white" fontSize="large">
            Asal
          </Text>
          <Text color="white" fontSize="sm">
            Payakumbuh
          </Text>
          <Text color="white" fontSize="large">
            Cita-cita
          </Text>
          <Text color="white" fontSize="sm">
            Merdeka
          </Text>
        </Box>
      </Box>
    </>
  );
}
