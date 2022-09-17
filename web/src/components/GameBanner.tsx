interface GameBannerProps {
    title: string,
    bannerUrl: string,
    adsCount: number
}

export function GameBanner({ title, bannerUrl, adsCount}: GameBannerProps) {
  return (
    <a href="#" className='relative'>
        <img src={bannerUrl} alt="" />
        <div className="w-full pt-16 pb-4 px-4 bg-gradient-game absolute bottom-0 left-0">
            <strong className="font-bold text-white block">{title}</strong>
            <span className="text-zinc-300 text-sm block mt-1">{adsCount} Anúncios</span>
        </div>
    </a>
  );
}