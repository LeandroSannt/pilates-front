import { useField } from '@unform/core';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  placeholder?:string
  time?:boolean
}

export function DatePicker({ name,placeholder,time = false, ...rest }: Props) {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);
  var Xmas95 = new Date(defaultValue);
  const day = Xmas95.getDay()

  const day2 = moment('December 24, 2022 23:15:30').format()
  const day1 = moment('December 25, 2022 23:15:30').format()
  const d = new Date(day1)
  const c = new Date(day2)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <ReactDatePicker
      {...(time  && { showTimeSelect: true ,timeFormat:'p'})}
      dateFormat="Pp"
      placeholderText={placeholder}
      className="input input-bordered input-primary w-full "
      //highlightDates={[new Date(d.getDay()),new Date(c.getDay())]}
      //minTime={setHours(setMinutes(new Date(), 0), 17)}
      //maxTime={setHours(setMinutes(new Date(), 30), 20)}
      ref={datepickerRef}
      selected={date}
      
      onChange={setDate}
      {...rest}
    />
  );
};