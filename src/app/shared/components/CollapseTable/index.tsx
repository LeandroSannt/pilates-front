import { ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/solid';
import React, { ReactNode, useState } from 'react';
import { Collapse } from 'react-collapse';

import Switch from '../../../shared/components/Switch';
import { Container, TableContainer } from './styles';

interface CollapseTableProps {
  status?: boolean
  title: string;
  children?: ReactNode;
  data: Object[];
  labels: string[];
  actions?: {
    setData(value: any): void;
  };
}

const CollpaseTable: React.FC<CollapseTableProps> = ({
  title,
  data,
  actions,
  labels,
  status = true,
  children,
}) => {
  const [activeCollapse, setCollapse] = useState(true);
  const [valueSwitch, setValueSwitch] = useState(false)

  const handleEditStatus = (setValue: React.Dispatch<React.SetStateAction<boolean>>, id?: number) => {
    //chamar endpoint para atualizar o template
    //api.put(routeEditLine)



  }

  const addNewLine = () => {
    actions?.setData([
      ...data,
      {
        id: data.length + 1,
        name: '',
        pedido: '',
        retorno: '',
        notaFiscal: '',
        usuario: '',
        senha: '',
        active: true,
      },
    ]);
  };

  return (
    <div   >
      <Container activeCollapse={activeCollapse}  >
        <header className="headercollapse text-white10">
          {title}
          <div className="flex items-center">

            {status &&
              <Switch
                value={valueSwitch}
                setValue={setValueSwitch}
                changeValue={() => { handleEditStatus(setValueSwitch) }}
              />
            }
            <ChevronDownIcon
              width={50}
              onClick={() => {
                setCollapse(!activeCollapse);
              }}
            />
          </div>
        </header>

        <Collapse isOpened={activeCollapse}>
          <TableContainer className=' min-w-full overflow-x-auto '>
            <table>
              <thead>
                <tr>
                  {labels.map((label, index) => (
                    <th key={index}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>

            <div className="mx-4 mt-4">
              <button
                onClick={() => addNewLine()}
                type="button"
                className="justify-center bg-blue400 w-full inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-[16px] shadow-sm text-white bg-blue100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircleIcon width={25} />
              </button>
            </div>
          </TableContainer>
        </Collapse>
      </Container>
    </div>
  );
};
export default CollpaseTable;
