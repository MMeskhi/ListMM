export default function MainContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 animate-slide-top-slow mt-16 px-20 max-xl:px-5 max-lg:flex-col max-lg:gap-5 max-sm:px-1">
      <h2 className="text-gray-300 text-xl">Main Content</h2>
      <p className="text-gray-400 text-base my-1 mb-px w-full max-w-2xl text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
        nesciunt tempore voluptatibus ad, et quod dolor atque laudantium quia!
        Pariatur, est praesentium. Quaerat quam voluptas excepturi, optio
        sapiente praesentium libero!
      </p>
      <div className="flex items-center justify-center gap-6 mt-6 animate-slide-top-slow">
        <div className="w-28 h-32 bg-gray-300 flex justify-center items-center rounded-sm">
          !
        </div>
        <div className="w-28 h-32 bg-gray-300 flex justify-center items-center rounded-sm">
          !
        </div>
        <div className="w-28 h-32 bg-gray-300 flex justify-center items-center rounded-sm">
          !
        </div>
      </div>
    </div>
  );
}
