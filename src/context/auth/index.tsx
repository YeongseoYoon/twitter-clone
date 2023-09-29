import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useReducer,
  useEffect,
  useContext,
} from "react";

type State = {
  user: any;
  isAuthenticated: boolean;
};

type Action = {
  type: string;
  payload: any;
};

export interface AuthContextType extends State {
  dispatch: React.Dispatch<Action>;
}

const AUTH = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  AUTH_IS_READY: "AUTH_IS_READY",
} as const;

type AUTH = (typeof AUTH)[keyof typeof AUTH];

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  dispatch: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: AUTH.AUTH_IS_READY, payload: user });
      unsubscribe();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case AUTH.LOGIN:
      return { ...state, user: action.payload };
    case AUTH.LOGOUT:
      return { ...state, user: null };
    case AUTH.AUTH_IS_READY:
      return { user: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};

const useAuthContext = (): AuthContextType => useContext(AuthContext);

export default useAuthContext;
