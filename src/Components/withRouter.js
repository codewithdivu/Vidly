// import { useNavigate } from 'react-router-dom';
// import Form from './common/form';

// export const WithRouter = (Form) => {
//   const Wrapper = (props) => {
//     const navigate = useNavigate();
    
//     return (
//       <Form
//         navigate={navigate}
//         {...props}
//         />
//     );
//   };
  
//   return Wrapper;
// };

import React from 'react'
import { useNavigate } from 'react-router-dom'
import Form from './common/form'

const WithRouter = () => {
  const navigate = useNavigate();
  return (
    <Form navigate={navigate} />
  )
}

export default WithRouter