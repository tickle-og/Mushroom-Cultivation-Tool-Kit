import React from 'react'
import { IonIcon } from '@ionic/react'
import { cubeOutline } from 'ionicons/icons'

interface ToteIconProps {
  label: string
  volumeQt: number
  dimensions?: string
}

export const ToteIcon: React.FC<ToteIconProps> = ({ label, volumeQt, dimensions }) => (
  <div className="tote-icon">
    <div className="tote-icon__visual">
      <IonIcon icon={cubeOutline} />
    </div>
    <div className="tote-icon__meta">
      <strong>{label}</strong>
      <span>{volumeQt} qt</span>
      {dimensions && <small>{dimensions}</small>}
    </div>
  </div>
)
