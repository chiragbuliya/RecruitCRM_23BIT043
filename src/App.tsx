import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar/Navbar';
import { ListingDetailView } from './components/ListingDetail/ListingDetailView';
import { RentModal } from './components/Modals/RentModal';
import { SearchModal } from './components/Modals/SearchModal';
import { LoginModal } from './components/Modals/LoginModal';
import { RegisterModal } from './components/Modals/RegisterModal';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-rose-100 selection:text-airbnb-primary">
      <Navbar />
      <main className="flex-1">
        <ListingDetailView />
      </main>

      {/* Modals */}
      <RentModal />
      <SearchModal />
      <LoginModal />
      <RegisterModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
