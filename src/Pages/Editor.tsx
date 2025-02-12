import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import {
  darkDefaultTheme,
  lightDefaultTheme,
  Theme,
} from "@blocknote/mantine";
import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, } from "firebase/auth";

import Loader from "../Components/Loader.tsx"

import { getFirestore, doc, getDoc, setDoc, query, where, collection, updateDoc } from "firebase/firestore";
import { app } from "../services/Firebase.tsx";
import {toast} from "react-hot-toast"

const Editor = () => {
  const editor = useCreateBlockNote();
  const [value, setValue] = useState("");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app)
  const db = getFirestore(app);
  const {Document}  = useParams()
  
  async function LoadContent(email) {
  try {
    const ref = doc(db, email, Document);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      if (docSnap.data().content) {
        const SavedData = docSnap.data().content;
        editor.replaceBlocks(editor.document, SavedData)
      }
    } else {
      toast.error("No document found!")
    }
    setIsLoading(true)
  } catch (e) {
    toast.error(e.message)
  }
}

  React.useEffect(() => {
    
    const Submit = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        LoadContent(u.email);
      } else {
        toast.error("User load timeout")
      }
    })

    return () => Submit()
  }, [])

  const lightRedTheme = {
    colors: {
      editor: {
        text: "#222222",
        background: "#fefefe",
      },
      menu: {
        text: "#ffffff",
        background: "#333",
      },
      tooltip: {
        text: "#ffffff",
        background: "#333",
      },
      hovered: {
        text: "#eee",
        background: "darkgray",
      },
      selected: {
        text: "#333",
        background: "#fefefe",
      },
      disabled: {
        text: "#9b0000",
        background: "#7d0000",
      },
      shadow: "#333",
      border: "#fff",
      sideMenu: "#bababa",
      highlights: lightDefaultTheme.colors!.highlights,
    },
    borderRadius: 4,
    fontFamily: "Helvetica Neue, sans-serif",
  } satisfies Theme;

 async function handleSubmit() {
    const ref = doc(db, user.email, Document);
    try {
      const Data = await updateDoc(ref, {
      content: value,
      })
      toast("Saved")
    } catch (e) {
      toast.error("No such Document!")
    }
  }
 

  return (
  <div>
    {isLoading ? (
      <div><BlockNoteView
      onChange={() => {
            setValue(editor.document);
          }} theme={lightRedTheme} editor={editor} />
<div className="w-full flex justify-center mt-[20px]" ><button className="btn btn-primary" onClick={handleSubmit}>Save</button></div></div>
  ) : (<Loader />)
}
</div>
  );
};

export default Editor;
