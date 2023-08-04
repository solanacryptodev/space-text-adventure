import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { LandingHeaderView } from '~/views/Landing/LandingHeader/LandingHeaderView';
import { LandingSidebarView } from '~/views/Landing/LandingSidebar/Sidebar';
import { LandingMain } from '~/views/Landing/LandingMain/LandingMain';

export const LandingView: FC = observer(() => {
  return (
    <div className="antialiased bg-gradient-to-b from-[#151B25] to-[#000000] dark:bg-gray-900">
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
