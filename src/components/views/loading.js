import { ScaleLoader } from "react-spinners"

function Loading() {
  return (

    <div className=" min-w-[25rem] flex items-center justify-center h-[calc(100vh-5.5rem)] full bg-[--background-elevated-base] rounded-md ">
      <ScaleLoader color="white" />
    </div>

  )
}

export default Loading
