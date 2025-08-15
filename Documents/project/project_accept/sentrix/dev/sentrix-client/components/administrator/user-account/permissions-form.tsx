import { memo, useEffect, useState } from 'react';

import { Permission } from '@/types/components';

interface PermissionsFormProps {
  permissions: Record<string, Permission[]>;
  selectedPermissions: string[];
  onPermissionChange: (permissionId: string) => void;
  currentRoleName?: string;
  onSelectAllPermissions?: () => void;
}

const PermissionsForm = memo(
  ({
    permissions,
    selectedPermissions,
    onPermissionChange,
    currentRoleName,
    onSelectAllPermissions,
  }: PermissionsFormProps) => {
    const [adminPermissionsSet, setAdminPermissionsSet] = useState(false);
    const isAdmin = currentRoleName?.toLowerCase() === 'admin';

    useEffect(() => {
      if (isAdmin && permissions && onSelectAllPermissions && !adminPermissionsSet) {
        onSelectAllPermissions();
        setAdminPermissionsSet(true);
      } else if (!isAdmin) {
        setAdminPermissionsSet(false);
      }
    }, [isAdmin, permissions, onSelectAllPermissions, adminPermissionsSet]);

    const renderPermissionSection = (title: string, sectionPermissions: Permission[]) => (
      <div className="space-y-3">
        <h3 className="font-medium text-base">{title}</h3>
        <div className="space-y-2">
          {sectionPermissions?.map((permission) => (
            <label key={permission._id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission._id)}
                onChange={() => onPermissionChange(permission._id)}
                className="form-checkbox h-5 w-5"
              />
              <span className="text-sm">{permission.name}</span>
            </label>
          ))}
        </div>
      </div>
    );

    const renderAdminPermissions = (adminPermissions: Permission[]) => {
      const itemsPerColumn = 12;
      const numColumns = Math.ceil(adminPermissions?.length / itemsPerColumn) || 0;

      return (
        <div className="flex gap-6">
          {Array.from({ length: numColumns }, (_, i) => {
            const startIndex = i * itemsPerColumn;
            const columnItems = adminPermissions?.slice(startIndex, startIndex + itemsPerColumn);

            return (
              <div key={i} className="space-y-2">
                {columnItems?.map((permission) => (
                  <label key={permission._id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission._id)}
                      onChange={() => onPermissionChange(permission._id)}
                      className="form-checkbox h-5 w-5"
                    />
                    <span className="text-sm">{permission.name}</span>
                  </label>
                ))}
              </div>
            );
          })}
        </div>
      );
    };

    if (!permissions) {
      return <div>Loading permissions...</div>;
    }

    return (
      <div className="bg-white rounded-md shadow-md p-6 space-y-6">
        <h2 className="font-bold text-lg">Menu Privileges</h2>

        {isAdmin && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-700">
              <strong>Admin Role:</strong> All permissions are automatically selected.
            </p>
          </div>
        )}

        {currentRoleName === 'user' && selectedPermissions.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-sm text-yellow-700">
              <strong>User Role:</strong> Please select at least one permission for this user.
            </p>
          </div>
        )}

        <div className="flex gap-12">
          <div className="flex gap-12">
            {renderPermissionSection('Media Monitoring', permissions['Media Monitoring'])}
            {renderPermissionSection('AI Analysis', permissions['AI Analysis'])}
            {renderPermissionSection('Report', permissions['Report'])}
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-base">Administrator</h3>
            {renderAdminPermissions(permissions['Administrator'])}
          </div>
        </div>
      </div>
    );
  },
);

PermissionsForm.displayName = 'PermissionsForm';
export default PermissionsForm;
