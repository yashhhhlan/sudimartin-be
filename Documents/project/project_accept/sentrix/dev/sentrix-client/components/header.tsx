interface HeaderProps {
  title: string;
  description?: React.ReactNode;
  className?: string;
}

const Header = ({ title, description, className = 'px-12' }: HeaderProps) => {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Header;
