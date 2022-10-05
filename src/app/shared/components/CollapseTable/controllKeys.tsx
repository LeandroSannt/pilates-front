import React from 'react';
import { TemplateLine } from '../../interfaces/templates';

import InputTable from './inputTable';
import { KeyControllContainer } from './styles';

interface keysProps {
  product?: boolean;

}

const ControllKeys: React.FC<keysProps> = ({ product }) => {
  return (
    <KeyControllContainer className="bg-inherit">
      <td className="text-gray900">Chave de controle</td>

      <td>
        <InputTable />
      </td>
      <td>
        <InputTable />
      </td>
      <td>
        <InputTable />
      </td>
      <td>
        <InputTable />
      </td>
      {!product && (
        <td>
          <InputTable />
        </td>
      )}
    </KeyControllContainer>
  );
};
export default ControllKeys;
