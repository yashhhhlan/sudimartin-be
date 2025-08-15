import { memo } from 'react';

import FormInputDate from '@/components/form-input-date';

import { CreateUserType, EditUserType } from '@/types/components';

interface PersonalInfoFormProps {
  formData: CreateUserType | EditUserType;
  roles: any[];
  onChange: (updates: Partial<CreateUserType | EditUserType>) => void;
  isEditMode?: boolean;
}

const PersonalInfoForm = memo(({ formData, roles, onChange, isEditMode = false }: PersonalInfoFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleDateChange = (dates: Date[]) => {
    if (dates.length > 0) {
      onChange({ expiredDate: dates[0] });
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow-md p-6 space-y-6">
      <h2 className="font-bold text-lg">Personal Info</h2>

      <div className="w-full flex gap-6">
        <div className="w-1/2 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
              className="form-input"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
              className="form-input"
              required
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Enter Company"
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter Phone"
              className="form-input"
            />
          </div>
        </div>

        <div className="w-1/2 space-y-4">
          <div>
            <label htmlFor="roleId" className="block text-sm font-medium mb-1">
              Role *
            </label>
            <select
              id="roleId"
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              className="form-select capitalize cursor-pointer"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              {roles?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {!isEditMode && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={(formData as CreateUserType).password || ''}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className="form-input"
                required
                minLength={6}
              />
            </div>
          )}

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select capitalize cursor-pointer"
              required
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <FormInputDate label="Expired Date *" value={formData.expiredDate} onChange={handleDateChange} />
        </div>
      </div>
    </div>
  );
});

PersonalInfoForm.displayName = 'PersonalInfoForm';
export default PersonalInfoForm;
