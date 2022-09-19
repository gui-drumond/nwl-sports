import "./styles/main.css"
import logoImg from "./assets/logo-nlw-esports.png";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./components/Form/Input";
import { CreateAdModal } from "./components/CreateAdModal";

interface Game {
  id:string;
  title: string;
  bannerUrl: string; 
  _count:{
    ads: number;
  }
}

function App() {
  const [games, setGames ] = useState<Game[]>([]);
  useEffect( () => {
    fetch("http://localhost:3333/games")
    .then( response => response.json())
    .then( data => setGames(data))
  },[])
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
        { games.map( game => {
          return (
            <GameBanner 
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )})
        }
      </div> 
      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>

      </Dialog.Root> 
    </div>
  )
}

export default App
