import { useParams } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PATH } from '@/entities/route';
import { ApplicantCoffeeChatDetailView } from '@/feature/coffeeChat';
import { CompanyCoffeeChatDetailView } from '@/feature/coffeeChat';
import { AuthCompanySwitchRoute } from '@/shared/auth/AuthAdminSwitchRoute';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const CoffeeChatDetailPage = () => {
  const { coffeeChatId } = useParams<{ coffeeChatId: string }>();

  if (coffeeChatId === undefined) {
    return <RouteNavigator link={PATH.MY_PAGE} />;
  }
  return (
    <div className="min-h-screen bg-grey-50">
      <GlobalNavigationBar />
      <AuthCompanySwitchRoute
        nonCompanyPage={
          <ApplicantCoffeeChatDetailView coffeeChatId={coffeeChatId} />
        }
        companyPage={<CompanyCoffeeChatDetailView />}
      />
    </div>
  );
};
