import PublicNavbar from "../navbar/PublicNavbar"

type Props = {children: React.ReactNode}

function PublicLayout({ children }: Props) {
  return (
    <div>
    <nav>
      <PublicNavbar/>
   </nav>
   <div>
   {children}
   </div>
    
 </div>
  )
}

export default PublicLayout