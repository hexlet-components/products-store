import React, { FC } from 'react'

interface PageContentProps {
  children: React.ReactElement | React.ReactElement[]
  styles?: string
}

const PageContent: FC<PageContentProps> = ({ children, styles }) => (
  <div
    className={styles || ''}
    style={{ minHeight: 'calc(100vh - 144px)', height: '100%' }}
  >
    {children}
  </div>
)

export default PageContent
