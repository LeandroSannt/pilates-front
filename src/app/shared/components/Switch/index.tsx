import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Switch from "react-switch";

interface ActiveSwitchProps {
  hasActive: string

}

const SwitchActiveInactive: React.FC<ActiveSwitchProps> = ({ hasActive }) => {
  return (
    <p className='flex justify-center items-center h-full text-white50 font-bold text-[8px]'>{hasActive}</p>
  )
}

interface SwitchProps {
  onColor?: string
  offColor?: string
  activeText?: string
  inactiveText?: string
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  changeValue?(setValue: any): void
  itemId?: number
  routeEditLine?: string

}

const SwitchLabel: React.FC<SwitchProps> = ({ routeEditLine, itemId, changeValue, value, setValue, activeText = 'Ativo', inactiveText = 'Inativo', offColor = '#446BE5', onColor = '#CC5656' }) => {

  const [active, setActive] = useState(value)

  useEffect(() => {
    setValue(active)

  }, [itemId, routeEditLine])
  return (
    <label>
      <Switch
        onColor={onColor}
        offColor={offColor}
        checkedIcon={<SwitchActiveInactive hasActive={activeText} />}
        uncheckedIcon={<SwitchActiveInactive hasActive={inactiveText} />}
        onChange={(value) => {
          setActive(value)
          changeValue && changeValue(value)
        }}
        checked={active} />
    </label>

  )
}
export default SwitchLabel