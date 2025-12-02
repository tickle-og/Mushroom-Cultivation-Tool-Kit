import React from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonNote,
} from '@ionic/react'
import SubstrateCalculator from '../components/calculators/SubstrateCalculator'
import SpawnRatioCalculator from '../components/calculators/SpawnRatioCalculator'
import BiologicalEfficiencyCalculator from '../components/calculators/BiologicalEfficiencyCalculator'
import UnitConverter from '../components/calculators/UnitConverter'

const CalculatorsPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Calculators</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <div className="ion-padding">
        <SubstrateCalculator />
        <SpawnRatioCalculator />
        <BiologicalEfficiencyCalculator />
        <UnitConverter />

        <IonCard color="light" className="calculator-card">
          <IonCardHeader>
            <IonCardSubtitle>Coming Soon</IonCardSubtitle>
            <IonCardTitle>LC / Spore Dilution</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonNote>
              Dilution math and inoculation tracking are on deck. Add notes in the Logbook to capture what you mix today.
            </IonNote>
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  </IonPage>
)

export default CalculatorsPage
