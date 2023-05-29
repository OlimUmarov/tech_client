import Navbar from "../navbar/Navbar";

type Props = {children: React.ReactNode}

function PublicLayout({ children }: Props) {
  return (
    <div>
    <nav>
     <Navbar />
   </nav>
   <div className="App">
   {children}
   </div>
    
 </div>
  )
}

export default PublicLayout