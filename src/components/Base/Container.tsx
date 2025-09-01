import React, { FC } from 'react'

interface ContainerProps {
  children: React.ReactElement | React.ReactElement[]
  styles?: string
}

const Container: FC<ContainerProps> = ({ children, styles }) => (
  <div className={`container ${styles || ''}`}>
    {children}
  </div>
)

export default Container
