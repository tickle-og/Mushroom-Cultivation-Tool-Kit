import React, { useMemo, useState } from 'react'
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
import { calculateSpawnRatio } from '../../utils/calculators'

const SpawnRatioCalculator: React.FC = () => {
  const [totalMass, setTotalMass] = useState('5')
  const [ratio, setRatio] = useState('2')
  const [show, setShow] = useState(false)

  const { spawnMass, bulkMass } = useMemo(() => {
    const total = parseFloat(totalMass) || 0
    const ratioValue = parseFloat(ratio) || 0
    return calculateSpawnRatio(total, ratioValue)
  }, [totalMass, ratio])

  return (
    <IonCard className="calculator-card">
      <IonCardHeader>
        <IonCardSubtitle>Spawn Planning</IonCardSubtitle>
        <IonCardTitle>Spawn Ratio Calculator</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel position="stacked">Combined Mass (kg)</IonLabel>
          <IonInput
            type="number"
            value={totalMass}
            onIonChange={(e) => setTotalMass(e.detail.value ?? '')}
            placeholder="e.g. 6"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Bulk : Spawn Ratio</IonLabel>
          <IonInput
            type="number"
            step="0.5"
            value={ratio}
            onIonChange={(e) => setRatio(e.detail.value ?? '')}
            placeholder="2 (for 1:2)"
          />
        </IonItem>
        <IonNote>
          Enter the amount of fully mixed substrate you want in kg. For 1:2 ratio, enter 2 (bulk is twice the spawn quantity).
        </IonNote>
        <IonButton expand="block" className="ion-margin-top" onClick={() => setShow(true)}>
          Calculate Split
        </IonButton>
        {show && (
          <div className="ion-padding-top">
            <p>Spawn needed: <strong>{spawnMass} kg</strong></p>
            <p>Bulk substrate: <strong>{bulkMass} kg</strong></p>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  )
}

export default SpawnRatioCalculator
