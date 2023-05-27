
type Props = { children: React.ReactNode };

function PrivateLayout({ children }: Props) {


  return (
    <div>
       {children}
    </div>
  );
}

export default PrivateLayout;
