import { useState } from 'react';

import { SignUpModal } from '@/components/modal/SignUpModal';
import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { GoogleSocialSignInButton } from '@/feature/auth';
import { LocalLogInForm } from '@/feature/auth';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignInSelectPage = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { toSignUpSelect, toFindAccount } = useRouteNavigation();

  const onCloseModal = () => {
    setShowSignUpModal(false);
  };

  return (
    <ModalBackgroundWithHeader>
      <h2 className="text-2xl font-bold text-center">로그인</h2>
      <div className="flex flex-col gap-[30px]">
        <section className="flex flex-col gap-[10px]">
          <LocalLogInForm setShowSignUpModal={setShowSignUpModal} />
          <div className="flex justify-end">
            <a
              className="text-grey-normal-active text-sm underline-offset-4 hover:cursor-pointer hover:underline hover:decoration-grey-normal-active"
              onClick={toFindAccount}
            >
              아이디/비밀번호 찾기
            </a>
          </div>
        </section>
        <section className="flex flex-col w-full gap-[18px]">
          <div className="flex flex-col w-full gap-[14px] items-center text-gray-400 text-sm font-medium">
            <div className="flex w-full items-center gap-2">
              <div className="block flex-1 bg-grey-normal h-[1px]"></div>
              <span className="text-grey-normal">또는</span>
              <div className="block flex-1 bg-grey-normal h-[1px]"></div>
            </div>
            <GoogleSocialSignInButton setShowSignUpModal={setShowSignUpModal} />
          </div>
          <div className="text-center">
            <p className="text-sm text-grey-normal">
              아직 계정이 없으신가요?{' '}
              <a
                className="text-grey-dark-active underline-offset-4 hover:cursor-pointer hover:underline hover:decoration-grey-dark-active"
                onClick={toSignUpSelect}
              >
                회원가입
              </a>
            </p>
          </div>
        </section>
      </div>
      {showSignUpModal && <SignUpModal onClose={onCloseModal} />}
    </ModalBackgroundWithHeader>
  );
};
