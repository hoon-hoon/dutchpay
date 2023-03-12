import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateGroup } from './components/CreateGroup';
import { AddMembers } from './components/AddMembers';
import { ExpenseMain } from './components/ExpenseMain';
import { RecoilRoot } from 'recoil';

const App = () => (
  <BrowserRouter>
  <RecoilRoot>
  <Routes>
    <Route path="/" element={<CreateGroup />} />
    <Route path="/Members" element={<AddMembers />} />
    <Route path="/expense" element={<ExpenseMain />} />

  </Routes>
  </RecoilRoot>
  </BrowserRouter>
  );

export default App;
