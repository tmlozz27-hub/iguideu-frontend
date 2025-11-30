import ApiTestPanel from './components/ApiTestPanel.jsx';
import GuideList from './components/GuideList.jsx';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <ApiTestPanel />
      <hr style={{ margin: '2rem 0' }} />
      <GuideList />
    </div>
  );
}
