import Image from "next/image";

export default function SearchResults({ results }) {
  return (
    <div className="grid grid-cols-fluid gap-4">
      {results.map((movie) => (
        <div key={movie.id} className="w-32 h-42">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={200}
            className="object-cover w-26 h-[188px]"
          />
          <h2 className="truncate">{movie.title}</h2>
        </div>
      ))}
    </div>
  );
}
