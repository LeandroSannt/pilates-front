import { Switch } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { switchStyled, Toggle } from './styles';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ISwitchToggleProps {
  currentStatus: boolean;
  setValue?: (value: boolean) => void
}

const SwitchToggle: React.FC<ISwitchToggleProps> = ({ currentStatus, setValue }) => {
  const [enabled, setEnabled] = useState(currentStatus);
  const handleChange = (value: boolean) => {
    setEnabled(value)
    setValue && setValue(value)
  }

  useEffect(() => {
    setEnabled(currentStatus)
  }, [currentStatus])

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={classNames(enabled ? 'bg-blue-3' : 'bg-red800', switchStyled)}
    >
      <span className="sr-only">Use setting</span>
      <Toggle
        aria-hidden="true"
        className={classNames(enabled ? 'translate-x-[38px]' : 'translate-x-0')}
      />
      {!enabled ? (
        <span className="ml-2 text-[10px] uppercase text-background">Não</span>
      ) : (
        <span className="-ml-3 text-[10px] uppercase text-background">Sim</span>
      )}
    </Switch>
  );
};

export { SwitchToggle };

