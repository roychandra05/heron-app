const PopUpMessage = ({message}) => {
  return (
    <div className='fixed shadow-lg shadow-green-500 top-0 right-0 left-0 h-10 border-b-2 text-main-base border-green-500 text-center text-lg font-bold bg-main-background z-30 flex flex-col justify-center items-center p-6'>
        <p className=''>{message}</p>
    </div>
  )
}
export default PopUpMessage