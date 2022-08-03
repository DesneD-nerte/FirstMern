import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { useEffect } from "react"
import { BrowserRouter } from 'react-router-dom';

import './styles/App.css';
import AppRouter from './router/AppRouter';

import {AuthContext} from './context/authContext';
import { useAuth } from './hooks/useAuth';

import { Provider } from 'react-redux';
import {store, persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const mediaQueryTheme = createTheme({
	components: {
		MuiUseMediaQuery: {
			defaultProps: {
				noSsr: true,
			},
		},
	},
});

function App() {

	const [state, authContext] = useAuth();
	
	useEffect(() => {
		const token = localStorage.getItem('token')
		if(token) {
            authContext.signIn(token);
        } 
    }, [])

	return (

		<ThemeProvider theme={mediaQueryTheme}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AuthContext.Provider value={{state, authContext}}>
						<BrowserRouter>
							<AppRouter></AppRouter>
						</BrowserRouter>
					</AuthContext.Provider>
				</PersistGate>
		</Provider>
		</ThemeProvider>
  	);
}

export default App;
