// React imports
import React from 'react';
// Redux imports

import MovieList from './Components/MovieList';
import SelectedMovie from './Components/SelectedMovie';

const App: React.FC = () => { 

  return (
    <>    
      <MovieList />
      <SelectedMovie />
    </>
  );
}

export default App;