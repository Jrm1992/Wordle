import { createContext, ReactNode, useEffect, useState } from 'react';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [token, setToken] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '743890087555-slmaj0d0q5ksbnldp19t4rr3cdaljo1n.apps.googleusercontent.com',
    iosClientId:
      '743890087555-slmaj0d0q5ksbnldp19t4rr3cdaljo1n.apps.googleusercontent.com',
    expoClientId:
      '743890087555-slmaj0d0q5ksbnldp19t4rr3cdaljo1n.apps.googleusercontent.com'
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
      console.log(user);
    }
  }

  /*   async function signInWithGoogle(acess_token: string) {
    try {
      setIsUserLoading(true);

      const tokenResponse = await api.post('/users', { acess_token });
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await api.get('/me');

      setUser(userInfoResponse.data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }
 */
  useEffect(() => {
    if (response?.type === 'success') {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const user = await response.json();
      setUser(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
