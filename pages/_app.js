
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react'
import { SaasProvider} from '@saas-ui/react'
import { extendTheme } from '@chakra-ui/react';


// Define your custom theme
const customTheme = extendTheme({
	components: {
	  Sidebar: {
		baseStyle: {
		  bg: '#1D2025', // Set the background color
		  borderColor: 'rgba(255,255,255,0.08)',
		  color: 'gray',
		  // Set other styles as needed
		},
	  },
	},
  });

function MyApp({ Component, pageProps }) {
	return (
		
			<ChakraProvider theme={customTheme}>
			<SaasProvider >
			<Component {...pageProps} />
			</SaasProvider>
			</ChakraProvider>
	);
}

export default MyApp;
