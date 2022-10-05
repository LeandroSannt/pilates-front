import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { Edit, Trash } from '../../../shared/components/icons';
import { DefaultModal } from '../../../shared/components/modals/DefaultModal';
import { ModalDeleteContent } from '../../../shared/components/modals/modalDeleteContent';
import { templateServices } from '../../../shared/services/templates';
import { ICompanies } from '../../interfaces/companies';
import { ITemplates } from '../../interfaces/templates';
import { dataServices } from '../../services/companies';
import { SwitchTemplate } from '../SwitchTemplate';
import { Container, Content } from './styles';

interface TableInitialProps {
  data: any;
  activeSwitch?: boolean;
  setData?(value: any): void;
  refetch?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<ICompanies[] | ITemplates[], unknown>>
}

const TableInitial: React.FC<TableInitialProps> = ({
  setData,
  data,
  activeSwitch = false,
  refetch
}) => {
  const [currentCompany, setCurrentCompany] = useState<ICompanies>();
  const [activeModal, setActiveModal] = useState(false);
  const navigate = useNavigate();
  const { mutate: deleteCompany } = useMutation((id: string) => dataServices({ types: 'deleteCompany', id }))

  const handleEdit = (id: number, objData: Record<string, any> = {}) => {
    navigate(`${id}/edit`, { state: objData });
  };

  const handleDelete = async (currentCompanie: ICompanies) => {
    setActiveModal(true);
    if (activeModal) {
      deleteCompany(currentCompanie.id, {
        onSuccess: () => {
          if (refetch) {
            refetch()
          }
          setActiveModal(false);
        }
      })

    }
  };

  const handleEditStatus = async (
    id: string,
    newStatus: 'ACTIVE' | 'DELETED'
  ) => {
    await templateServices({
      types: "changeStatus",
      changeStatus: {
        id,
        status: newStatus
      }
    })
  };
  const changeStatus = (value: boolean) => value ? 'DELETED' : 'ACTIVE'
  return (
    <Container>
      {data?.map((obj: any) => {
        return (
          <Content key={obj.id}>
            <h5>{obj.company_name || obj.name}</h5>
            <div>
              {activeSwitch ? (
                <div>
                  <SwitchTemplate
                    changeValue={(value) => {
                      handleEditStatus(obj?.id as string, changeStatus(value));
                    }}
                    value={obj.status === 'ACTIVE' || false}
                  />
                </div>
              ) : (
                <div
                  onClick={() => {
                    setCurrentCompany(obj)
                    setActiveModal(true);
                  }}
                >
                  <Trash color="#F1F1F1" />
                </div>
              )}

              <div
                onClick={() => {
                  handleEdit(obj?.id as number, obj);
                }}
              >
                <Edit />
              </div>
            </div>

            {currentCompany?.id === obj.id && activeModal && (
              <DefaultModal
                isOpen={activeModal}
                setIsOpen={setActiveModal}
                content={
                  <ModalDeleteContent
                    handleDeleteItem={() => handleDelete(obj)}
                    text={`Tem certeza que deseja excluir a empresa “${obj.name}”? Após confirmar
                    esta ação não poderá ser desfeita.`}
                    title={'Excluir Empresa'}
                    setIsOpen={() => setActiveModal(false)}
                  />
                }
              />
            )}
          </Content>
        );
      })}
    </Container>
  );
};
export default TableInitial;
