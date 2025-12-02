import React, { useState } from 'react'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
} from '@ionic/react'
import { calculateBiologicalEfficiency } from '../../utils/calculators'

const BiologicalEfficiencyCalculator: React.FC = () => {
  const [dryInput, setDryInput] = useState('1.2')
  const [harvest, setHarvest] = useState('2.4')
  const [result, setResult] = useState<number | null>(null)

  const handleCalculate = () => {
    const dry = parseFloat(dryInput) || 0
    const wet = parseFloat(harvest) || 0
    setResult(calculateBiologicalEfficiency(dry, wet))
  }

  return (
    <IonCard className="calculator-card">
      <IonCardHeader>
        <IonCardSubtitle>Yield Insight</IonCardSubtitle>
        <IonCardTitle>Biological Efficiency</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel position="stacked">Dry Input (kg)</IonLabel>
          <IonInput
            type="number"
            value={dryInput}
            onIonChange={(e) => setDryInput(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Harvest (kg)</IonLabel>
          <IonInput
            type="number"
            value={harvest}
            onIonChange={(e) => setHarvest(e.detail.value ?? '')}
          />
        </IonItem>
        <IonNote>
          BE% = (wet harvest weight ÷ dry substrate weight) × 100. 200%+ indicates dialed-in tubs.
        </IonNote>
        <IonButton expand="block" className="ion-margin-top" onClick={handleCalculate}>
          Compute BE
        </IonButton>
        {result !== null && (
          <div className="ion-padding-top">
            <p>Biological Efficiency: <strong>{result}%</strong></p>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  )
}

export default BiologicalEfficiencyCalculator
