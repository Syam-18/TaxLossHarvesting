export const Header = () => {
  return (
    <header className="w-full bg-[#11131A] py-2 md:py-4 px-4 sm:px-10 flex items-center">
      <div className="max-w-345 mx-auto w-full">
        <div className="flex items-center">
          <span className="text-blue-500 font-bold text-2xl tracking-tight">
            Koin<span className="text-yellow-500">X</span>
            <sup className="text-xs font-normal ml-0.5">&reg;</sup>
          </span>
        </div>
      </div>
    </header>
  );
};
