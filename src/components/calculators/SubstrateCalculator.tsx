import React, { useMemo, useState } from 'react'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonCol,
  IonList,
} from '@ionic/react'
import { calculateSubstrate } from '../../utils/calculators'

const defaultRatio = { coir: 0.65, verm: 0.25, gypsum: 0.1 }

const toNumber = (value: string) => (value ? parseFloat(value) : 0)

const SubstrateCalculator: React.FC = () => {
  const [volume, setVolume] = useState('10')
  const [depthCm, setDepthCm] = useState('')
  const [footprint, setFootprint] = useState('')
  const [ratio, setRatio] = useState(defaultRatio)
  const [showResult, setShowResult] = useState(false)

  const result = useMemo(() => {
    const totalVolumeLiters = toNumber(volume) || 0
    return calculateSubstrate({
      totalVolumeLiters,
      depthCm: toNumber(depthCm) || undefined,
      tubFootprintSqCm: toNumber(footprint) || undefined,
      recipeRatio: ratio,
    })
  }, [volume, depthCm, footprint, ratio])

  const handleRatioChange = (field: keyof typeof ratio, value: string) => {
    const numeric = Math.min(Math.max(parseFloat(value) || 0, 0), 1)
    setRatio((prev) => ({ ...prev, [field]: numeric }))
  }

  return (
    <IonCard className="calculator-card">
      <IonCardHeader>
        <IonCardSubtitle>Bulk Planning</IonCardSubtitle>
        <IonCardTitle>Substrate Calculator</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Total Bulk Volume (L)</IonLabel>
            <IonInput
              type="number"
              value={volume}
              onIonChange={(e) => setVolume(e.detail.value ?? '')}
              placeholder="e.g. 12"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Option: Depth (cm)</IonLabel>
            <IonInput
              type="number"
              value={depthCm}
              onIonChange={(e) => setDepthCm(e.detail.value ?? '')}
              placeholder="6"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Option: Tub Footprint (sq cm)</IonLabel>
            <IonInput
              type="number"
              value={footprint}
              onIonChange={(e) => setFootprint(e.detail.value ?? '')}
              placeholder="1600"
            />
          </IonItem>
        </IonList>

        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonItem lines="none">
                <IonLabel position="stacked">Coir %</IonLabel>
                <IonInput
                  type="number"
                  min="0"
                  max="1"
                  step="0.05"
                  value={ratio.coir}
                  onIonChange={(e) => handleRatioChange('coir', e.detail.value ?? '0')}
                />
              </IonItem>
            </IonCol>
            <IonCol size="4">
              <IonItem lines="none">
                <IonLabel position="stacked">Verm %</IonLabel>
                <IonInput
                  type="number"
                  min="0"
                  max="1"
                  step="0.05"
                  value={ratio.verm}
                  onIonChange={(e) => handleRatioChange('verm', e.detail.value ?? '0')}
                />
              </IonItem>
            </IonCol>
            <IonCol size="4">
              <IonItem lines="none">
                <IonLabel position="stacked">Gypsum %</IonLabel>
                <IonInput
                  type="number"
                  min="0"
                  max="1"
                  step="0.05"
                  value={ratio.gypsum}
                  onIonChange={(e) => handleRatioChange('gypsum', e.detail.value ?? '0')}
                />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonNote>
          Set either total liters OR tub footprint + depth to auto-compute volume. Ratios should add up to ~1.0.
        </IonNote>

        <IonButton expand="block" className="ion-margin-top" onClick={() => setShowResult(true)}>
          Calculate Ingredients
        </IonButton>

        {showResult && (
          <div className="ion-margin-top">
            <IonNote>Total substrate mass: {result.totalMassKg} kg (approx)</IonNote>
            <IonList>
              {result.ingredients.map((ingredient) => (
                <IonItem key={ingredient.name} lines="none">
                  <IonLabel>
                    <strong>{ingredient.name}</strong>
                    <p>{ingredient.massGrams} g</p>
                    {ingredient.approxQuarts && (
                      <p>≈ {ingredient.approxQuarts} qt</p>
                    )}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  )
}

export default SubstrateCalculator
