import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { useEffect, useLayoutEffect, useState } from "react"
import { BrowserRouter } from 'react-router-dom';

import './styles/App.css';
import AppRouter from './components/AppRouter';
import AuthRouter from './components/AuthRouter';

// import {TokenContext} from './context/tokenContext';
import {AuthContext} from './context/authContext';
import { useAuth } from './hooks/useAuth';

import { Provider } from 'react-redux';
import {store, persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
	// const [isAuth, setIsAuth] = useState(false);
	// const [isLoading, setIsLoading] = useState(true);

	const [state, authContext] = useAuth();
	
	useEffect(() => {
        // if(localStorage.getItem('token')) {
        //     setIsAuth(true);
        // } 
		const token = localStorage.getItem('token')
		if(token) {
            authContext.signIn(token);
        } 
    }, [])

	return (
		// <Provider store={store}>
		// 	<PersistGate loading={null} persistor={persistor}>
		// 		<TokenContext.Provider value={{
		// 			isAuth,
		// 			setIsAuth: setIsAuth,
		// 			isLoading
		// 		}}>
		// 			<BrowserRouter>
		// 				<AppRouter></AppRouter>
		// 			</BrowserRouter>
		// 		</TokenContext.Provider>
		// 	</PersistGate>
		// </Provider>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AuthContext.Provider value={{state, authContext}}>
					<BrowserRouter>
						<AppRouter></AppRouter>
					</BrowserRouter>
				</AuthContext.Provider>
			</PersistGate>
		</Provider>
  	);
}

export default App;
