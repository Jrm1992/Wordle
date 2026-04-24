export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      signIn: undefined;
      signUp: undefined;
      forgotPassword: undefined;
      checkEmail: { email?: string } | undefined;
      resetPassword: undefined;
      home: undefined;
      postgame: { status: 'tryagain' | 'youwin' };
    }
  }
}
