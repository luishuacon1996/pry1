import React, {Component} from 'react';

const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    edad: 0,
    categoria: '',
    juego: 0,
    index: 0,
    result: '',
  };

  setEdad = nuevaEdad => {
    this.setState({edad: nuevaEdad});
  };
  setCategoria = nuevaCategoria => {
    this.setState({categoria: nuevaCategoria});
  };

  setIdJuego = iDJuego => {
    this.setState({Juego: iDJuego});
  };

  setIndex = number => {
    this.setState({
      index: number,
    });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          setCategoria: this.setCategoria,
          setEdad: this.setEdad,
          setIdJuego: this.setIdJuego,
          setIndex: this.setIndex,
        }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export {MyContext, MyProvider};
