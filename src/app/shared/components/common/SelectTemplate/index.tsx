import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import React, { Fragment, useState } from 'react';

import { boxButton, boxOptions, Container, containerStyle } from './styles';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ISelectProps {
  icon?: JSX.Element;
  styleContainer?: string;
  defaultValue: any;
  data: { id: number, name: string, value: string }[];
  setValueSelect: React.Dispatch<React.SetStateAction<any>>;
  valueIsId?: true
}

const SelectTemplate: React.FC<ISelectProps> = ({
  icon,
  styleContainer,
  defaultValue,
  data,
  setValueSelect,
}) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (value: string) => {
    setSelected(value)
    setValueSelect(value);
  }
  return (
    <Container className={`${styleContainer} ${containerStyle}`}>
      {icon}
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <div className="w-full mt-1 relative h-full">
            <Listbox.Button className={boxButton}>
              <span className="block truncate text-textBlue400">
                {selected}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon
                  className="h-full -mr-3 w-8 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={boxOptions}>
                {data?.map(({ id, value, name }) => (
                  <Listbox.Option
                    key={id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-8 pr-4'
                      )
                    }
                    value={value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </Container>
  );
};
export { SelectTemplate };

