import React, { useState } from 'react'
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
} from '@ionic/react'
import {
  gramsToOunces,
  ouncesToGrams,
  kilogramsToPounds,
  poundsToKilograms,
  litersToMilliliters,
  millilitersToLiters,
  gallonsToLiters,
  litersToGallons,
  quartsToLiters,
  litersToQuarts,
  cupsToMilliliters,
  millilitersToCups,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from '../../utils/conversions'
import { ToteReferenceRow } from '../ToteReferenceRow'

const UnitConverter: React.FC = () => {
  const [grams, setGrams] = useState('100')
  const [ounces, setOunces] = useState('3.5')
  const [kilograms, setKilograms] = useState('1')
  const [pounds, setPounds] = useState('2.2')
  const [liters, setLiters] = useState('1')
  const [milliliters, setMilliliters] = useState('1000')
  const [gallons, setGallons] = useState('1')
  const [quarts, setQuarts] = useState('1')
  const [cups, setCups] = useState('1')
  const [fahrenheit, setFahrenheit] = useState('75')
  const [celsius, setCelsius] = useState('24')

  const syncWeightFromGrams = (value: string) => {
    setGrams(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setOunces(String(gramsToOunces(numeric)))
    }
  }

  const syncWeightFromOunces = (value: string) => {
    setOunces(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setGrams(String(ouncesToGrams(numeric)))
    }
  }

  const syncKgFromKg = (value: string) => {
    setKilograms(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setPounds(String(kilogramsToPounds(numeric)))
    }
  }

  const syncKgFromPounds = (value: string) => {
    setPounds(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setKilograms(String(poundsToKilograms(numeric)))
    }
  }

  const syncLiter = (value: string) => {
    setLiters(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setMilliliters(String(litersToMilliliters(numeric)))
      setGallons(String(litersToGallons(numeric)))
      setQuarts(String(litersToQuarts(numeric)))
    }
  }

  const syncMilliliter = (value: string) => {
    setMilliliters(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setLiters(String(millilitersToLiters(numeric)))
      setCups(String(millilitersToCups(numeric)))
    }
  }

  const syncGallons = (value: string) => {
    setGallons(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setLiters(String(gallonsToLiters(numeric)))
    }
  }

  const syncQuarts = (value: string) => {
    setQuarts(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setLiters(String(quartsToLiters(numeric)))
    }
  }

  const syncCups = (value: string) => {
    setCups(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setMilliliters(String(cupsToMilliliters(numeric)))
    }
  }

  const syncFahrenheit = (value: string) => {
    setFahrenheit(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setCelsius(String(fahrenheitToCelsius(numeric)))
    }
  }

  const syncCelsius = (value: string) => {
    setCelsius(value)
    const numeric = parseFloat(value)
    if (!Number.isNaN(numeric)) {
      setFahrenheit(String(celsiusToFahrenheit(numeric)))
    }
  }

  return (
    <IonCard className="calculator-card">
      <IonCardHeader>
        <IonCardSubtitle>Quick Math</IonCardSubtitle>
        <IonCardTitle>Unit Converter</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="unit-converter-page">
          <ToteReferenceRow />
          <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Grams</IonLabel>
                <IonInput type="number" value={grams} onIonChange={(e) => syncWeightFromGrams(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Ounces</IonLabel>
                <IonInput type="number" value={ounces} onIonChange={(e) => syncWeightFromOunces(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Kilograms</IonLabel>
                <IonInput type="number" value={kilograms} onIonChange={(e) => syncKgFromKg(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Pounds</IonLabel>
                <IonInput type="number" value={pounds} onIonChange={(e) => syncKgFromPounds(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Liters</IonLabel>
                <IonInput type="number" value={liters} onIonChange={(e) => syncLiter(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Milliliters</IonLabel>
                <IonInput type="number" value={milliliters} onIonChange={(e) => syncMilliliter(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Gallons</IonLabel>
                <IonInput type="number" value={gallons} onIonChange={(e) => syncGallons(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Quarts</IonLabel>
                <IonInput type="number" value={quarts} onIonChange={(e) => syncQuarts(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Cups</IonLabel>
                <IonInput type="number" value={cups} onIonChange={(e) => syncCups(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">°F</IonLabel>
                <IonInput type="number" value={fahrenheit} onIonChange={(e) => syncFahrenheit(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">°C</IonLabel>
                <IonInput type="number" value={celsius} onIonChange={(e) => syncCelsius(e.detail.value ?? '')} />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        </div>
      </IonCardContent>
    </IonCard>
  )
}

export default UnitConverter
