import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ProfileView } from '~/views/Profile/ProfileView';
import { LandingHeaderView } from '~/views/Landing/LandingHeader/LandingHeaderView';
import { LandingSidebarView } from '~/views/Landing/LandingSidebar/Sidebar';
import { LandingMain } from '~/views/Landing/LandingMain/LandingMain';
import Config from 'tailwind.config';

export const LandingView: FC = observer(() => {
  const { theme } = Config;
  const themeGradiantStart = theme.extend.colors.primary['200'];
  const themeGradiantEnd = theme.extend.colors.primary['400'];

  return (
    <div className="antialiased bg-gradient-to-b from-[#1f2933] to-[#151B25] dark:bg-gray-900">
      {/* Header */}
      <LandingHeaderView />

      {/* Sidebar */}
      <LandingSidebarView />

      {/* Main Section */}
      <LandingMain />
    </div>
  );
});

export default LandingView;
