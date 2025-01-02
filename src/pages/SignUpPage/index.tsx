import { Button } from '@/components/button';
import { SignUpForm } from '@/pages/SignUpPage/SignUpForm';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpPage = () => {
  const { toMain } = useRouteNavigation();

  return (
    <div>
      <p>회원가입 페이지입니다.</p>
      <SignUpForm />
      <Button onClick={toMain}>메인으로 이동</Button>
    </div>
  );
};
