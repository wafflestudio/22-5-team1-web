import { useState } from 'react';

import { SignUpModal } from '@/components/modal/SignUpModal';
import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApplicantLocalLogInForm, CompanyLocalLogInForm } from '@/feature/auth';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignInPage = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { toSignUp, toFindAccount } = useRouteNavigation();

  const onCloseModal = () => {
    setShowSignUpModal(false);
  };

  return (
    <ModalBackgroundWithHeader>
      <div className="flex flex-col gap-[32px]">
        <h2 className="text-center text-22 font-bold">로그인</h2>
        <Tabs defaultValue="APPLICANT" className="flex flex-col gap-[30px]">
          <TabsList variant="button">
            <TabsTrigger value="APPLICANT" variant="button">
              학생 회원
            </TabsTrigger>
            <TabsTrigger value="COMPANY" variant="button">
              회사 회원
            </TabsTrigger>
          </TabsList>
          <TabsContent value="APPLICANT">
            <ApplicantLocalLogInForm setShowSignUpModal={setShowSignUpModal} />
          </TabsContent>
          <TabsContent value="COMPANY">
            <CompanyLocalLogInForm setShowSignUpModal={setShowSignUpModal} />
          </TabsContent>
          <section className="flex flex-col gap-[10px]">
            <div className="flex justify-end">
              <a
                className="text-13 font-regular text-grey-500 underline-offset-4 hover:cursor-pointer hover:underline hover:decoration-grey-500"
                onClick={toFindAccount}
              >
                비밀번호 찾기
              </a>
            </div>
          </section>
          <section className="flex w-full flex-col gap-[18px]">
            <div className="text-center">
              <p className="text-14 font-medium text-grey-300">
                아직 계정이 없으신가요?{' '}
                <a
                  className="text-14 font-regular text-grey-800 underline-offset-4 hover:cursor-pointer hover:underline hover:decoration-grey-800"
                  onClick={() => {
                    toSignUp({});
                  }}
                >
                  회원가입
                </a>
              </p>
            </div>
          </section>
        </Tabs>
      </div>
      {showSignUpModal && <SignUpModal onClose={onCloseModal} />}
    </ModalBackgroundWithHeader>
  );
};
