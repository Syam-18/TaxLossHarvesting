export const Header = () => {
  return (
    <header className="w-full bg-[#11131A] border-b border-white/5 py-4 px-6 sm:px-10 flex items-center">
      <div className="max-w-[1280px] mx-auto w-full">
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
