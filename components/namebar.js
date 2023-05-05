import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function NameBar({profile, editable, fetchData}) {
    const supabase = useSupabaseClient()
    const session = useSession()

    const [editName, setEditName] = useState(false)
    const [name, setName] = useState("")

    function clickEditName() {
        setEditName(true)
        setName(profile.name)
    }

    async function saveName() {
        await supabase.from('profiles')
            .update({
              name,
         })
        .eq('id', session.user.id)
        .then(result => {
            if (result.error) {
                throw result.error;
            }
            
            if (fetchData) {
                fetchData()
            }
            setEditName(false)
        });
    }
      
    return (
        <div className="p-8 pt-4 pb-0">
            <div className="ml-24 flex justify-between">
                <div className="flex gap-2 items-center">
                    { editable && editName && (
                        <>
                        <input className="p-1 border-blue-600 border-2 rounded-md" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <button className="shadow-md px-3 py-1 rounded-md shadow-gray-400" onClick={saveName}>Save</button>
                        </>
                    )}
                    {!editName && (
                        <h1 className="text-2xl font-bold">{profile?.name}</h1>    
                    )}
                    { editable && !editName && (
                        <div className="cursor-pointer" onClick={clickEditName}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
  )
}
