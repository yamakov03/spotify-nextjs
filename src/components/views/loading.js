import { ScaleLoader } from "react-spinners"

function Loading() {
  return (

      <div className="flex items-center justify-center h-full bg-[--background-elevated-base] rounded-md">
        <ScaleLoader color="white" />
      </div>

  )
}

export default Loading
