import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import Logo from '@/components/logo';
import VerifyOTPForm from '@/components/auth/verify-otp-form';

export const metadata: Metadata = {
  title: 'Verify OTP',
};

const Page = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="absolute inset-0">
        <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        <img
          src="/assets/images/auth/coming-soon-object1.png"
          alt="image"
          className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
        />
        <img
          src="/assets/images/auth/coming-soon-object2.png"
          alt="image"
          className="absolute left-24 top-0 h-40 md:left-[30%]"
        />
        <img
          src="/assets/images/auth/coming-soon-object3.png"
          alt="image"
          className="absolute right-0 top-0 h-[300px]"
        />
        <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
        <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
          <div className="relative flex flex-col justify-between rounded-md bg-white/60 px-6 backdrop-blur-lg dark:bg-black/50 lg:min-h-[708px]">
            <div>
              <Link href="/auth/signin" className="absolute start-8 top-6">
                <ArrowLeft size={28} />
              </Link>
              <div className="absolute end-6 top-6">
                <Logo />
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center mx-auto w-full max-w-[440px]">
              <div className="mb-7 w-full">
                <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">Verify OTP</h1>
                <p>
                  Please enter the verification code sent to your email.For security verification, please keep this page
                  open while waiting for the OTP email. Delivery may take up to 5 minutes.
                </p>
              </div>
              <div className="w-full">
                <VerifyOTPForm />
              </div>
            </div>

            <div className="mb-10 text-center dark:text-white">
              &copy; {new Date().getFullYear()}. Sentrix All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
