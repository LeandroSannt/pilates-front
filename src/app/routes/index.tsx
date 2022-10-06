import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Alunos from '../pages/Alunos';
import Details from '../pages/Alunos/Details';
import Aulas from '../pages/Aulas';
import Faltas from '../pages/Faltas';
import Planos from '../pages/Planos';
import Remarcacoes from '../pages/Remarcacoes';
import Reports from '../pages/Reports';
import Dashboard from '../pages/_layouts/Dashboard';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
        <BrowserRouter>
          <Routes>
            
              <Route
                path="/"
                element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
                }
                >
                <Route path="alunos" element={<Alunos/>}/>
                <Route path="aulas" element={<Aulas/>}/>
                <Route path="remarcacoes" element={<Remarcacoes/>}/>
                <Route path="faltas" element={<Faltas/>}/>
                <Route path="planos" element={<Planos/>}/>
                <Route  path="planos/:id" element={ <Planos/>}/>
                <Route path="relatorio" element={<Reports/>}/>
                <Route path="alunos/create" element={<Details/>}/>
                <Route path="alunos/:id/edit" element={<Details/>}/>
              </Route>
              
          </Routes>
        </BrowserRouter>
  );
};

export { AppRoutes };

