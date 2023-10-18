import { Box, Image, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFile, faPlus, faUser, faCashRegister, faHome, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import gg from "../assets/1.png";

export default function Navbar() {
  const [rightNav, setRightNav] = useState(false);

  const handleRightNav = () => {
    setRightNav(true);
  };
  const handleCloseNav = () => {
    setRightNav(false);
  };
  function handleUpdatePartai() {
    const getId = prompt("Berapa id partai yang mau di update namanya?");
    if (getId) {
      window.location.href = `/updatePartai/${getId}`;
    }
  }

  return (
    <>
      <Box maxW="1366px" bg="#b40804" m="0 auto" boxSizing="border-box" p="0 20px" display="flex" justifyContent="space-between" position="sticky" top="0" zIndex="8">
        <Image src={gg} w="70px" />
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Pemilih Berdaulat Negara Kuat
        </Text>
        <Box display="flex" alignItems="center" gap="1rem">
          <Button variant="unstyled" onClick={handleRightNav}>
            <FontAwesomeIcon icon={faBars} color="white" size="2xl" />
          </Button>
          {rightNav && (
            <div>
              <div
                className="overlay"
                onClick={handleCloseNav}
                style={{ position: "fixed", cursor: "pointer", top: 0, left: 0, width: "100%", height: "100%", zIndex: "9", backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(.7px)" }}
              />
              <Box w="20%" bg="#b40804" h="100vh" boxSizing="border-box" padding="10px" position="fixed" top="0" right="0" zIndex="9" display="flex" flexDirection="column">
                <Link to="/">
                  <Box cursor="pointer" display="flex" justifyContent="space-between" alignItems="center" color="white" _hover={{ borderBottom: "2px solid White" }}>
                    Home
                    <FontAwesomeIcon icon={faHome} color="white" />
                  </Box>
                </Link>
                <Link to="/profil">
                  <Box cursor="pointer" display="flex" justifyContent="space-between" alignItems="center" color="white" mt="10px" _hover={{ borderBottom: "2px solid White" }}>
                    Profil
                    <FontAwesomeIcon icon={faUser} color="white" />
                  </Box>
                </Link>

                <Link to="/addPaslon">
                  <Box cursor="pointer" display="flex" justifyContent="space-between" alignItems="center" color="white" mt="10px" _hover={{ borderBottom: "2px solid White" }}>
                    Pendaftaran Paslon Baru <FontAwesomeIcon icon={faFile} color="white" />
                  </Box>
                </Link>
                <Link to="/addPartai">
                  <Box cursor="pointer" display="flex" justifyContent="space-between" alignItems="center" color="white" mt="10px" _hover={{ borderBottom: "2px solid White" }}>
                    Pendaftaran Partai Baru <FontAwesomeIcon icon={faPlus} color="white" />
                  </Box>
                </Link>
                <Button color="white" variant="unstyled" p="0" m="0" borderRadius="none" fontWeight={"normal"} onClick={handleUpdatePartai} w="100%" display="flex" justifyContent="space-between" _hover={{ borderBottom: "2px solid White" }}>
                  Ubah Nama Partai
                  <FontAwesomeIcon icon={faCashRegister} color="white" />
                </Button>
                <Link to="/Login">
                  <Box cursor="pointer" display="flex" justifyContent="space-between" alignItems="center" color="white" _hover={{ borderBottom: "2px solid White" }}>
                    Logout
                    <FontAwesomeIcon icon={faRightToBracket} color="white" />
                  </Box>
                </Link>
              </Box>{" "}
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}
