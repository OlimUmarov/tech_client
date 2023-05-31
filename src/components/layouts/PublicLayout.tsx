import Navbar from "../navbar/Navbar";

type Props = {children: React.ReactNode}

function PublicLayout({ children }: Props) {
  return (
    <div>
    <nav>
     <Navbar />
   </nav>
   <div className="container">
   {children}
   </div>
    
 </div>
  )
}

export default PublicLayout