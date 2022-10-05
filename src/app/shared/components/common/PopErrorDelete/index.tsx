import React, { ReactNode } from 'react';

interface IPopNotify {
  text: ReactNode;
}
const PopNotify: React.FC<IPopNotify> = ({ text }) => {
  return <div className="text-sm">{text}</div>;
};

export { PopNotify };
