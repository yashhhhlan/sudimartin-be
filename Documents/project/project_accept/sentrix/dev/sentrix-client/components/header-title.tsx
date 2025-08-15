interface HeaderTitleProps {
  title: string;
  className?: string;
}

const HeaderTitle = ({ title, className }: HeaderTitleProps) => {
  return <h1 className={`font-bold text-[#0E1726] text-2xl ${className}`}>{title}</h1>;
};

export default HeaderTitle;
