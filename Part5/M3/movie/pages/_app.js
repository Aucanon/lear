import { ChakraProvider, CSSReset } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
