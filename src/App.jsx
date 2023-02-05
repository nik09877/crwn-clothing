//Components
import Directory from './components/directory/directory.component';
import { categories } from './category-data';

//Styles

const App = () => {
  return (
    <div className='app'>
      <Directory categories={categories} />
    </div>
  );
};

export default App;
