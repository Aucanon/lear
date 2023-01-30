import { Box, Button, Container, Image } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { FaSignInAlt, FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const logo = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
`;

const SignInAndJoin = styled.div`
  height: 52px;
  line-height: 52px;
  border-left: 1px solid #393939;
  border-right: 1px solid #393939;
  padding: 0 6px;
  float: left;
  color: #fff;
  & > button {
    padding: 0 10px;
    font-size: 12px;
  }
  & > button:nth-of-type(1):after {
    content: "";
    width: 1px;
    height: 10px;
    background: #fff;
    position: absolute;
    right: 0;
    top: 21px;
  }
`;

const Search = styled.a`
  float: right;
  height: 52px;
  border-left: 1px solid #393939;
  border-right: 1px solid #393939;
  color: #fff;
  font-size: 20px;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;

export default function Header () {
  return <Box  h='52px' bgColor="#202020" borderBottom="1px solid #393939">
    <Container h= '52px' maxW={1200} pos='relative'>
      <SignInAndJoin>
        <Button leftIcon={<FaSignInAlt/>}>登录</Button>
        <Button leftIcon={<BsFillPersonFill/>}>注册</Button>
      </SignInAndJoin>
      <Image css={logo} src="/images/logo.png"/>
      <Search>
        <FaSearch/>
      </Search>
    </Container>
  </Box>
}