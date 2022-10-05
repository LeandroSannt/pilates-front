import React, { useState } from 'react';
import Switch from "react-switch";

interface ActiveSwitchProps {
  hasActive: string

}

const SwitchActiveInactive: React.FC<ActiveSwitchProps> = ({ hasActive }) => {
  return (
    <p className='flex justify-center items-center h-full text-white50 font-bold text-[12px]'>{hasActive}</p>
  )
}

interface SwitchProps {
  onColor?: string
  offColor?: string
  activeText?: string
  inactiveText?: string
  value: boolean
  changeValue: (boolean: boolean) => void
}

const SwitchTemplate: React.FC<SwitchProps> = ({ changeValue, value, activeText = '✔', inactiveText = '×', offColor = '#446BE5', onColor = '#CC5656' }) => {

  const [active, setActive] = useState(value)

  return (
    <label>
      <Switch
        onColor={offColor}
        offColor={onColor }
        checkedIcon={<SwitchActiveInactive hasActive={activeText} />}
        uncheckedIcon={<SwitchActiveInactive hasActive={inactiveText} />}
        onChange={() => {
          changeValue(active)
          setActive(!active)
        }}
        checked={active} />
    </label>

  )
}
export { SwitchTemplate };
