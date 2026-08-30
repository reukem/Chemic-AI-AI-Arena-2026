import React, { useEffect } from 'react';
import LabCanvas from './engine/LabCanvas';
import MainMenu from './ui/MainMenu';
import LoadingScreen from './ui/LoadingScreen';
import UIOverlay from './ui/UIOverlay';
import Commlink from './ui/Commlink';
import ReactionCodex from './ui/ReactionCodex';
import ReactionPopup from './ui/ReactionPopup';
import EducationalInsightModal from './ui/EducationalInsightModal';
import { useSimulationStore } from './engine/store';

import SocraticMode from './ui/SocraticMode';
import LearningMode from './ui/LearningMode';
import OrganicMode from './ui/OrganicMode';

function App() {
  const initialize = useSimulationStore(state => state.initialize);
  const appState = useSimulationStore(state => state.appState);
  const isSocraticModeActive = useSimulationStore(state => state.isSocraticModeActive);
  const isLearningModeActive = useSimulationStore(state => state.isLearningModeActive);
  const isOrganicModeActive = useSimulationStore(state => state.isOrganicModeActive);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="w-screen h-screen relative bg-[#0b0f19] overflow-hidden flex flex-col font-sans">
      {appState === 'MENU' && <MainMenu />}
      {appState === 'LOADING' && <LoadingScreen />}

      {/* We always render LabCanvas but keep it hidden/behind if not in WORKBENCH to avoid recreation if needed, or we can conditionalize it.
          For performance and clean state, conditional rendering is better. */}
      {appState === 'WORKBENCH' && (
        <>
          <LabCanvas />
          <UIOverlay />
          <ReactionPopup />
          <EducationalInsightModal />
          <ReactionCodex />
          <Commlink />
        </>
      )}

      {/* Socratic Interrogation Overlay (Global) */}
      {isSocraticModeActive && <SocraticMode />}

      {/* Green Learning Mode Overlay (Global) */}
      {isLearningModeActive && <LearningMode />}

      {/* Organic Chemistry Mode (Wordle Synthesis Overlay) */}
      {isOrganicModeActive && <OrganicMode />}

    </div>
  );

}

export default App;
