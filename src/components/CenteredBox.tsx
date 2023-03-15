import { FC, ReactElement } from "react"

interface CenteredBoxProps {
  children: ReactElement
}


const CenteredBox: FC<CenteredBoxProps> = ({children}) => {
  return (
    <div className="h-screen w-screen">
      <div className="h-full flex flex-row justify-center">
        <div className="flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}

export default CenteredBox