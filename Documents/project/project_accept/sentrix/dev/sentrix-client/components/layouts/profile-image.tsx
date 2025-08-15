import Image from 'next/image';

const ProfileImage = ({ profileImageUrl }: { profileImageUrl: string }) => {
    if (profileImageUrl) {
        return (
            <Image
                src={process.env.NEXT_PUBLIC_BASE_URL + profileImageUrl}
                alt="profile image"
                className="size-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                width={40}
                height={40}
            />
        );
    } else {
        return (
            <Image
                src="/assets/images/user-profile-vislog-plus.jpg"
                alt="profile image default"
                className="size-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                width={40}
                height={40}
            />
        );
    }
};

export default ProfileImage;
