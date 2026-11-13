import { BotanicalScrollCard } from './components/BotanicalScrollCard';
import { FloatingPetals } from './components/FloralOrnaments';
import { Header } from './components/Header';
import { WeddingAudioPlayer } from './components/WeddingAudioPlayer';
import { COUPLE } from './data/weddingData';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#969F83] via-[#8A9377] to-[#7B8469] text-[#2C3126] relative">
      <FloatingPetals />
      <WeddingAudioPlayer />
      <Header />

      <main className="flex-1 relative z-20 py-6 sm:py-12 px-3 sm:px-6">
        <BotanicalScrollCard />
      </main>

      <footer className="relative z-20 py-6 px-4 text-center text-xs sm:text-sm text-[#FCFBF8]/90">
        <p>
          शुभ विवाह · {COUPLE.groomHi} weds {COUPLE.brideHi} · विनीत: {COUPLE.hostFamily}
        </p>
      </footer>
    </div>
  );
}
