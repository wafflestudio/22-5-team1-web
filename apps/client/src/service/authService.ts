import type { ServiceResponse } from '@/entities/response';
import type { User } from '@/entities/user';
import type { Apis } from '@/shared/api';
import type { TokenLocalStorage } from '@/shared/token/localstorage';
import type { TokenState } from '@/shared/token/state';

export type AuthService = {
  localSignUp({
    username,
    localId,
    password,
    snuMail,
  }: {
    username: string;
    snuMail: string;
    localId: string;
    password: string;
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
  localSignIn({
    localId,
    password,
  }: {
    localId: string;
    password: string;
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
  checkGoogleEmail({
    token,
  }: {
    token: string;
  }): ServiceResponse<{ googleEmail: string }>;
  googleSignUp({
    snuMail,
    googleAccessToken,
  }: {
    snuMail: string;
    googleAccessToken: string;
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
  googleSignIn({
    googleAccessToken,
  }: {
    googleAccessToken: string;
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
  sendEmailCode({ snuMail }: { snuMail: string }): ServiceResponse<void>;
  verifyCode({
    snuMail,
    code,
  }: {
    snuMail: string;
    code: string;
  }): ServiceResponse<void>;
  checkLocalIdDuplicate({
    localId,
  }: {
    localId: string;
  }): ServiceResponse<void>;
  reissueAccessToken(): ServiceResponse<{ accessToken: string }>;
  logout({ token }: { token: string }): ServiceResponse<void>;
  addLocalSignUp({
    username,
    localId,
    password,
    snuMail,
  }: {
    username: string;
    snuMail: string;
    localId: string;
    password: string;
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
  addGoogleSignUp({
    snuMail,
    googleAccessToken,
  }: {
    snuMail: string;
    googleAccessToken: string;
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
};

export const implAuthService = ({
  apis,
  tokenLocalStorage,
  tokenState,
}: {
  apis: Apis;
  tokenLocalStorage: TokenLocalStorage;
  tokenState: TokenState;
}): AuthService => ({
  localSignUp: async ({ username, localId, password, snuMail }) => {
    const body = { username, localId, password, snuMail };
    const { status, data } = await apis['POST /user/signup/local']({ body });

    if (status === 200) {
      const token = data.accessToken;

      tokenLocalStorage.setToken({ token });
      tokenState.setToken({ token });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  localSignIn: async ({ localId, password }) => {
    const body = { localId, password };
    const { status, data } = await apis['POST /user/signin/local']({ body });

    if (status === 200) {
      const token = data.accessToken;

      tokenLocalStorage.setToken({ token });
      tokenState.setToken({ token });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  googleSignUp: async ({ snuMail, googleAccessToken }) => {
    const body = { snuMail, googleAccessToken };
    const { status, data } = await apis['POST /user/signup/google']({ body });

    if (status === 200) {
      const accessToken = data.accessToken;

      tokenLocalStorage.setToken({ token: accessToken });
      tokenState.setToken({ token: accessToken });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  googleSignIn: async ({ googleAccessToken }) => {
    const body = { googleAccessToken };
    const { status, data } = await apis['POST /user/signin/google']({ body });

    if (status === 200) {
      const accessToken = data.accessToken;

      tokenLocalStorage.setToken({ token: accessToken });
      tokenState.setToken({ token: accessToken });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  sendEmailCode: async ({ snuMail }) => {
    const body = { snuMail };
    const { status, data } = await apis['POST /user/signup/send-code']({
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  verifyCode: async ({ code, snuMail }) => {
    const body = { snuMail, code };
    const { status, data } = await apis['POST /user/signup/verify-email']({
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  checkLocalIdDuplicate: async ({ localId }) => {
    const body = { localId };
    const { status, data } = await apis['POST /user/signup/id-duplicate']({
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  reissueAccessToken: async () => {
    const { status, data } = await apis['POST /user/token/refresh']();

    if (status === 200) {
      const accessToken = data.accessToken;

      tokenLocalStorage.setToken({ token: accessToken });
      tokenState.setToken({ token: accessToken });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  checkGoogleEmail: async ({ token }) => {
    const body = { googleAccessToken: token };
    const { status, data } = await apis['POST /user/signup/google-email']({
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  logout: async ({ token }) => {
    const { status, data } = await apis['POST /user/logout']({ token });
    tokenLocalStorage.removeToken();
    tokenState.removeToken();
    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  addGoogleSignUp: async ({ snuMail, googleAccessToken }) => {
    const body = { snuMail, googleAccessToken };
    const { status, data } = await apis['POST /user/google']({ body });

    if (status === 200) {
      const accessToken = data.accessToken;

      tokenLocalStorage.setToken({ token: accessToken });
      tokenState.setToken({ token: accessToken });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  addLocalSignUp: async ({ username, localId, password, snuMail }) => {
    const body = { username, localId, password, snuMail };
    const { status, data } = await apis['POST /user/local']({ body });

    if (status === 200) {
      const token = data.accessToken;

      tokenLocalStorage.setToken({ token });
      tokenState.setToken({ token });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
});
