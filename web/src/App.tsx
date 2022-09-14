import './styles/main.css'
import { MagnifyingGlassPlus} from 'phosphor-react'
import logoImg from './assets/logo-nlw-esports.png';
function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={logoImg} alt="logo nwl esports" />
      <h1 className="text-6xl text-white font-black m-20">
        Seu <span className="text-transparent bg-gradient-default bg-clip-text">
          duo
        </span> 
        esta aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 ">
        <a href="#" className='relative'>
          <img src="/game-1.png" alt="" />
        <div className="w-ful pt-16 pb-4 px-4 bg-gradient-game absolute bottom-0 left-0">
          <strong className="font-bold text-white block">League of Legends</strong>
          <span className="text-zinc-300 text-sm block mt-1">4 Anuncios</span>
        </div>
        </a>
        <a href="#" className='relative'>
          <img src="/game-2.png" alt="" />
        </a>
        <a href="#" className='relative'>
          <img src="/game-3.png" alt="" />
        </a>
      </div> 
      <div className="pt-1 mt-8 bg-gradient-default self-stretch rounded-lg overflow-hidden">
        <div className="bg-[#2A2634]  px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">
              Nao encontrou seu duo? 
            </strong>
            <span className="text-zinc-400 block">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>
          <button className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex item-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div> 
      </div>
    </div>
  )
}

export default App
