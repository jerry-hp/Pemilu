import { Box, Input, FormLabel, Heading, Button } from "@chakra-ui/react";
import Navbar from "./navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <Box maxW="1365px" h="100vh" backgroundImage="linear-gradient(to top, #ffffff,  #b40804)" backgroundRepeat="no-repeat" m="0 auto" display="flex" alignItems="center">
        <Box width="30%" m="auto auto" bg="White" boxSizing="border-box" padding="10px" borderRadius="10px" border="2px solid #b40905">
          <Heading textAlign="center" mb="1rem" size="lg">
            Login Peserta Pemilu
          </Heading>
          <form>
            <FormLabel>User Name</FormLabel>
            <Input type="text" />
            <FormLabel>Password</FormLabel>
            <Input type="password" />
            <Box display="flex" justifyContent="end">
              <Button mt={4} backgroundColor="#b40804" color="white" variant="unstyled" p="0 10px" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
