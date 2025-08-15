import { Metadata } from 'next';

import AccountSettingsTabs from '@/components/users/account-settings/account-settings-tabs';

export const metadata: Metadata = {
  title: 'Account Setting',
};

const UserAccountSettings = () => {
  return (
    <div>
      <div className="space-y-2">
        <h1 className="font-semibold text-lg">Profile</h1>
        <p>
          Here you can review and update your personal details, such as your name, contact info and preferences. Keeping
          your profile current helps us personalize your experience and ensure smooth access to all features.
        </p>
      </div>
      <AccountSettingsTabs />
    </div>
  );
};

export default UserAccountSettings;
