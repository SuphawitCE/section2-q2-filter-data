import { React, useEffect, useState } from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './tableStyle.css';

let startAt = performance.now();
const App = () => {

  const [state, setState] = useState({
    rawData: [],
    data: []
  });
  const [word, setWord] = useState('');
  const { rawData, data } = state;

  const url = 'https://api.publicapis.org/categories';

  useEffect(() => {
    const getCategory = async () => {
      const dataFromServer = await getPublicAPI();
      console.log('a', dataFromServer)
      setState({ ...state, rawData: dataFromServer
      , data : dataFromServer })
    }

    getCategory();
  }, [])

  const getPublicAPI = async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  const handleChange = (e) => {
    setWord(e.target.value);
    if(e.target.value !== '' && e.target.value) {
      const filterData = rawData.filter((raw) => new RegExp(e.target.value, "i").exec(raw));
      setState({ ...state, data : filterData});
    } else {
      setState({ ...state, data : rawData});
    }
    
    console.log('x: ', data);
  }


  return (
    <div style={mainLayoutStyle} >
      <div className="input-container" >
        <Input
          type='text'
          value={word}
          onChange={handleChange} 
          style={searchStyle}
          placeholder="Enter data" />
      </div>

      <div className="table-wrapper" >

        <table class="fl-table" >
          <thead>
            <tr>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            
            {data.map((eachData, index) => {
              return (
                <tr key={index} >{eachData}</tr>
              )
            })}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};
//  CSS code
const mainLayoutStyle = {
  position: 'relative',
  width: '400px',
  height: '260px',
  marginBottom: '100px',
}

const searchStyle = {
  position: 'abosolute',
  top: '50%',
  marginTop: '50pt',
  left: '180%',
  right: '180%',
  marginLeft: '50%',
  minWidth: '50vh',
  transform: 'translate(-50%, 50%)',
}

let endAt = performance.now();
console.log(`performance: ${(endAt - startAt).toFixed(4)}`);

export default App;
