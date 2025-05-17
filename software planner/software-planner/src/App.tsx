import { Navbar } from './components/common/Navbar';
import { Hero } from './components/Hero';
import { ProjectInput } from './components/ProjectInput';
import { ResultTabs } from './components/ResultTabs';
import { Footer } from './components/common/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <Hero />
          <div className="space-y-8">
            <ProjectInput />
            <ResultTabs />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;