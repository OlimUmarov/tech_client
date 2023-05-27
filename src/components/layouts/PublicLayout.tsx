import React from 'react'

type Props = {children: React.ReactNode}

function PublicLayout({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  )
}

export default PublicLayout