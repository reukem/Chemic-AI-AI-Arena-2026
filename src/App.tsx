import React, { useEffect } from 'react';
import LabCanvas from './engine/LabCanvas';
import MainMenu from './ui/MainMenu';
import LoadingScreen from './ui/LoadingScreen';
import UIOverlay from './ui/UIOverlay';
import Commlink from './ui/Commlink';
import ReactionPopup from './ui/ReactionPopup';
import EducationalInsightModal from './ui/EducationalInsightModal';
import { useSimulationStore } from './engine/store';

import SocraticMode from './ui/SocraticMode';
import LearningMode from './ui/LearningMode';
import OrganicMode from './ui/OrganicMode';
import CalculatingMode from './ui/CalculatingMode';

function App() {
  const initialize = useSimulationStore(state => state.initialize);
  const appState = useSimulationStore(state => state.appState);
  const isSocraticModeActive = useSimulationStore(state => state.isSocraticModeActive);
  const isLearningModeActive = useSimulationStore(state => state.isLearningModeActive);
  const isOrganicModeActive = useSimulationStore(state => state.isOrganicModeActive);
  const isCalculatingModeActive = useSimulationStore(state => state.isCalculatingModeActive);

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
          <Commlink />
        </>
      )}

      {/* Socratic Interrogation Overlay (Global) */}
      {isSocraticModeActive && <SocraticMode />}

      {/* Green Learning Mode Overlay (Global) */}
      {isLearningModeActive && <LearningMode />}

      {/* Organic Chemistry Mode (Wordle Synthesis Overlay) */}
      {isOrganicModeActive && <OrganicMode />}

      {/* Calculating Mode (Formula Sheet & Grade 8-12 Calculation Lab) */}
      {isCalculatingModeActive && <CalculatingMode />}

    </div>
  );

}

export default App;
