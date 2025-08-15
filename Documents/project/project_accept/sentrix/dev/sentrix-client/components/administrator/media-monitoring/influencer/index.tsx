'use client'
import FormInput from "@/components/form-input";
import IconFileDownload from "@/components/icon/icon-file-download";
import IconProjectDate from "@/components/icon/icon-project-date"
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const AVATAR_URL = '/assets/images/profile-32.jpeg'

const Influencer = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-12">
        <div className="space-y-2">
          <h1 className="font-bold text-[#0E1726] text-2xl">Influencer</h1>
          <div className="flex gap-2 items-center">
            <IconProjectDate />
            <div className="font-semibold text-sm">17 Jul 2025 - 18 Jul 2025</div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <FormInput
              label=""
              placeholder="Cari"
            />
          </div>
          <div className="flex items-center col-span-9">
            <p>101 Person 20.795 Statement</p>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button>
            <IconFileDownload />
          </Button>
        </div>
        <hr />
      </div>

      <div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map(() => (
            <div className="panel h-full col-span-1 flex gap-4">
              <div className="shrink-0">
                <Image
                  src={AVATAR_URL}
                  width={75}
                  height={75}
                  alt="Avatar"
                  className="rounded-full"
                  priority={false}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate text-lg">Donald Trump</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">Presiden Amerika Serikat</p>

                <span>1.255</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Influencer;
