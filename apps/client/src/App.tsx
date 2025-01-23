import './index.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ExternalCallParams, implApi } from '@waffle/api';
import { useState } from 'react';
import { Route, Routes } from 'react-router';

import { PATH } from '@/entities/route';
import { implAuthService } from '@/feature/auth';
import { implPostService } from '@/feature/post';
import { implUserService } from '@/feature/user';
import { ApplyCoffeeChatPage } from '@/pages/ApplyCoffeeChatPage';
import { CoffeeChatDetailPage } from '@/pages/CoffeeChatDetailPage';
import { CoffeeChatListPage } from '@/pages/CoffeeChatListPage';
import { CreateCompanyPage } from '@/pages/CreateCompanyPage';
import { CreatePostPage } from '@/pages/CreatePostPage';
import { EmailVerifyPage } from '@/pages/EmailVerifyPage';
import { LandingPage } from '@/pages/LandingPage';
import { LocalSignUpPage } from '@/pages/LocalSignUpPage';
import { MyPage } from '@/pages/MyPage';
import { PostPage } from '@/pages/PostPage';
import { SignInSelectPage } from '@/pages/SignInSelectPage';
import { SignUpCompletePage } from '@/pages/SignUpCompletePage';
import { SignUpSelectPage } from '@/pages/SignUpSelectPage';
import { VentureCapitalLandingPage } from '@/pages/VentureCapitalLandingPage';
import { implEchoService } from '@/service/echoService';
import { implResumeService } from '@/service/resumeService';
import { AuthCompanySwitchRoute } from '@/shared/auth/AuthAdminSwitchRoute';
import { AuthProtectedRoute } from '@/shared/auth/AuthProtectedRoute';
import { CompanyProtectedRoute } from '@/shared/auth/CompanyProtectedRoute';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { implTokenLocalStorageRepository } from '@/shared/token/localstorage';
import { implTokenStateRepository } from '@/shared/token/state';

const RouterProvider = () => {
  return (
    <Routes>
      <Route
        path={PATH.INDEX}
        element={
          <AuthCompanySwitchRoute
            nonCompanyPage={<LandingPage />}
            companyPage={<VentureCapitalLandingPage />}
          />
        }
      />
      <Route path={PATH.POST} element={<PostPage />} />
      <Route path={PATH.SIGN_IN_SELECT} element={<SignInSelectPage />} />
      <Route path={PATH.SIGN_UP_SELECT} element={<SignUpSelectPage />} />
      <Route path={PATH.SIGN_UP_LOCAL} element={<LocalSignUpPage />} />
      <Route path={PATH.VERIFY_EMAIL} element={<EmailVerifyPage />} />
      <Route path={PATH.SIGN_UP_COMPLETE} element={<SignUpCompletePage />} />
      <Route path={PATH.APPLY_COFFEE_CHAT} element={<ApplyCoffeeChatPage />} />
      <Route path={PATH.COFFEE_CHAT_LIST} element={<CoffeeChatListPage />} />
      <Route
        path={PATH.COFFEE_CHAT_DETAIL}
        element={<CoffeeChatDetailPage />}
      />
      <Route element={<AuthProtectedRoute />}>
        <Route path={PATH.MY_PAGE} element={<MyPage />} />
      </Route>
      <Route element={<CompanyProtectedRoute />}>
        <Route path={PATH.CREATE_COMPANY} element={<CreateCompanyPage />} />
        <Route path={PATH.CREATE_POST} element={<CreatePostPage />} />
      </Route>
    </Routes>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App = () => {
  const tokenLocalStorage = implTokenLocalStorageRepository();
  const [token, setToken] = useState<string | null>(
    tokenLocalStorage.getToken(),
  );
  const ENV = useGuardContext(EnvContext);
  const tokenState = implTokenStateRepository({ setToken });

  const localServerCall = async (content: ExternalCallParams) => {
    const response = await fetch(
      `${ENV.APP_ENV === 'prod' ? ENV.API_BASE_URL : '/api'}/${content.path}`,
      {
        method: content.method,
        headers: content.headers,
        ...(content.body !== undefined
          ? { body: JSON.stringify(content.body) }
          : {}),
      },
    );

    const echoRegex = /^echo\/.*$/;

    if (echoRegex.test(content.path)) {
      const responseText = (await response.text().catch(() => null)) as string;
      const responseBody = {
        message: responseText,
      };

      return {
        status: response.status,
        data: responseBody,
      };
    }

    const responseBody = (await response.json().catch(() => null)) as unknown;

    if (!response.ok) {
      if (response.status === 401) {
        tokenState.removeToken();
        tokenLocalStorage.removeToken();
      }
    }
    return {
      status: response.status,
      data: responseBody,
    };
  };

  const externalServerCall = async (content: ExternalCallParams) => {
    const response = await fetch(content.path, {
      method: content.method,
      headers: content.headers,
      ...(content.body !== undefined
        ? { body: JSON.stringify(content.body) }
        : {}),
    });

    const responseBody = (await response.json().catch(() => null)) as unknown;

    return {
      status: response.status,
      data: responseBody,
    };
  };

  const apis = implApi({ externalCall: localServerCall });
  const externalApis = implApi({ externalCall: externalServerCall });

  const services = {
    echoService: implEchoService({ apis }),
    authService: implAuthService({ apis, tokenState, tokenLocalStorage }),
    postService: implPostService({ apis, externalApis }),
    userService: implUserService({ apis }),
    resumeService: implResumeService({ apis }),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={services}>
        <TokenContext.Provider value={{ token }}>
          <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
            <RouterProvider />
          </GoogleOAuthProvider>
        </TokenContext.Provider>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
};
