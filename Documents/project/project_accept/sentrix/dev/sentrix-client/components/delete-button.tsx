import { useState, Fragment } from 'react';
import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react';
import Image from 'next/image';

interface DeleteButtonProps {
  onDelete: () => void;
  isLoading?: boolean;
}

const DeleteButton = ({ onDelete, isLoading }: DeleteButtonProps) => {
  const [modal, setModal] = useState(false);

  const handleModal = () => setModal((prev) => !prev);

  const handleDelete = () => {
    onDelete();
    handleModal();
  };

  return (
    <div>
      <div className="flex items-center justify-center" onClick={handleModal}>
        <Image
          className="cursor-pointer"
          src="/assets/images/dashboard/icon-delete.png"
          alt="delete"
          height={32}
          width={32}
        />
      </div>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" open={modal} onClose={handleModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </TransitionChild>
          <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  as="div"
                  className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark"
                >
                  <div className="p-5 font-bold text-lg">Are you absolutely sure?</div>
                  <div className="px-5">
                    <p className="text-gray-500">
                      This action cannot be undone. This will permanently delete your data from our servers.
                    </p>
                    <div className="flex justify-end items-center my-8">
                      <button type="button" className="btn btn-outline-danger" onClick={handleModal}>
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                        onClick={handleDelete}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DeleteButton;
