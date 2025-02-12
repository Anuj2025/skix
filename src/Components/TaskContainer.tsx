  import React from 'react'
  import {useNavigate} from "react-router-dom"
  import {app} from "../services/Firebase.tsx"
  import {getAuth, onAuthStateChanged} from "firebase/auth"
  import { getFirestore, doc, getDoc, setDoc , deleteDoc} from "firebase/firestore";
  import {toast} from "react-hot-toast"
  
  
  const TaskContainer = ({docId, title, docTask, time}) => {
    const Navigate = useNavigate()
    const auth = getAuth(app);
    const db = getFirestore(app)
    const [user, setUser] = React.useState()
    
    React.useEffect(() => {
      const subs = onAuthStateChanged(auth, (u) =>{
        if (u)
        setUser(u);
      })
      
      return () => subs()
    }, [auth])
    
    
    function NavigateBtn() {
      Navigate(`/editor/${docTask}`)
    }
    
   async function handleDeletion(docId) {
     const docRef = doc(db,  user.email, docId);
     
     try {
       await deleteDoc(docRef);
       toast("delecting "+docRef.id+"...")
       window.location.reload()
     } catch (e) {
       toast.error(e.message)
     }
   }
    
    return (
  <div className="w-[320px] m-2.5 min-h-[160px] bg-primary text-white p-2 rounded-lg" >
  <h3 className="text-1xl text-primary-content font-medium" >{title}</h3>
  <div className="w-full flex justify-center" >
  <button onClick={() => NavigateBtn()} className="btn btn-nutral mt-[10px] m-2" >Open<span>{docTask}</span></button>
  </div>
  
  <div className="w-auto  h-[50px] bg-base-content justify-center text-center rounded-lg" ><h3 className="float-right relative m-[13px] text-1xl text-primary-content font-medium " ><button onClick={() => handleDeletion(docId)} className="btn mr-[20px]" >Delete</button>{time}</h3></div>
      </div>
    )
  }
  
  export default TaskContainer