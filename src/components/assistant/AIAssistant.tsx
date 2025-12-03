import React, { useState } from 'react'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToggle,
} from '@ionic/react'
import { flaskOutline, pulseOutline, sparklesOutline } from 'ionicons/icons'
import { speciesList } from '../../data/species'
import { generateEnvAdvice, analyzeSymptoms, suggestTekPlan, formatSupplyLine } from '../../utils/assistant'
import type { ExperienceLevel, GoalFocus, GrowStage } from '../../utils/assistant'
import ReminderBoard from './ReminderBoard'

const initialPlan = suggestTekPlan('bulk', 'beginner')

const AIAssistant: React.FC = () => {
  const [stage, setStage] = useState<GrowStage>('fruiting')
  const [temperature, setTemperature] = useState('24')
  const [humidity, setHumidity] = useState('90')
  const [speciesId, setSpeciesId] = useState(speciesList[0]?.id ?? '')
  const [envAdvice, setEnvAdvice] = useState<string[]>([])

  const [symptoms, setSymptoms] = useState('')
  const [symptomAdvice, setSymptomAdvice] = useState<string[]>([])

  const [goal, setGoal] = useState<GoalFocus>('bulk')
  const [experience, setExperience] = useState<ExperienceLevel>('beginner')
  const [includeDIY, setIncludeDIY] = useState(false)
  const [planDetails, setPlanDetails] = useState(initialPlan)
  const [planSupplyLine, setPlanSupplyLine] = useState(formatSupplyLine(initialPlan.supply))

  const handleEnvironment = () => {
    const tempValue = parseFloat(temperature)
    const humidityValue = parseFloat(humidity)
    if (Number.isNaN(tempValue) || Number.isNaN(humidityValue)) {
      setEnvAdvice(['Enter numeric values for temperature and humidity.'])
      return
    }
    const tips = generateEnvAdvice(tempValue, humidityValue, speciesId, stage)
    setEnvAdvice(tips)
  }

  const handleSymptoms = () => {
    const advice = analyzeSymptoms(symptoms, includeDIY)
    setSymptomAdvice(advice)
  }

  const handlePlan = () => {
    const plan = suggestTekPlan(goal, experience)
    setPlanDetails(plan)
    setPlanSupplyLine(formatSupplyLine(plan.supply))
  }

  const diyHelperText = includeDIY
    ? 'DIY tips enabled: supply recommendations will list a Myco Envy item first, then optional home-brew guidance when needed.'
    : 'DIY tips disabled: the assistant will prioritize grab-and-go supplies from Myco Envy.'

  return (
    <IonCard className="assistant-card">
      <IonCardHeader>
        <IonCardSubtitle>Guided suggestions</IonCardSubtitle>
        <IonCardTitle>Mycoenvy AI Grow Assistant</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem lines="full">
          <IonLabel>Include DIY fallback tips?</IonLabel>
          <IonToggle
            checked={includeDIY}
            onIonChange={(event) => setIncludeDIY(event.detail.checked)}
            aria-label="Toggle DIY fallback tips"
          />
        </IonItem>
        <IonNote>{diyHelperText}</IonNote>

        <section className="assistant-section">
          <div className="assistant-section__header">
            <IonIcon icon={pulseOutline} />
            <h3>Environment Analyzer</h3>
          </div>
          <IonSegment value={stage} onIonChange={(e) => setStage((e.detail.value as GrowStage) ?? 'fruiting')}>
            <IonSegmentButton value="colonization">
              <IonLabel>Colonization</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="fruiting">
              <IonLabel>Fruiting</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Temperature (°C)</IonLabel>
              <IonInput
                type="number"
                value={temperature}
                onIonChange={(e) => setTemperature(e.detail.value ?? '')}
                placeholder="24"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Relative Humidity (%)</IonLabel>
              <IonInput
                type="number"
                value={humidity}
                onIonChange={(e) => setHumidity(e.detail.value ?? '')}
                placeholder="92"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Species</IonLabel>
              <IonSelect value={speciesId} onIonChange={(e) => setSpeciesId((e.detail.value as string) ?? speciesId)}>
                {speciesList.map((spec) => (
                  <IonSelectOption key={spec.id} value={spec.id}>
                    {spec.commonName}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>
          <IonButton expand="block" onClick={handleEnvironment}>
            Analyze Vitals
          </IonButton>
          {envAdvice.length > 0 && (
            <IonList className="assistant-results">
              {envAdvice.map((tip) => (
                <IonItem key={tip} lines="none">
                  <IonLabel>{tip}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
        </section>

        <section className="assistant-section">
          <div className="assistant-section__header">
            <IonIcon icon={flaskOutline} />
            <h3>Symptom Troubleshooter</h3>
          </div>
          <IonItem>
            <IonLabel position="stacked">Describe what you see</IonLabel>
            <IonTextarea
              value={symptoms}
              autoGrow
              placeholder="Example: green fuzz in one corner, sweet smell, temp 26°C"
              onIonChange={(e) => setSymptoms(e.detail.value ?? '')}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleSymptoms}>
            Generate Troubleshooting Tips
          </IonButton>
          {symptomAdvice.length > 0 && (
            <IonList className="assistant-results">
              {symptomAdvice.map((tip, idx) => (
                <IonItem key={`${tip}-${idx}`} lines="none">
                  <IonLabel>{tip}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
        </section>

        <section className="assistant-section">
          <div className="assistant-section__header">
            <IonIcon icon={sparklesOutline} />
            <h3>TEK & Species Planner</h3>
          </div>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Goal</IonLabel>
              <IonSelect value={goal} onIonChange={(e) => setGoal((e.detail.value as GoalFocus) ?? goal)}>
                <IonSelectOption value="bulk">Bulk Canopy / High Yield</IonSelectOption>
                <IonSelectOption value="clean-work">Clean Work Sprint</IonSelectOption>
                <IonSelectOption value="gourmet">Gourmet Blocks</IonSelectOption>
                <IonSelectOption value="experiments">Experiments & Culture Work</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Experience</IonLabel>
              <IonSegment value={experience} onIonChange={(e) => setExperience((e.detail.value as ExperienceLevel) ?? 'beginner')}>
                <IonSegmentButton value="beginner">
                  <IonLabel>Beginner</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="intermediate">
                  <IonLabel>Intermediate</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="advanced">
                  <IonLabel>Advanced</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonItem>
          </IonList>
          <IonButton expand="block" onClick={handlePlan}>
            Build Recommendation
          </IonButton>
          {planDetails.teks.length > 0 && (
            <div className="assistant-plan">
              {planSupplyLine && <IonNote color="secondary">{planSupplyLine}</IonNote>}
              <IonNote>
                {includeDIY
                  ? 'DIY fallback: hydrate CVG, sterilize gains, and run SAB work only after staging Myco Envy gear. Add the home steps once supplies arrive.'
                  : 'Tap “Include DIY fallback tips” if you want step-by-step mixes after the Myco Envy supply links.'}
              </IonNote>
              <h4>Suggested TEKs</h4>
              <IonList>
                {planDetails.teks.map((tek) => (
                  <IonItem key={tek.id} lines="none">
                    <IonLabel>
                      <strong>{tek.name}</strong>
                      <p>{tek.summary}</p>
                    </IonLabel>
                    <IonChip color="medium">{tek.difficulty}</IonChip>
                  </IonItem>
                ))}
              </IonList>
              <h4>Species Pairings</h4>
              <IonList>
                {planDetails.species.map((spec) => (
                  <IonItem key={spec.id} lines="none">
                    <IonLabel>
                      <strong>{spec.commonName}</strong>
                      <p>{spec.notes}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
              <h4>Recipes to Prep</h4>
              <IonList>
                {planDetails.recipes.map((recipe) => (
                  <IonItem key={recipe.id} lines="none">
                    <IonLabel>
                      <strong>{recipe.name}</strong>
                      <p>{recipe.notes}</p>
                    </IonLabel>
                    <IonChip>{recipe.type}</IonChip>
                  </IonItem>
                ))}
              </IonList>
            </div>
          )}
        </section>

        <section className="assistant-section">
          <div className="assistant-section__header">
            <IonIcon icon={sparklesOutline} />
            <h3>Critical Task Reminders</h3>
          </div>
          <ReminderBoard />
        </section>
      </IonCardContent>
    </IonCard>
  )
}

export default AIAssistant
