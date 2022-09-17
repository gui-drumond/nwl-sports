import "./styles/main.css"
import logoImg from "./assets/logo-nlw-esports.png";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./components/Input";

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
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
          <Dialog.Content className="shadow-black/25 fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w=[480px]">
            <Dialog.Title className="text-3xl font-black"> Publique um Anúncio </Dialog.Title>
              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o game?</label>
                  <Input id="game" placeholder="Selecione o game que deseja jogar"/>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input id="name" placeholder="Como te chama dentro do game?"/>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quanto anos?</label>
                    <Input type="number"  id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual o seu Discord?</label>
                    <Input type="text"  id="discord" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando constuma jogar?</label>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className="flex  gap-2">
                      <Input id="hourStart" type="time" placeholder="De"/>
                      <Input id="hourEnd" type="time" placeholder="Até"/>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex gap-2 text-sm">
                  <Input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>
                  <footer className="mt-4 flex justify-end gap-4">
                    <Dialog.Close 
                      className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
                      >
                      Cancelar
                    </Dialog.Close>
                    <button
                     type="submit"
                     className="bg-violet-500 hover:bg-violet-600 transition-all px-5 h-12 flex gap-3 rounded-md font-semibold items-center"
                     >
                      <GameController />
                      Encontrar duo
                    </button>
                  </footer>
              </form>
          </Dialog.Content>
        </Dialog.Portal>

      </Dialog.Root> 
    </div>
  )
}

export default App
