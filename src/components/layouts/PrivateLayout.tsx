import PrivateNavbar from "../navbar/PrivateNavbar";

type Props = { children: React.ReactNode };

function PrivateLayout({ children }: Props) {


  return (
    <div>
       <nav>
        <PrivateNavbar/>
      </nav>
      <div className="bg-white">
      {children}
      </div>
       
    </div>
  );
}

export default PrivateLayout;
