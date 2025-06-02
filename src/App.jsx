import { RouterProvider } from "react-router";
import "./css/App.css";
import { router } from "./Router";
import { Context } from "./js/context";
import { useEffect, useState } from "react";
import { auth } from "./js/firebase-auth";
import { onAuthStateChanged } from "firebase/auth";
import { ApiInstance } from "./js/api-instance";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";
function App() {
  // states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [mode,setMode] = useState(()=>{
    const theme =  localStorage.getItem('theme')
    if(!theme){
      localStorage.setItem('theme','light')
      return 'light'
    }
    else{
      return theme
    }
  })

  useEffect(()=>{
    const bodyMode = document.getElementById('root')
    if(mode==='dark'){
      bodyMode.classList.add('bg-black')
      bodyMode.classList.remove('bg-white')
    }
    else{
      bodyMode.classList.add('bg-white')
      bodyMode.classList.remove('bg-black')
    }
    
  },[mode])

  // context provider object
  const ContextProvider = {
    user,
    loading,
    setLoading,
    role,
    mode,
    setMode
  };

  // user check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await ApiInstance.post("/login", {
          email: user?.email,
        }).then((res) => {
          ApiInstance.get(`/check/${user?.email}`).then((res) => {
            setRole(res.data.admin);
            setLoading(false);
          });
        });
      } else {
        setUser(null);
        ApiInstance.post("/logout").then((res) => setLoading(false));
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Context.Provider value={ContextProvider}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </Context.Provider>
    </>
  );
}

export default App;
