import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/_layouts/Dashboard';
import Alunos from '../pages/Alunos';
import Details from '../pages/Alunos/Details';
import Aulas from '../pages/Aulas';
import Faltas from '../pages/Faltas';
import Home from '../pages/home';
import Planos from '../pages/Planos';
import Remarcacoes from '../pages/Remarcacoes';
import Reports from '../pages/Reports';
import PrivateRoute from './PrivateRoute';
import { Show } from '../pages/Alunos/Show';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="alunos" element={<Alunos />} />
          <Route
            path="/dashboard/alunos/:student_id/detalhes"
            element={<Show />}
          />
          <Route path="aulas" element={<Aulas />} />
          <Route path="remarcacoes" element={<Remarcacoes />} />
          <Route path="faltas" element={<Faltas />} />
          <Route path="planos" element={<Planos />} />
          <Route path="planos/:id" element={<Planos />} />
          <Route path="relatorio" element={<Reports />} />
          <Route path="alunos/create" element={<Details />} />
          <Route path="alunos/:id/edit" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
