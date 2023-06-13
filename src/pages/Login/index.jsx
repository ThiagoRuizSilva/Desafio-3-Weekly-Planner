 import Home from "../../components/Home"
 import Form from "../../components/Home/form"
 import styles from './styles.module.css'
 export default function Login(){
     return(
         <div className={styles.container}>
            <Form/>
            <Home/>
         </div>
     )
 }



















// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ConfirmationToast = () => {
//   const [isConfirming, setIsConfirming] = useState(false);

//   const handleAction = () => {
//     setIsConfirming(true);
//     // Exibir uma caixa de diálogo de confirmação para o usuário.
//     if (window.confirm('Deseja continuar?')) {
//       // Se o usuário confirmar, execute a ação desejada.
//       // Por exemplo, realizar uma exclusão ou uma operação importante.
//       performAction();
//     } else {
//       setIsConfirming(false);
//       // O usuário cancelou a ação, exiba uma notificação ou execute outras ações necessárias.
//     }
//   };

//   const performAction = () => {
//     // Lógica para executar a ação desejada aqui.
//     // Por exemplo, chamar uma API ou modificar o estado do componente.

//     // Exibir a notificação de sucesso usando o React Toastify.
//     toast.success('Ação realizada com sucesso!');
//   };

//   return (
//     <>
//       <button onClick={handleAction}>Realizar Ação</button>
//       {isConfirming && (
//         <ToastContainer
//           position="top-right"
//           autoClose={false}
//           hideProgressBar
//           newestOnTop={false}
//           closeOnClick={false}
//           rtl={false}
//           pauseOnFocusLoss={false}
//           draggable={false}
//           pauseOnHover={false}
//         />
//       )}
//     </>
//   );
// };

// export default ConfirmationToast;