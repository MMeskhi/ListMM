import Image from "next/image";
import Link from "next/link";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Spinner, TinySpinner } from "../loaders";

export default function SearchResult({
  results,
  onGameClick,
  isLoading,
  hasSearched,
  addingGames,
}) {
  if (hasSearched && results.length === 0) {
    return <p className="text-slate-700">No results found</p>;
  }
  return (
    <div className="grid gap-2 grid-cols-4 max-sm:grid-cols-3">
      {isLoading ? (
        <Spinner />
      ) : (
        results.map((game) => (
          <div
            key={game.id}
            className="rounded-sm flex flex-col justify-between"
          >
            <div className="relative hover:before:bg-gray-900 before:absolute before:inset-0 before:rounded-sm hover:before:opacity-40 before:duration-300 [&>span]:hover:opacity-100 select-none h-full">
              {addingGames.includes(game.id) ? (
                <div className="absolute right-1.5 top-1.5">
                  <TinySpinner />
                </div>
              ) : (
                <span
                  className="opacity-0 absolute right-1.5 top-1.5 text-gray-200 text-xl bg-slate-800 p-px rounded-full shadow-sm cursor-pointer hover:text-gray-800 hover:bg-gray-200 duration-200 active:scale-90 active:duration-75"
                  onClick={() => {
                    onGameClick(game);
                  }}
                >
                  <BsFillCheckCircleFill />
                </span>
              )}
              <Image
                src={game.image}
                alt={game.name}
                width={100}
                height={100}
                unoptimized
                className="object-cover rounded-sm w-full h-full min-h-[140px] shadow-sm"
              />
            </div>
            <h2 className="truncate w-full">
              <Link
                href={`/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit hover:text-slate-700 duration-150"
              >
                {game.name}
              </Link>
            </h2>
          </div>
        ))
      )}
    </div>
  );
}
