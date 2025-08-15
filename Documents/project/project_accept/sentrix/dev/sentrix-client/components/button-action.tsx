'use client';

import { ButtonActionProps } from '@/types/components';
import { useRouter } from 'next/navigation';

const ButtonAction = ({ isDisabled, isPending, mode }: ButtonActionProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-4 pt-4 border-t">
      <button disabled={isDisabled} type="submit" className="btn btn-primary">
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="size-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Saving...</span>
          </div>
        ) : mode === 'create' ? (
          'Save'
        ) : (
          'Edit'
        )}
      </button>
      <button disabled={isPending} type="button" onClick={() => router.back()} className="btn btn-outline-danger">
        Cancel
      </button>
    </div>
  );
};

export default ButtonAction;
