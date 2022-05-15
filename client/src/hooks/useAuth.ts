import { useMemo, useReducer } from "react"

export const useAuth = () => {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'SIGN_IN':
                    localStorage.setItem('token', action.token)
                    return {
                        isAuth: true,
                        token: action.token
                    };
                
                case 'SIGN_OUT': 
                    localStorage.clear();
                    return {
                        isAuth: false,
                        token: null
                    };
            }
        }, 
        {
            isAuth: false,
            token: null
        }
    );

    const authContext = useMemo(() => ({
        signIn: (data) => {
            dispatch({ type: "SIGN_IN", token: data });
        },
        signOut: () => {
            dispatch({ type: "SIGN_OUT" })
        }
    }), [])

    return [state, authContext];
}