"use client";

export function AdsSection() {
  const handleLmntClick = () => {
    window.open("https://drinklmnt.com/", "_blank", "noopener,noreferrer");
  };

  const handleNikeClick = () => {
    window.open("https://www.nike.com/in/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="h-[490px] flex flex-col gap-4">
      {/* LMNT Electrolyte Ad Card */}
      <div
        className="flex-1 rounded-lg border border-gray-700 hover:border-orange-500 transition-colors cursor-pointer overflow-hidden transform hover:scale-[1.02] transition-transform duration-200"
        onClick={handleLmntClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleLmntClick();
          }
        }}
        aria-label="Visit LMNT Electrolyte website"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/lmnt-ad.webp')",
          }}
        />
      </div>

      {/* Nike Adventure Ad Card */}
      <div
        className="flex-1 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer overflow-hidden transform hover:scale-[1.02] transition-transform duration-200"
        onClick={handleNikeClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleNikeClick();
          }
        }}
        aria-label="Visit Nike India website"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/nike-adventure-ad.jpeg')",
          }}
        />
      </div>
    </div>
  );
}
