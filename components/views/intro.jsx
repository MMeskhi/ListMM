export default function Intro() {
  return (
    <div className="flex items-start justify-between gap-10 animate-slide-top mt-10 px-10 max-xl:px-5 max-lg:flex-col max-lg:gap-5 max-sm:px-1">
      <div>
        <h1 className="text-gray-300 text-3xl">Watch Listen Play</h1>
        <p className="text-gray-400 text-base my-1 mb-px w-full max-w-xl">
          Create and Save Lists of Movies, Albums, and Games with ListMM
        </p>
        <p className="text-gray-500 text-sm w-full max-w-2xl">
          With ListMM, you can easily create and manage lists of movies, albums,
          and games, all in one place. Just add your favorite titles, organize
          them into the list, and save them for future reference.
        </p>
      </div>
      <div className="w-[544px] bg-gray-950 rounded-sm shadow-md border border-gray-800 max-xl:min-w-[480px] max-xl:h-[270px] max-md:min-w-full max-sm:h-[180px] pointer-events-none">
        <video
          width="544px"
          height="100%"
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
        >
          <source src="/ListMMIntro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
